import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { AdminDashboard } from '@/components/membre/AdminDashboard'

export default async function AdminPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/espace-membre/connexion')
  }

  // Get profile and check admin role
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (!profile || profile.role !== 'admin') {
    redirect('/espace-membre')
  }

  // Get all members
  const { data: members } = await supabase
    .from('profiles')
    .select('*')
    .order('last_name', { ascending: true })

  // Get pending registrations
  const { data: registrations } = await supabase
    .from('registrations')
    .select('*')
    .eq('status', 'pending')
    .order('created_at', { ascending: false })

  // Get recent payments
  const { data: payments } = await supabase
    .from('payments')
    .select('*, profiles(first_name, last_name)')
    .order('created_at', { ascending: false })
    .limit(20)

  // Get unread contact messages
  const { data: messages } = await supabase
    .from('contact_messages')
    .select('*')
    .eq('is_read', false)
    .order('created_at', { ascending: false })

  // Get announcements
  const { data: announcements } = await supabase
    .from('announcements')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(10)

  // Get image placeholders with their generations
  const { data: imagePlaceholders } = await supabase
    .from('image_placeholders')
    .select('*, generations:image_generations(*)')
    .eq('site_id', 'wa-jutsu-charleroi')
    .order('created_at', { ascending: false })

  return (
    <AdminDashboard
      members={members || []}
      registrations={registrations || []}
      payments={payments || []}
      messages={messages || []}
      announcements={announcements || []}
      imagePlaceholders={imagePlaceholders || []}
    />
  )
}
