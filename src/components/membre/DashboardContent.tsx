'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'
import type { Database, BeltColor } from '@/lib/supabase/types'
import {
  UserCircleIcon,
  CreditCardIcon,
  AcademicCapIcon,
  BellIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  ClockIcon,
} from '@heroicons/react/24/outline'

type Profile = Database['public']['Tables']['profiles']['Row']
type Payment = Database['public']['Tables']['payments']['Row']
type Grade = Database['public']['Tables']['grades']['Row']
type Announcement = Database['public']['Tables']['announcements']['Row']

interface DashboardContentProps {
  profile: Profile
  payments: Payment[]
  grades: Grade[]
  announcements: Announcement[]
}

const beltColors: Record<BeltColor, string> = {
  blanche: 'bg-white',
  jaune: 'bg-yellow-400',
  orange: 'bg-orange-500',
  verte: 'bg-green-500',
  bleue: 'bg-blue-500',
  marron: 'bg-amber-800',
  noire: 'bg-black border border-white',
  violette: 'bg-purple-600',
}

const beltNames: Record<BeltColor, string> = {
  blanche: 'Ceinture blanche',
  jaune: 'Ceinture jaune',
  orange: 'Ceinture orange',
  verte: 'Ceinture verte',
  bleue: 'Ceinture bleue',
  marron: 'Ceinture marron',
  noire: 'Ceinture noire',
  violette: 'Ceinture violette',
}

