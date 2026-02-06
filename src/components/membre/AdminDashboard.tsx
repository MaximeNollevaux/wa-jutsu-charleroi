'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'
import type { Database, BeltColor } from '@/lib/supabase/types'
import {
  UserGroupIcon,
  DocumentTextIcon,
  CreditCardIcon,
  EnvelopeIcon,
  MegaphoneIcon,
  PlusIcon,
  CheckIcon,
  XMarkIcon,
  EyeIcon,
  PhotoIcon,
} from '@heroicons/react/24/outline'
import { ImageManager } from './ImageManager'
import type { ImagePlaceholderStatus, ImageGenerationStatus } from '@/lib/supabase/types'

type Profile = Database['public']['Tables']['profiles']['Row']
type Registration = Database['public']['Tables']['registrations']['Row']
type Payment = Database['public']['Tables']['payments']['Row'] & {
  profiles?: { first_name: string; last_name: string } | null
}
type ContactMessage = Database['public']['Tables']['contact_messages']['Row']
type Announcement = Database['public']['Tables']['announcements']['Row']

interface ImageGeneration {
  id: string
  created_at: string
  placeholder_id: string
  prompt_used: string
  feedback: string | null
  image_url: string
  reference_image_url: string | null
  status: ImageGenerationStatus
  approved_at: string | null
  approved_by: string | null
}

interface ImagePlaceholder {
  id: string
  created_at: string
  updated_at: string
  site_id: string
  path: string
  name: string
  description: string | null
  prompt_initial: string
  prompt_current: string | null
  status: ImagePlaceholderStatus
  current_image_url: string | null
  width: number
  height: number
  generations?: ImageGeneration[]
}

