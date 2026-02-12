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
  TagIcon,
  MagnifyingGlassMinusIcon,
  ArrowsPointingOutIcon,
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
  tags?: string[]
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

// Ratios predefinis avec dimensions de base
const ASPECT_RATIOS = [
  { label: '1:1', ratio: 1, width: 1024, height: 1024 },
  { label: '4:5', ratio: 4/5, width: 1024, height: 1280 },
  { label: '3:4', ratio: 3/4, width: 1024, height: 1365 },
  { label: '10:14', ratio: 10/14, width: 1024, height: 1433 },
  { label: '2:3', ratio: 2/3, width: 1024, height: 1536 },
  { label: '9:16', ratio: 9/16, width: 1024, height: 1820 },
  { label: '1:2', ratio: 1/2, width: 1024, height: 2048 },
  { label: '5:4', ratio: 5/4, width: 1280, height: 1024 },
  { label: '4:3', ratio: 4/3, width: 1365, height: 1024 },
  { label: '14:10', ratio: 14/10, width: 1433, height: 1024 },
  { label: '3:2', ratio: 3/2, width: 1536, height: 1024 },
  { label: '16:9', ratio: 16/9, width: 1820, height: 1024 },
  { label: '2:1', ratio: 2/1, width: 2048, height: 1024 },
]

// Tags predéfinis pour suggestions
const SUGGESTED_TAGS = ['hero', 'background', 'portrait', 'action', 'dojo', 'logo', 'banner', 'card', 'section']

