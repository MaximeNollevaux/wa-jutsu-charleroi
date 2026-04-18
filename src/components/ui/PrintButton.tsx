'use client'

export function PrintButton({ label = 'Imprimer' }: { label?: string }) {
  return (
    <button
      onClick={() => window.print()}
      className="bg-red-700 text-white font-bold uppercase px-8 py-3 hover:bg-red-800 transition-colors no-print"
    >
      {label}
    </button>
  )
}
