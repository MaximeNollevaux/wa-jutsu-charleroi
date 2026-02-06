import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { DashboardContent } from '@/components/membre/DashboardContent'

export default async function EspaceMembrePage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/espace-membre/connexion')
  }

  // Get profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (!profile) {
    redirect('/espace-membre/connexion')
  }

  // Redirect admins to admin dashboard
  if (profile.role === 'admin') {
    redirect('/espace-membre/admin')
  }

  // Get payments
  const { data: payments } = await supabase
    .from('payments')
    .select('*')
    .eq('user_id', user.id)
    .order('period_start', { ascending: false })
    .limit(10)

  // Get grade history
  const { data: grades } = await supabase
    .from('grades')
    .select('*')
    .eq('user_id', user.id)
    .order('obtained_at', { ascending: false })

  // Get announcements
  const { data: announcements } = await supabase
    .from('announcements')
    .select('*')
    .eq('is_published', true)
    .or(`expires_at.is.null,expires_at.gt.${new Date().toISOString()}`)
    .order('published_at', { ascending: false })
    .limit(5)

  return (
    <DashboardContent
      profile={profile}
      payments={payments || []}
      grades={grades || []}
      announcements={announcements || []}
    />
  )
}
