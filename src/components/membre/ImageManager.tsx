'use client'

import { useState, useRef } from 'react'
import {
  PhotoIcon,
  PlusIcon,
  ArrowPathIcon,
  CheckIcon,
  XMarkIcon,
  ClockIcon,
  ChatBubbleLeftIcon,
  ArrowUpTrayIcon,
  ChevronDownIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline'
import type { ImagePlaceholderStatus, ImageGenerationStatus } from '@/lib/supabase/types'

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

interface ImageManagerProps {
  initialPlaceholders: ImagePlaceholder[]
}

const statusLabels: Record<ImagePlaceholderStatus, { label: string; color: string }> = {
  pending: { label: 'En attente', color: 'bg-gray-500/20 text-gray-400' },
  generating: { label: 'En cours', color: 'bg-blue-500/20 text-blue-400' },
  review: { label: 'A valider', color: 'bg-yellow-500/20 text-yellow-400' },
  approved: { label: 'Approuvee', color: 'bg-green-500/20 text-green-400' },
}

export function ImageManager({ initialPlaceholders }: ImageManagerProps) {
  const [placeholders, setPlaceholders] = useState<ImagePlaceholder[]>(initialPlaceholders)
  const [filterStatus, setFilterStatus] = useState<ImagePlaceholderStatus | 'all'>('all')
  const [selectedPlaceholder, setSelectedPlaceholder] = useState<ImagePlaceholder | null>(null)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [isApproving, setIsApproving] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [referenceImage, setReferenceImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Form state for new placeholder
  const [newPlaceholder, setNewPlaceholder] = useState({
    path: '',
    name: '',
    description: '',
    prompt_initial: '',
    width: 1200,
    height: 800,
  })

  const filteredPlaceholders = filterStatus === 'all'
    ? placeholders
    : placeholders.filter(p => p.status === filterStatus)

  async function fetchPlaceholders() {
    const response = await fetch('/api/images/placeholders')
    if (response.ok) {
      const data = await response.json()
      setPlaceholders(data)
    }
  }

  async function createPlaceholder() {
    const response = await fetch('/api/images/placeholders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPlaceholder),
    })

    if (response.ok) {
      await fetchPlaceholders()
      setShowCreateForm(false)
      setNewPlaceholder({
        path: '',
        name: '',
        description: '',
        prompt_initial: '',
        width: 1200,
        height: 800,
      })
    }
  }

  async function generateImage() {
    if (!selectedPlaceholder) return

    setIsGenerating(true)
    try {
      const response = await fetch('/api/images/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          placeholder_id: selectedPlaceholder.id,
          feedback: feedback || undefined,
          reference_image_base64: referenceImage || undefined,
        }),
      })

      if (response.ok) {
        await fetchPlaceholders()
        setFeedback('')
        setReferenceImage(null)
        // Re-select the placeholder to get updated data
        const updatedPlaceholders = await fetch('/api/images/placeholders').then(r => r.json())
        const updated = updatedPlaceholders.find((p: ImagePlaceholder) => p.id === selectedPlaceholder.id)
        if (updated) setSelectedPlaceholder(updated)
      }
    } finally {
      setIsGenerating(false)
    }
  }

  async function approveGeneration(generationId: string) {
    setIsApproving(true)
    try {
      const response = await fetch('/api/images/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ generation_id: generationId }),
      })

      if (response.ok) {
        await fetchPlaceholders()
        setSelectedPlaceholder(null)
      }
    } finally {
      setIsApproving(false)
    }
  }

  async function rejectGeneration(generationId: string) {
    await fetch(`/api/images/approve?generation_id=${generationId}`, {
      method: 'DELETE',
    })
    await fetchPlaceholders()
    // Re-select the placeholder to get updated data
    if (selectedPlaceholder) {
      const updatedPlaceholders = await fetch('/api/images/placeholders').then(r => r.json())
      const updated = updatedPlaceholders.find((p: ImagePlaceholder) => p.id === selectedPlaceholder.id)
      if (updated) setSelectedPlaceholder(updated)
    }
  }

  function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const base64 = (e.target?.result as string).split(',')[1]
      setReferenceImage(base64)
    }
    reader.readAsDataURL(file)
  }

  const latestGeneration = selectedPlaceholder?.generations
    ?.filter(g => g.status === 'generated')
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0]

  return (
    <div className="space-y-6">
      {/* Header with filters */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1.5 text-sm transition-colors ${
              filterStatus === 'all' ? 'bg-primary text-white' : 'bg-dark-700 text-dark-300 hover:bg-dark-600'
            }`}
          >
            Tous ({placeholders.length})
          </button>
          {Object.entries(statusLabels).map(([status, { label }]) => {
            const count = placeholders.filter(p => p.status === status).length
            return (
              <button
                key={status}
                onClick={() => setFilterStatus(status as ImagePlaceholderStatus)}
                className={`px-3 py-1.5 text-sm transition-colors ${
                  filterStatus === status ? 'bg-primary text-white' : 'bg-dark-700 text-dark-300 hover:bg-dark-600'
                }`}
              >
                {label} ({count})
              </button>
            )
          })}
        </div>

        <button
          onClick={() => setShowCreateForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm hover:bg-primary-dark transition-colors"
        >
          <PlusIcon className="w-4 h-4" />
          Nouveau placeholder
        </button>
      </div>

      {/* Create form modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-dark-800 border border-dark-600 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b border-dark-600 flex justify-between items-center">
              <h3 className="font-heading font-bold">Nouveau placeholder</h3>
              <button onClick={() => setShowCreateForm(false)} className="text-dark-400 hover:text-white">
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm text-dark-300 mb-1">Chemin de l&apos;image *</label>
                <input
                  type="text"
                  value={newPlaceholder.path}
                  onChange={(e) => setNewPlaceholder({ ...newPlaceholder, path: e.target.value })}
                  placeholder="/images/hero-bg.jpg"
                  className="w-full px-3 py-2 bg-dark-700 border border-dark-600 text-white focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-dark-300 mb-1">Nom *</label>
                <input
                  type="text"
                  value={newPlaceholder.name}
                  onChange={(e) => setNewPlaceholder({ ...newPlaceholder, name: e.target.value })}
                  placeholder="Image hero principale"
                  className="w-full px-3 py-2 bg-dark-700 border border-dark-600 text-white focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-dark-300 mb-1">Description</label>
                <input
                  type="text"
                  value={newPlaceholder.description}
                  onChange={(e) => setNewPlaceholder({ ...newPlaceholder, description: e.target.value })}
                  placeholder="Image de fond pour la section hero"
                  className="w-full px-3 py-2 bg-dark-700 border border-dark-600 text-white focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-dark-300 mb-1">Prompt initial *</label>
                <textarea
                  value={newPlaceholder.prompt_initial}
                  onChange={(e) => setNewPlaceholder({ ...newPlaceholder, prompt_initial: e.target.value })}
                  placeholder="Dojo traditionnel japonais avec des pratiquants d'arts martiaux, eclairage violet/bleu moderne, atmosphere professionnelle..."
                  rows={4}
                  className="w-full px-3 py-2 bg-dark-700 border border-dark-600 text-white focus:border-primary focus:outline-none resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-dark-300 mb-1">Largeur (px)</label>
                  <input
                    type="number"
                    value={newPlaceholder.width}
                    onChange={(e) => setNewPlaceholder({ ...newPlaceholder, width: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 bg-dark-700 border border-dark-600 text-white focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm text-dark-300 mb-1">Hauteur (px)</label>
                  <input
                    type="number"
                    value={newPlaceholder.height}
                    onChange={(e) => setNewPlaceholder({ ...newPlaceholder, height: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 bg-dark-700 border border-dark-600 text-white focus:border-primary focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={() => setShowCreateForm(false)}
                  className="px-4 py-2 bg-dark-600 text-white text-sm hover:bg-dark-500"
                >
                  Annuler
                </button>
                <button
                  onClick={createPlaceholder}
                  disabled={!newPlaceholder.path || !newPlaceholder.name || !newPlaceholder.prompt_initial}
                  className="px-4 py-2 bg-primary text-white text-sm hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Creer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Placeholders grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPlaceholders.map((placeholder) => (
          <div
            key={placeholder.id}
            onClick={() => setSelectedPlaceholder(placeholder)}
            className={`bg-dark-700 border cursor-pointer transition-colors ${
              selectedPlaceholder?.id === placeholder.id
                ? 'border-primary'
                : 'border-dark-600 hover:border-dark-500'
            }`}
          >
            {/* Image preview */}
            <div className="aspect-video bg-dark-800 relative overflow-hidden">
              {placeholder.current_image_url ? (
                <img
                  src={placeholder.current_image_url}
                  alt={placeholder.name}
                  className="w-full h-full object-cover"
                />
              ) : placeholder.generations?.find(g => g.status === 'generated')?.image_url ? (
                <img
                  src={placeholder.generations.find(g => g.status === 'generated')?.image_url}
                  alt={placeholder.name}
                  className="w-full h-full object-cover opacity-75"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <PhotoIcon className="w-12 h-12 text-dark-600" />
                </div>
              )}
              <div className="absolute top-2 right-2">
                <span className={`px-2 py-1 text-xs rounded ${statusLabels[placeholder.status].color}`}>
                  {statusLabels[placeholder.status].label}
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="p-3">
              <h3 className="font-medium text-sm truncate">{placeholder.name}</h3>
              <p className="text-dark-400 text-xs truncate">{placeholder.path}</p>
              <p className="text-dark-500 text-xs mt-1">
                {placeholder.width}x{placeholder.height}px
              </p>
            </div>
          </div>
        ))}

        {filteredPlaceholders.length === 0 && (
          <div className="col-span-full py-12 text-center text-dark-400">
            <PhotoIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>Aucun placeholder {filterStatus !== 'all' ? `avec le statut "${statusLabels[filterStatus].label}"` : ''}</p>
          </div>
        )}
      </div>

      {/* Detail panel */}
      {selectedPlaceholder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-dark-800 border border-dark-600 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b border-dark-600 flex justify-between items-center">
              <div>
                <h3 className="font-heading font-bold">{selectedPlaceholder.name}</h3>
                <p className="text-dark-400 text-sm">{selectedPlaceholder.path}</p>
              </div>
              <button onClick={() => setSelectedPlaceholder(null)} className="text-dark-400 hover:text-white">
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6 p-6">
              {/* Left: Image preview */}
              <div>
                <div className="aspect-video bg-dark-900 relative overflow-hidden mb-4">
                  {latestGeneration?.image_url ? (
                    <img
                      src={latestGeneration.image_url}
                      alt="Preview"
                      className="w-full h-full object-contain"
                    />
                  ) : selectedPlaceholder.current_image_url ? (
                    <img
                      src={selectedPlaceholder.current_image_url}
                      alt="Current"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <PhotoIcon className="w-16 h-16 text-dark-600" />
                    </div>
                  )}
                  {isGenerating && (
                    <div className="absolute inset-0 bg-black/75 flex items-center justify-center">
                      <div className="text-center">
                        <ArrowPathIcon className="w-8 h-8 animate-spin text-primary mx-auto mb-2" />
                        <p className="text-sm">Generation en cours...</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions for generated image */}
                {latestGeneration && latestGeneration.status === 'generated' && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => approveGeneration(latestGeneration.id)}
                      disabled={isApproving}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
                    >
                      <CheckIcon className="w-4 h-4" />
                      Approuver
                    </button>
                    <button
                      onClick={() => rejectGeneration(latestGeneration.id)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white hover:bg-red-700"
                    >
                      <XMarkIcon className="w-4 h-4" />
                      Rejeter
                    </button>
                  </div>
                )}

                {/* History toggle */}
                {selectedPlaceholder.generations && selectedPlaceholder.generations.length > 0 && (
                  <button
                    onClick={() => setShowHistory(!showHistory)}
                    className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2 bg-dark-700 text-dark-300 hover:bg-dark-600"
                  >
                    <ClockIcon className="w-4 h-4" />
                    Historique ({selectedPlaceholder.generations.length})
                    <ChevronDownIcon className={`w-4 h-4 transition-transform ${showHistory ? 'rotate-180' : ''}`} />
                  </button>
                )}

                {/* History list */}
                {showHistory && selectedPlaceholder.generations && (
                  <div className="mt-4 space-y-2 max-h-48 overflow-y-auto">
                    {selectedPlaceholder.generations
                      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                      .map((gen) => (
                        <div
                          key={gen.id}
                          className="flex items-center gap-3 p-2 bg-dark-700 text-sm"
                        >
                          <div className="w-16 h-12 bg-dark-800 flex-shrink-0">
                            {gen.image_url && (
                              <img
                                src={gen.image_url}
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-dark-400 text-xs truncate">
                              {new Date(gen.created_at).toLocaleString('fr-BE')}
                            </p>
                            <span className={`text-xs px-1.5 py-0.5 rounded ${
                              gen.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                              gen.status === 'rejected' ? 'bg-red-500/20 text-red-400' :
                              'bg-yellow-500/20 text-yellow-400'
                            }`}>
                              {gen.status === 'approved' ? 'Approuve' :
                               gen.status === 'rejected' ? 'Rejete' : 'En attente'}
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>

              {/* Right: Generation controls */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-dark-300 mb-1">Prompt actuel</label>
                  <div className="p-3 bg-dark-900 text-sm text-dark-300 max-h-32 overflow-y-auto">
                    {selectedPlaceholder.prompt_current || selectedPlaceholder.prompt_initial}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-dark-300 mb-1">
                    <ChatBubbleLeftIcon className="w-4 h-4 inline mr-1" />
                    Feedback / Corrections
                  </label>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Decrivez les modifications souhaitees..."
                    rows={3}
                    className="w-full px-3 py-2 bg-dark-700 border border-dark-600 text-white focus:border-primary focus:outline-none resize-none text-sm"
                  />
                </div>

                {/* Reference image upload */}
                <div>
                  <label className="block text-sm text-dark-300 mb-1">
                    <ArrowUpTrayIcon className="w-4 h-4 inline mr-1" />
                    Image de reference (optionnel)
                  </label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  {referenceImage ? (
                    <div className="relative">
                      <div className="h-24 bg-dark-900 overflow-hidden">
                        <img
                          src={`data:image/jpeg;base64,${referenceImage}`}
                          alt="Reference"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <button
                        onClick={() => setReferenceImage(null)}
                        className="absolute top-1 right-1 p-1 bg-dark-800 text-dark-300 hover:text-white"
                      >
                        <XMarkIcon className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full p-4 border border-dashed border-dark-600 text-dark-400 hover:border-dark-500 hover:text-dark-300 text-sm"
                    >
                      Cliquer pour uploader une image
                    </button>
                  )}
                  <p className="text-dark-500 text-xs mt-1">
                    L&apos;IA utilisera cette image comme reference de style/sujet
                  </p>
                </div>

                <button
                  onClick={generateImage}
                  disabled={isGenerating}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white hover:bg-primary-dark disabled:opacity-50"
                >
                  {isGenerating ? (
                    <>
                      <ArrowPathIcon className="w-5 h-5 animate-spin" />
                      Generation...
                    </>
                  ) : (
                    <>
                      <SparklesIcon className="w-5 h-5" />
                      {latestGeneration ? 'Regenerer avec feedback' : 'Generer l\'image'}
                    </>
                  )}
                </button>

                <p className="text-dark-500 text-xs text-center">
                  La generation peut prendre quelques secondes
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
