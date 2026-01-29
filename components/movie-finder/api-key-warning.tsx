import Link from 'next/link'

export function ApiKeyWarning() {
  return (
    <div className="max-w-[1300px] mx-auto p-8 min-h-[400px]">
      <div className="text-center py-12 px-8 font-serif text-xl text-foreground/50">
        <p className="mb-4">⚠️ Configura tu API Key de TMDB</p>
        <p className="text-base">
          Añade la variable de entorno <code className="bg-muted px-2 py-1 rounded">TMDB_API_KEY</code> con tu clave de API.
        </p>
        <p className="text-base mt-2">
          Consíguela gratis en:{' '}
          <Link 
            href="https://www.themoviedb.org/settings/api" 
            target="_blank" 
            className="text-gold hover:underline"
          >
            themoviedb.org
          </Link>
        </p>
      </div>
    </div>
  )
}