export function DashboardContent({
  profile,
  payments,
  grades,
  announcements,
}: DashboardContentProps) {
  const router = useRouter()
  const supabase = createClient()

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  // Calculate payment status
  const currentDate = new Date()
  const currentLicense = payments.find(
    (p) => p.type === 'license' && new Date(p.period_end) >= currentDate
  )
  const currentSubscription = payments.find(
    (p) => p.type === 'subscription' && new Date(p.period_end) >= currentDate
  )

  const licenseStatus = currentLicense?.status || 'pending'
  const subscriptionStatus = currentSubscription?.status || 'pending'

  return (
    <div className="min-h-screen bg-dark-800">
      {/* Header */}
      <div className="bg-dark-900 border-b border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="font-heading font-bold text-2xl uppercase">
                Bonjour, {profile.first_name} !
              </h1>
              <p className="text-dark-400">
                Bienvenue dans votre espace membre
              </p>
            </div>
            <div className="flex items-center gap-4">
              {profile.role === 'admin' && (
                <Link
                  href="/espace-membre/admin"
                  className="text-primary hover:underline text-sm"
                >
                  Administration
                </Link>
              )}
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 text-dark-400 hover:text-white transition-colors"
              >
                <ArrowRightOnRectangleIcon className="w-5 h-5" />
                <span className="text-sm">Déconnexion</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Status cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              {/* License status */}
              <div className="bg-dark-700 border border-dark-600 p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-heading font-bold uppercase">Licence annuelle</h3>
                  {licenseStatus === 'paid' ? (
                    <CheckCircleIcon className="w-6 h-6 text-green-500" />
                  ) : licenseStatus === 'overdue' ? (
                    <ExclamationCircleIcon className="w-6 h-6 text-red-500" />
                  ) : (
                    <ClockIcon className="w-6 h-6 text-yellow-500" />
                  )}
                </div>
                <p className={`text-sm ${
                  licenseStatus === 'paid' ? 'text-green-400' :
                  licenseStatus === 'overdue' ? 'text-red-400' : 'text-yellow-400'
                }`}>
                  {licenseStatus === 'paid' ? 'À jour' :
                   licenseStatus === 'overdue' ? 'En retard' : 'En attente'}
                </p>
                {currentLicense && licenseStatus === 'paid' && (
                  <p className="text-dark-400 text-xs mt-2">
                    Valide jusqu'au {new Date(currentLicense.period_end).toLocaleDateString('fr-BE')}
                  </p>
                )}
              </div>

              {/* Subscription status */}
              <div className="bg-dark-700 border border-dark-600 p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-heading font-bold uppercase">Cotisation mensuelle</h3>
                  {subscriptionStatus === 'paid' ? (
                    <CheckCircleIcon className="w-6 h-6 text-green-500" />
                  ) : subscriptionStatus === 'overdue' ? (
                    <ExclamationCircleIcon className="w-6 h-6 text-red-500" />
                  ) : (
                    <ClockIcon className="w-6 h-6 text-yellow-500" />
                  )}
                </div>
                <p className={`text-sm ${
                  subscriptionStatus === 'paid' ? 'text-green-400' :
                  subscriptionStatus === 'overdue' ? 'text-red-400' : 'text-yellow-400'
                }`}>
                  {subscriptionStatus === 'paid' ? 'À jour' :
                   subscriptionStatus === 'overdue' ? 'En retard' : 'En attente'}
                </p>
                {currentSubscription && subscriptionStatus === 'paid' && (
                  <p className="text-dark-400 text-xs mt-2">
                    Valide jusqu'au {new Date(currentSubscription.period_end).toLocaleDateString('fr-BE')}
                  </p>
                )}
              </div>
            </div>

            {/* Announcements */}
            {announcements.length > 0 && (
              <div className="bg-dark-700 border border-dark-600 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <BellIcon className="w-5 h-5 text-primary" />
                  <h3 className="font-heading font-bold uppercase">Annonces</h3>
                </div>
                <div className="space-y-4">
                  {announcements.map((announcement) => (
                    <div
                      key={announcement.id}
                      className="border-l-2 border-primary pl-4"
                    >
                      <h4 className="font-semibold mb-1">{announcement.title}</h4>
                      <p className="text-dark-400 text-sm">{announcement.content}</p>
                      {announcement.published_at && (
                        <p className="text-dark-500 text-xs mt-2">
                          {new Date(announcement.published_at).toLocaleDateString('fr-BE')}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Payment history */}
            <div className="bg-dark-700 border border-dark-600 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <CreditCardIcon className="w-5 h-5 text-primary" />
                  <h3 className="font-heading font-bold uppercase">Historique des paiements</h3>
                </div>
                <Link href="/espace-membre/paiements" className="text-primary text-sm hover:underline">
                  Voir tout
                </Link>
              </div>
              {payments.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-dark-400 border-b border-dark-600">
                        <th className="pb-2">Type</th>
                        <th className="pb-2">Période</th>
                        <th className="pb-2">Montant</th>
                        <th className="pb-2">Statut</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payments.slice(0, 5).map((payment) => (
                        <tr key={payment.id} className="border-b border-dark-600/50">
                          <td className="py-3">
                            {payment.type === 'license' ? 'Licence' : 'Cotisation'}
                          </td>
                          <td className="py-3 text-dark-400">
                            {new Date(payment.period_start).toLocaleDateString('fr-BE', { month: 'short', year: 'numeric' })}
                          </td>
                          <td className="py-3">{payment.amount}€</td>
                          <td className="py-3">
                            <span className={`px-2 py-1 text-xs rounded ${
                              payment.status === 'paid' ? 'bg-green-500/20 text-green-400' :
                              payment.status === 'overdue' ? 'bg-red-500/20 text-red-400' :
                              'bg-yellow-500/20 text-yellow-400'
                            }`}>
                              {payment.status === 'paid' ? 'Payé' :
                               payment.status === 'overdue' ? 'En retard' : 'En attente'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-dark-400 text-sm">Aucun paiement enregistré</p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile card */}
            <div className="bg-dark-700 border border-dark-600 p-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-dark-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <UserCircleIcon className="w-16 h-16 text-dark-400" />
                </div>
                <h3 className="font-heading font-bold text-lg">
                  {profile.first_name} {profile.last_name}
                </h3>
                <p className="text-dark-400 text-sm">{profile.email}</p>
              </div>

              {/* Belt */}
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className={`w-8 h-8 rounded-full ${beltColors[profile.current_belt]}`} />
                <span className="font-heading font-semibold">
                  {beltNames[profile.current_belt]}
                </span>
              </div>

              <Link
                href="/espace-membre/profil"
                className="block w-full btn-secondary text-center text-sm"
              >
                <Cog6ToothIcon className="w-4 h-4 inline mr-2" />
                Modifier mon profil
              </Link>
            </div>

            {/* Grade history */}
            <div className="bg-dark-700 border border-dark-600 p-6">
              <div className="flex items-center gap-2 mb-4">
                <AcademicCapIcon className="w-5 h-5 text-primary" />
                <h3 className="font-heading font-bold uppercase">Progression</h3>
              </div>
              {grades.length > 0 ? (
                <div className="space-y-3">
                  {grades.map((grade) => (
                    <div key={grade.id} className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full ${beltColors[grade.belt]}`} />
                      <div>
                        <p className="text-sm font-medium">{beltNames[grade.belt]}</p>
                        <p className="text-dark-500 text-xs">
                          {new Date(grade.obtained_at).toLocaleDateString('fr-BE')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-dark-400 text-sm">Aucun grade enregistré</p>
              )}
            </div>

            {/* Quick links */}
            <div className="bg-dark-700 border border-dark-600 p-6">
              <h3 className="font-heading font-bold uppercase mb-4">Liens utiles</h3>
              <div className="space-y-2">
                <a
                  href="/docs/fiche_inscription_wajutsucharleroi.pdf"
                  target="_blank"
                  className="block text-dark-400 hover:text-primary text-sm transition-colors"
                >
                  Fiche d'inscription (PDF)
                </a>
                <a
                  href="/docs/certificat_wajutsucharleroi.pdf"
                  target="_blank"
                  className="block text-dark-400 hover:text-primary text-sm transition-colors"
                >
                  Certificat médical (PDF)
                </a>
                <a
                  href="/reglement-interieur"
                  className="block text-dark-400 hover:text-primary text-sm transition-colors"
                >
                  Règlement intérieur
                </a>
                <a
                  href="/horaires-tarifs"
                  className="block text-dark-400 hover:text-primary text-sm transition-colors"
                >
                  Horaires & Tarifs
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
