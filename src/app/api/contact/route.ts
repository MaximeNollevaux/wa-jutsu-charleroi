import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createClient } from '@/lib/supabase/server'
import { normaliserAttribution, resumerAttribution } from '@/lib/attribution'
import { OBJETS_SECOURS, SYNARA_FORM_JETON, SYNARA_ONE, type ObjetFormulaire } from '@/lib/site'

// La liste des objets est lue a chaque appel (le formulaire peut etre active ou
// modifie cote One a tout moment) : jamais de cache de route.
export const dynamic = 'force-dynamic'

function getResend() {
  return new Resend(process.env.RESEND_API_KEY)
}

// Les champs viennent d'un formulaire public : ils doivent etre echappes avant
// d'etre interpoles dans le HTML de l'email. Meme garde que la route
// d'inscription.
const HTML_ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
}

function esc(value: unknown): string {
  return String(value ?? '').replace(/[&<>"']/g, (c) => HTML_ESCAPES[c])
}

/**
 * Ne garde de la reponse de Synara One que des objets exploitables par le
 * `<select>`. La reponse vient d'un tiers : on ne fait jamais confiance a sa
 * forme, on borne les libelles et on jette tout ce qui n'a pas d'identifiant.
 */
function normaliserObjets(brut: unknown): ObjetFormulaire[] {
  if (!Array.isArray(brut)) return []
  const objets: ObjetFormulaire[] = []
  for (const entree of brut) {
    if (!entree || typeof entree !== 'object') continue
    const id = (entree as Record<string, unknown>).id
    const libelle = (entree as Record<string, unknown>).libelle
    if (typeof id !== 'string' || !id.trim()) continue
    if (typeof libelle !== 'string' || !libelle.trim()) continue
    objets.push({ id: id.trim().slice(0, 100), libelle: libelle.trim().slice(0, 200) })
  }
  return objets
}

/**
 * Liste des objets du formulaire, relayee depuis Synara One.
 *
 * Le navigateur interroge cette route plutot que `one.synara.be` directement :
 * on reste sur la meme origine que l'envoi, sans dependre du CORS du routeur.
 * Toute panne (One injoignable, formulaire pas encore active, reponse illisible)
 * retombe sur la liste de secours — le formulaire reste utilisable.
 */
export async function GET() {
  try {
    const reponse = await fetch(`${SYNARA_ONE}/api/forms/${SYNARA_FORM_JETON}`, {
      cache: 'no-store',
      // One ne doit jamais faire patienter le visiteur : on plafonne l'attente.
      signal: AbortSignal.timeout(5000),
    })
    if (reponse.ok) {
      const donnees = await reponse.json().catch(() => null)
      const objets = normaliserObjets(donnees?.objets)
      if (objets.length) return NextResponse.json({ objets })
    }
  } catch (error) {
    console.error('[contact] Liste des objets Synara One indisponible:', error)
  }

  return NextResponse.json({ objets: OBJETS_SECOURS })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, objet_id, message, landing_url, piege, horodatage } = body

    // Piege a robots : un champ cache que seuls eux remplissent. On repond
    // « ok » sans rien enregistrer ni relayer, pour ne pas leur apprendre que le
    // piege a fonctionne et qu'ils doivent l'eviter la prochaine fois.
    if (typeof piege === 'string' && piege.trim()) {
      return NextResponse.json({ success: true })
    }

    // Horodatage : le formulaire joint l'heure de son affichage. Un envoi en
    // moins de trois secondes est un robot qui remplit tout d'un coup ; meme
    // reponse silencieuse que pour le piege.
    // ⚠ Seulement s'il est present : une page ouverte avant cette version
    // n'en envoie pas, et rejeter en silence perdrait un vrai message.
    const affichage = Number(horodatage)
    if (Number.isFinite(affichage) && affichage > 0 && Date.now() - affichage < 3000) {
      return NextResponse.json({ success: true })
    }

    // Vient du navigateur : filtre avant tout usage, en base comme dans l'email.
    // `utm` porte l'origine de la visite, deja lue par `lireAttribution()`.
    const attribution = normaliserAttribution(body.utm)
    const origine = resumerAttribution(attribution)

    // Validate required fields
    if (!name || !email || !objet_id || !message) {
      return NextResponse.json(
        { error: 'Tous les champs obligatoires doivent être remplis' },
        { status: 400 }
      )
    }

    // Store in database
    const supabase = await createClient()
    const { error } = await supabase
      .from('contact_messages')
      .insert({
        name,
        email,
        phone: phone || null,
        // La colonne s'appelle `subject`, lue par l'espace membre ; l'objet
        // choisi dans le formulaire en porte la valeur (mêmes identifiants
        // qu'avant : inscription, information, horaires, tarifs, autre).
        subject: objet_id,
        message,
        attribution: Object.keys(attribution).length ? attribution : null,
        utm_source: attribution.utm_source ?? null,
        utm_medium: attribution.utm_medium ?? null,
        utm_campaign: attribution.utm_campaign ?? null,
      })

    if (error) {
      console.error('Error storing contact message:', error)
      return NextResponse.json(
        { error: 'Erreur lors de l\'enregistrement du message' },
        { status: 500 }
      )
    }

    // Prevenir le club. Jusqu'au 30/08/2026 cet envoi etait un TODO commente :
    // le message etait ecrit en base et personne n'etait averti. Un visiteur de
    // Marcinelle a ainsi attendu une reponse pendant un mois.
    // L'envoi ne doit pas faire echouer la requete : le message est deja
    // enregistre, le perdre parce que Resend tousse serait pire.
    try {
      await getResend().emails.send({
        from: 'Wa-Jutsu Club <noreply@synara.be>',
        to: ['contact@wa-jutsu-charleroi.be'],
        replyTo: email,
        subject: `Message du site — ${esc(objet_id)}`,
        html: `
          <h2>Nouveau message depuis le site</h2>
          <table style="border-collapse:collapse;width:100%;max-width:600px">
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Nom</td><td style="padding:8px;border:1px solid #ddd">${esc(name)}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Email</td><td style="padding:8px;border:1px solid #ddd">${esc(email)}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Téléphone</td><td style="padding:8px;border:1px solid #ddd">${esc(phone) || '—'}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Sujet</td><td style="padding:8px;border:1px solid #ddd">${esc(objet_id)}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Message</td><td style="padding:8px;border:1px solid #ddd">${esc(message).replace(/\n/g, '<br>')}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Origine</td><td style="padding:8px;border:1px solid #ddd">${esc(origine)}</td></tr>
          </table>
          <p style="color:#666;font-size:13px">Répondre à ce mail répond directement à l'expéditeur.</p>
        `,
      })
    } catch (mailError) {
      console.error('[contact] Notification non envoyée:', mailError)
    }

    // Relais vers le routeur de formulaires de Synara One : c'est lui, et lui
    // seul, qui decide de la destination selon l'objet (affaire du CRM, ticket,
    // conversation, newsletter) et qui porte la personne au carnet de contacts.
    // Le site envoie donc l'origine et l'objet choisis, et ne decide plus rien.
    // Un echec ici ne doit PAS faire echouer la demande du visiteur : elle est
    // deja en base et le club est prevenu. On journalise et on continue.
    try {
      const relais = await fetch(`${SYNARA_ONE}/api/forms/${SYNARA_FORM_JETON}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Le relais ne doit pas retenir la reponse faite au visiteur.
        signal: AbortSignal.timeout(5000),
        body: JSON.stringify({
          nom: name,
          email,
          telephone: phone || undefined,
          message,
          objet_id,
          utm: attribution,
          landing_url: String(landing_url ?? '').slice(0, 2000),
          piege: typeof piege === 'string' ? piege : '',
        }),
      })
      if (!relais.ok) {
        console.error('[contact] Relais Synara One refusé:', relais.status)
      }
    } catch (relaisError) {
      console.error('[contact] Relais Synara One injoignable:', relaisError)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Une erreur est survenue' },
      { status: 500 }
    )
  }
}