// Modeles IA disponibles
const AI_MODELS = [
  {
    id: 'gemini-2.5-flash-image',
    name: 'Gemini 2.5 Flash',
    description: 'Rapide, supporte image de reference',
    type: 'gemini' as const,
    badge: 'Rapide',
    badgeColor: 'bg-blue-500/20 text-blue-400',
  },
  {
    id: 'imagen-4.0-fast-generate-001',
    name: 'Imagen 4 Fast',
    description: 'Dedie image, bon compromis vitesse/qualite',
    type: 'imagen' as const,
    badge: null as string | null,
    badgeColor: '',
  },
  {
    id: 'imagen-4.0-generate-001',
    name: 'Imagen 4',
    description: 'Haute qualite, dedie generation d\'images',
    type: 'imagen' as const,
    badge: 'Recommande',
    badgeColor: 'bg-green-500/20 text-green-400',
  },
  {
    id: 'imagen-4.0-ultra-generate-001',
    name: 'Imagen 4 Ultra',
    description: 'Meilleure qualite possible, plus lent',
    type: 'imagen' as const,
    badge: 'Premium',
    badgeColor: 'bg-purple-500/20 text-purple-400',
  },
]

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function ImageManager({ initialPlaceholders }: ImageManagerProps) {
  const [placeholders, setPlaceholders] = useState<ImagePlaceholder[]>(initialPlaceholders)
  const [filterStatus, setFilterStatus] = useState<ImagePlaceholderStatus | 'all'>('all')
  const [filterTag, setFilterTag] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPlaceholder, setSelectedPlaceholder] = useState<ImagePlaceholder | null>(null)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [isApproving, setIsApproving] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [referenceImage, setReferenceImage] = useState<string | null>(null)
  const [selectedModel, setSelectedModel] = useState('gemini-2.5-flash-image')
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Form state for new placeholder
  const [newPlaceholder, setNewPlaceholder] = useState({
    name: '',
    description: '',
    prompt_initial: '',
    selectedRatio: '16:9',
    tags: [] as string[],
    newTag: '',
  })

  // Extraire tous les tags uniques des placeholders
  const allTags = Array.from(new Set(placeholders.flatMap(p => p.tags || [])))

  // Filtrer les placeholders
  const filteredPlaceholders = placeholders.filter(p => {
    if (filterStatus !== 'all' && p.status !== filterStatus) return false
    if (filterTag && !(p.tags || []).includes(filterTag)) return false
    if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  async function fetchPlaceholders() {
    const response = await fetch('/api/images/placeholders')
    if (response.ok) {
      const data = await response.json()
      setPlaceholders(data)
    }
  }

  async function createPlaceholder() {
    const selectedRatioData = ASPECT_RATIOS.find(r => r.label === newPlaceholder.selectedRatio)
    const slug = slugify(newPlaceholder.name)
    const path = `/images/generated/${slug}.jpg`

    const response = await fetch('/api/images/placeholders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        path,
        name: newPlaceholder.name,
        description: newPlaceholder.description,
        prompt_initial: newPlaceholder.prompt_initial,
        width: selectedRatioData?.width || 1024,
        height: selectedRatioData?.height || 1024,
        tags: newPlaceholder.tags,
      }),
    })

    if (response.ok) {
      setShowCreateForm(false)
      setNewPlaceholder({
        name: '',
        description: '',
        prompt_initial: '',
        selectedRatio: '16:9',
        tags: [],
        newTag: '',
      })
      // Fetch updated list and auto-open the new placeholder
      const listResponse = await fetch('/api/images/placeholders')
      if (listResponse.ok) {
        const updatedList = await listResponse.json()
        setPlaceholders(updatedList)
        const newPh = updatedList.find((p: ImagePlaceholder) => p.path === path)
        if (newPh) setSelectedPlaceholder(newPh)
      }
    }
  }

  function addTag(tag: string) {
    const trimmed = tag.trim().toLowerCase()
    if (trimmed && !newPlaceholder.tags.includes(trimmed)) {
      setNewPlaceholder({
        ...newPlaceholder,
        tags: [...newPlaceholder.tags, trimmed],
        newTag: '',
      })
    }
  }

  function removeTag(tag: string) {
    setNewPlaceholder({
      ...newPlaceholder,
      tags: newPlaceholder.tags.filter(t => t !== tag),
    })
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
          model: selectedModel,
        }),
      })

      if (response.ok) {
        await fetchPlaceholders()
        setFeedback('')
        setReferenceImage(null)
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

  // Helper: trouver la meilleure URL d'image pour un placeholder
  function getDisplayUrl(p: ImagePlaceholder): string | null {
    const latestGen = p.generations
      ?.filter(g => g.status === 'approved' || g.status === 'generated')
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0]
    if (latestGen?.image_url) return latestGen.image_url
    return p.current_image_url || null
  }

  const latestGeneration = selectedPlaceholder?.generations
    ?.filter(g => g.status === 'generated')
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0]

  return (
    <div className="space-y-6">
      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-[60] p-4 cursor-pointer"
          onClick={() => setLightboxImage(null)}
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-4 right-4 p-2 bg-dark-800 text-white hover:bg-dark-700 z-10"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
          <img
            src={lightboxImage}
            alt="Preview"
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Header with filters */}
      <div className="space-y-4">
        {/* Search and create */}
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex-1 max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher par nom..."
              className="w-full px-3 py-2 bg-dark-700 border border-dark-600 text-white focus:border-primary focus:outline-none text-sm"
            />
          </div>
          <button
            onClick={() => setShowCreateForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm hover:bg-primary-dark transition-colors"
          >
            <PlusIcon className="w-4 h-4" />
            Nouveau placeholder
          </button>
        </div>

        {/* Status filters */}
        <div className="flex flex-wrap gap-2">
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

        {/* Tag filters */}
        {allTags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <TagIcon className="w-4 h-4 text-dark-400" />
            <button
              onClick={() => setFilterTag(null)}
              className={`px-2 py-1 text-xs transition-colors rounded ${
                filterTag === null ? 'bg-primary/20 text-primary' : 'bg-dark-700 text-dark-400 hover:bg-dark-600'
              }`}
            >
              Tous
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setFilterTag(filterTag === tag ? null : tag)}
                className={`px-2 py-1 text-xs transition-colors rounded ${
                  filterTag === tag ? 'bg-primary/20 text-primary' : 'bg-dark-700 text-dark-400 hover:bg-dark-600'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
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
                <label className="block text-sm text-dark-300 mb-1">Nom *</label>
                <input
                  type="text"
                  value={newPlaceholder.name}
                  onChange={(e) => setNewPlaceholder({ ...newPlaceholder, name: e.target.value })}
                  placeholder="Ex: Hero background dojo"
                  className="w-full px-3 py-2 bg-dark-700 border border-dark-600 text-white focus:border-primary focus:outline-none"
                />
                {newPlaceholder.name && (
                  <p className="text-dark-500 text-xs mt-1">
                    Chemin: /images/generated/{slugify(newPlaceholder.name)}.jpg
                  </p>
                )}
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

              {/* Ratio selection */}
              <div>
                <label className="block text-sm text-dark-300 mb-2">Format / Ratio *</label>
                <div className="grid grid-cols-7 gap-2">
                  {ASPECT_RATIOS.map((ratio) => (
                    <button
                      key={ratio.label}
                      onClick={() => setNewPlaceholder({ ...newPlaceholder, selectedRatio: ratio.label })}
                      className={`p-2 border text-xs text-center transition-colors ${
                        newPlaceholder.selectedRatio === ratio.label
                          ? 'border-primary bg-primary/20 text-white'
                          : 'border-dark-600 bg-dark-700 text-dark-400 hover:border-dark-500'
                      }`}
                    >
                      <div
                        className={`mx-auto mb-1 border ${
                          newPlaceholder.selectedRatio === ratio.label ? 'border-primary' : 'border-dark-500'
                        }`}
                        style={{
                          width: ratio.ratio >= 1 ? '24px' : `${24 * ratio.ratio}px`,
                          height: ratio.ratio >= 1 ? `${24 / ratio.ratio}px` : '24px',
                        }}
                      />
                      {ratio.label}
                    </button>
                  ))}
                </div>
                {newPlaceholder.selectedRatio && (
                  <p className="text-dark-500 text-xs mt-2">
                    Dimensions: {ASPECT_RATIOS.find(r => r.label === newPlaceholder.selectedRatio)?.width}x
                    {ASPECT_RATIOS.find(r => r.label === newPlaceholder.selectedRatio)?.height}px
                  </p>
                )}
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm text-dark-300 mb-1">
                  <TagIcon className="w-4 h-4 inline mr-1" />
                  Tags
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {newPlaceholder.tags.map(tag => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-primary/20 text-primary text-xs rounded"
                    >
                      {tag}
                      <button onClick={() => removeTag(tag)} className="hover:text-white">
                        <XMarkIcon className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newPlaceholder.newTag}
                    onChange={(e) => setNewPlaceholder({ ...newPlaceholder, newTag: e.target.value })}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        addTag(newPlaceholder.newTag)
                      }
                    }}
                    placeholder="Ajouter un tag..."
                    className="flex-1 px-3 py-2 bg-dark-700 border border-dark-600 text-white focus:border-primary focus:outline-none text-sm"
                  />
                  <button
                    onClick={() => addTag(newPlaceholder.newTag)}
                    disabled={!newPlaceholder.newTag.trim()}
                    className="px-3 py-2 bg-dark-600 text-white text-sm hover:bg-dark-500 disabled:opacity-50"
                  >
                    +
                  </button>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {SUGGESTED_TAGS.filter(t => !newPlaceholder.tags.includes(t)).map(tag => (
                    <button
                      key={tag}
                      onClick={() => addTag(tag)}
                      className="px-2 py-0.5 bg-dark-700 text-dark-400 text-xs hover:bg-dark-600 rounded"
                    >
                      + {tag}
                    </button>
                  ))}
                </div>
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

              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={() => setShowCreateForm(false)}
                  className="px-4 py-2 bg-dark-600 text-white text-sm hover:bg-dark-500"
                >
                  Annuler
                </button>
                <button
                  onClick={createPlaceholder}
                  disabled={!newPlaceholder.name || !newPlaceholder.prompt_initial}
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
            <div className="aspect-video bg-dark-800 relative overflow-hidden group">
              {(() => {
                const url = getDisplayUrl(placeholder)
                return url ? (
                  <>
                    <img
                      src={url}
                      alt={placeholder.name}
                      className={`w-full h-full object-cover${placeholder.status === 'review' ? ' opacity-75' : ''}`}
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setLightboxImage(url)
                      }}
                      className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                    >
                      <ArrowsPointingOutIcon className="w-8 h-8 text-white" />
                    </button>
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <PhotoIcon className="w-12 h-12 text-dark-600" />
                  </div>
                )
              })()}
              <div className="absolute top-2 right-2">
                <span className={`px-2 py-1 text-xs rounded ${statusLabels[placeholder.status].color}`}>
                  {statusLabels[placeholder.status].label}
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="p-3">
              <h3 className="font-medium text-sm truncate">{placeholder.name}</h3>
              <p className="text-dark-500 text-xs mt-1">
                {placeholder.width}x{placeholder.height}px
              </p>
              {placeholder.tags && placeholder.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {placeholder.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="px-1.5 py-0.5 bg-dark-600 text-dark-400 text-xs rounded">
                      {tag}
                    </span>
                  ))}
                  {placeholder.tags.length > 3 && (
                    <span className="text-dark-500 text-xs">+{placeholder.tags.length - 3}</span>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}

        {filteredPlaceholders.length === 0 && (
          <div className="col-span-full py-12 text-center text-dark-400">
            <PhotoIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>Aucun placeholder trouve</p>
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
                <p className="text-dark-400 text-sm">{selectedPlaceholder.width}x{selectedPlaceholder.height}px</p>
              </div>
              <button onClick={() => setSelectedPlaceholder(null)} className="text-dark-400 hover:text-white">
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6 p-6">
              {/* Left: Image preview */}
              <div>
                <div
                  className="bg-dark-900 relative overflow-hidden mb-4 cursor-pointer group"
                  style={{ aspectRatio: `${selectedPlaceholder.width}/${selectedPlaceholder.height}` }}
                  onClick={() => {
                    const url = latestGeneration?.image_url || getDisplayUrl(selectedPlaceholder)
                    if (url) setLightboxImage(url)
                  }}
                >
                  {(() => {
                    const url = latestGeneration?.image_url || getDisplayUrl(selectedPlaceholder)
                    return url ? (
                      <>
                        <img
                          src={url}
                          alt="Preview"
                          className="w-full h-full object-contain"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <ArrowsPointingOutIcon className="w-8 h-8 text-white" />
                        </div>
                      </>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <PhotoIcon className="w-16 h-16 text-dark-600" />
                      </div>
                    )
                  })()}
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
                          className="flex items-center gap-3 p-2 bg-dark-700 text-sm cursor-pointer hover:bg-dark-600"
                          onClick={() => gen.image_url && setLightboxImage(gen.image_url)}
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

                {/* Model selector */}
                <div>
                  <label className="block text-sm text-dark-300 mb-2">
                    <SparklesIcon className="w-4 h-4 inline mr-1" />
                    Modele IA
                  </label>
                  <div className="space-y-1">
                    {AI_MODELS.map((m) => (
                      <button
                        key={m.id}
                        onClick={() => {
                          setSelectedModel(m.id)
                          if (m.type === 'imagen') setReferenceImage(null)
                        }}
                        className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                          selectedModel === m.id
                            ? 'bg-primary/20 border border-primary text-white'
                            : 'bg-dark-700 border border-dark-600 text-dark-300 hover:border-dark-500'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{m.name}</span>
                          {m.badge && (
                            <span className={`text-xs px-1.5 py-0.5 rounded ${m.badgeColor}`}>
                              {m.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-dark-400 mt-0.5">{m.description}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Reference image upload - Gemini only */}
                {AI_MODELS.find(m => m.id === selectedModel)?.type === 'gemini' && (
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
                )}

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