interface AdminDashboardProps {
  members: Profile[]
  registrations: Registration[]
  payments: Payment[]
  messages: ContactMessage[]
  announcements: Announcement[]
  imagePlaceholders?: ImagePlaceholder[]
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

export function AdminDashboard({
  members,
  registrations,
  payments,
  messages,
  announcements,
  imagePlaceholders = [],
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'members' | 'registrations' | 'payments' | 'messages' | 'announcements' | 'images'>('overview')
  const supabase = createClient()

  const activeMembers = members.filter(m => m.is_active)
  const pendingPayments = payments.filter(p => p.status === 'pending')
  const overduePayments = payments.filter(p => p.status === 'overdue')

  async function validatePayment(paymentId: string) {
    const { error } = await supabase
      .from('payments')
      .update({
        status: 'paid',
        paid_at: new Date().toISOString(),
        validated_at: new Date().toISOString(),
      })
      .eq('id', paymentId)

    if (!error) {
      window.location.reload()
    }
  }

  async function approveRegistration(registrationId: string) {
    // In a real app, this would also create a user account
    const { error } = await supabase
      .from('registrations')
      .update({
        status: 'approved',
        processed_at: new Date().toISOString(),
      })
      .eq('id', registrationId)

    if (!error) {
      window.location.reload()
    }
  }

  async function markMessageAsRead(messageId: string) {
    const { error } = await supabase
      .from('contact_messages')
      .update({ is_read: true })
      .eq('id', messageId)

    if (!error) {
      window.location.reload()
    }
  }

  const pendingImages = imagePlaceholders.filter(p => p.status === 'review').length

  const tabs = [
    { id: 'overview', name: 'Vue d\'ensemble', icon: UserGroupIcon },
    { id: 'members', name: 'Membres', icon: UserGroupIcon, count: activeMembers.length },
    { id: 'registrations', name: 'Inscriptions', icon: DocumentTextIcon, count: registrations.length },
    { id: 'payments', name: 'Paiements', icon: CreditCardIcon, count: pendingPayments.length },
    { id: 'messages', name: 'Messages', icon: EnvelopeIcon, count: messages.length },
    { id: 'announcements', name: 'Annonces', icon: MegaphoneIcon },
    { id: 'images', name: 'Images IA', icon: PhotoIcon, count: pendingImages },
  ] as const

  return (
    <div className="min-h-screen bg-dark-800">
      {/* Header */}
      <div className="bg-dark-900 border-b border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="font-heading font-bold text-2xl uppercase">Administration</h1>
              <p className="text-dark-400">Gérez le club et ses membres</p>
            </div>
            <Link href="/espace-membre" className="text-primary hover:underline text-sm">
              Retour au tableau de bord
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-dark-700 pb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary text-white'
                  : 'bg-dark-700 text-dark-300 hover:bg-dark-600'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.name}
              {tab.count !== undefined && tab.count > 0 && (
                <span className={`px-2 py-0.5 text-xs rounded-full ${
                  activeTab === tab.id ? 'bg-white/20' : 'bg-primary/20 text-primary'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'overview' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-dark-700 border border-dark-600 p-6">
              <div className="flex items-center gap-3 mb-2">
                <UserGroupIcon className="w-8 h-8 text-primary" />
                <span className="font-heading font-extrabold text-3xl">{activeMembers.length}</span>
              </div>
              <p className="text-dark-400">Membres actifs</p>
            </div>

            <div className="bg-dark-700 border border-dark-600 p-6">
              <div className="flex items-center gap-3 mb-2">
                <DocumentTextIcon className="w-8 h-8 text-yellow-500" />
                <span className="font-heading font-extrabold text-3xl">{registrations.length}</span>
              </div>
              <p className="text-dark-400">Inscriptions en attente</p>
            </div>

            <div className="bg-dark-700 border border-dark-600 p-6">
              <div className="flex items-center gap-3 mb-2">
                <CreditCardIcon className="w-8 h-8 text-green-500" />
                <span className="font-heading font-extrabold text-3xl">{pendingPayments.length}</span>
              </div>
              <p className="text-dark-400">Paiements à valider</p>
            </div>

            <div className="bg-dark-700 border border-dark-600 p-6">
              <div className="flex items-center gap-3 mb-2">
                <EnvelopeIcon className="w-8 h-8 text-blue-500" />
                <span className="font-heading font-extrabold text-3xl">{messages.length}</span>
              </div>
              <p className="text-dark-400">Messages non lus</p>
            </div>
          </div>
        )}

        {activeTab === 'members' && (
          <div className="bg-dark-700 border border-dark-600">
            <div className="p-4 border-b border-dark-600 flex justify-between items-center">
              <h2 className="font-heading font-bold uppercase">Liste des membres</h2>
              <Button size="sm">
                <PlusIcon className="w-4 h-4 mr-2" />
                Ajouter un membre
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-dark-800">
                  <tr className="text-left text-dark-400">
                    <th className="p-4">Nom</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Catégorie</th>
                    <th className="p-4">Grade</th>
                    <th className="p-4">Statut</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((member) => (
                    <tr key={member.id} className="border-b border-dark-600/50 hover:bg-dark-600/50">
                      <td className="p-4 font-medium">
                        {member.last_name} {member.first_name}
                      </td>
                      <td className="p-4 text-dark-400">{member.email}</td>
                      <td className="p-4 capitalize">{member.category || '-'}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded-full ${beltColors[member.current_belt]}`} />
                          <span className="capitalize">{member.current_belt}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 text-xs rounded ${
                          member.is_active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                        }`}>
                          {member.is_active ? 'Actif' : 'Inactif'}
                        </span>
                      </td>
                      <td className="p-4">
                        <Link
                          href={`/espace-membre/admin/membres/${member.id}`}
                          className="text-primary hover:underline text-sm"
                        >
                          Voir
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'registrations' && (
          <div className="bg-dark-700 border border-dark-600">
            <div className="p-4 border-b border-dark-600">
              <h2 className="font-heading font-bold uppercase">Inscriptions en attente</h2>
            </div>
            {registrations.length > 0 ? (
              <div className="divide-y divide-dark-600">
                {registrations.map((reg) => (
                  <div key={reg.id} className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">
                          {reg.last_name} {reg.first_name}
                        </h3>
                        <p className="text-dark-400 text-sm">{reg.email}</p>
                        <p className="text-dark-400 text-sm">{reg.phone}</p>
                        <p className="text-dark-500 text-xs mt-1">
                          Catégorie: {reg.category} | Inscrit le {new Date(reg.created_at).toLocaleDateString('fr-BE')}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => approveRegistration(reg.id)}
                          className="p-2 bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors"
                        >
                          <CheckIcon className="w-5 h-5" />
                        </button>
                        <button className="p-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors">
                          <XMarkIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="p-4 text-dark-400">Aucune inscription en attente</p>
            )}
          </div>
        )}

        {activeTab === 'payments' && (
          <div className="bg-dark-700 border border-dark-600">
            <div className="p-4 border-b border-dark-600">
              <h2 className="font-heading font-bold uppercase">Paiements à valider</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-dark-800">
                  <tr className="text-left text-dark-400">
                    <th className="p-4">Membre</th>
                    <th className="p-4">Type</th>
                    <th className="p-4">Montant</th>
                    <th className="p-4">Période</th>
                    <th className="p-4">Statut</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment) => (
                    <tr key={payment.id} className="border-b border-dark-600/50 hover:bg-dark-600/50">
                      <td className="p-4 font-medium">
                        {payment.profiles?.last_name} {payment.profiles?.first_name}
                      </td>
                      <td className="p-4">
                        {payment.type === 'license' ? 'Licence' : 'Cotisation'}
                      </td>
                      <td className="p-4">{payment.amount}€</td>
                      <td className="p-4 text-dark-400">
                        {new Date(payment.period_start).toLocaleDateString('fr-BE', { month: 'short', year: 'numeric' })}
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 text-xs rounded ${
                          payment.status === 'paid' ? 'bg-green-500/20 text-green-400' :
                          payment.status === 'overdue' ? 'bg-red-500/20 text-red-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {payment.status === 'paid' ? 'Payé' :
                           payment.status === 'overdue' ? 'En retard' : 'En attente'}
                        </span>
                      </td>
                      <td className="p-4">
                        {payment.status !== 'paid' && (
                          <button
                            onClick={() => validatePayment(payment.id)}
                            className="text-green-400 hover:underline text-sm"
                          >
                            Valider
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="bg-dark-700 border border-dark-600">
            <div className="p-4 border-b border-dark-600">
              <h2 className="font-heading font-bold uppercase">Messages non lus</h2>
            </div>
            {messages.length > 0 ? (
              <div className="divide-y divide-dark-600">
                {messages.map((msg) => (
                  <div key={msg.id} className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{msg.subject}</h3>
                        <p className="text-dark-400 text-sm">
                          De: {msg.name} ({msg.email})
                        </p>
                        <p className="text-dark-300 text-sm mt-2">{msg.message}</p>
                        <p className="text-dark-500 text-xs mt-2">
                          {new Date(msg.created_at).toLocaleDateString('fr-BE')}
                        </p>
                      </div>
                      <button
                        onClick={() => markMessageAsRead(msg.id)}
                        className="p-2 bg-primary/20 text-primary hover:bg-primary/30 transition-colors"
                      >
                        <EyeIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="p-4 text-dark-400">Aucun message non lu</p>
            )}
          </div>
        )}

        {activeTab === 'announcements' && (
          <div className="bg-dark-700 border border-dark-600">
            <div className="p-4 border-b border-dark-600 flex justify-between items-center">
              <h2 className="font-heading font-bold uppercase">Annonces</h2>
              <Button size="sm">
                <PlusIcon className="w-4 h-4 mr-2" />
                Nouvelle annonce
              </Button>
            </div>
            {announcements.length > 0 ? (
              <div className="divide-y divide-dark-600">
                {announcements.map((ann) => (
                  <div key={ann.id} className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{ann.title}</h3>
                          <span className={`px-2 py-0.5 text-xs rounded ${
                            ann.is_published ? 'bg-green-500/20 text-green-400' : 'bg-dark-600 text-dark-400'
                          }`}>
                            {ann.is_published ? 'Publié' : 'Brouillon'}
                          </span>
                        </div>
                        <p className="text-dark-300 text-sm">{ann.content}</p>
                        <p className="text-dark-500 text-xs mt-2">
                          Créé le {new Date(ann.created_at).toLocaleDateString('fr-BE')}
                        </p>
                      </div>
                      <button className="text-primary hover:underline text-sm">
                        Modifier
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="p-4 text-dark-400">Aucune annonce</p>
            )}
          </div>
        )}

        {activeTab === 'images' && (
          <ImageManager initialPlaceholders={imagePlaceholders} />
        )}
      </div>
    </div>
  )
}
