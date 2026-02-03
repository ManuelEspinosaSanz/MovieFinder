'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { X, Star, Play } from 'lucide-react'
import { getBackdropUrl, getPosterUrl, getProviderLogoUrl } from '@/lib/tmdb'
import { getMovieVideos, getWatchProviders } from '@/lib/tmbd-actions'
import type { MovieDetails, Video, WatchProviderCountry } from '@/lib/types'

interface MovieModalProps {
  movie: MovieDetails | null
  isOpen: boolean
  isLoading: boolean
  onClose: () => void
}

export function MovieModal({ movie, isOpen, isLoading, onClose }: MovieModalProps) {
  const [trailer, setTrailer] = useState<Video | null>(null)
  const [providers, setProviders] = useState<WatchProviderCountry | null>(null)
  const [showTrailer, setShowTrailer] = useState(false)
  const [loadingExtras, setLoadingExtras] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  useEffect(() => {
    async function loadExtras() {
      if (movie?.id && isOpen) {
        setLoadingExtras(true)
        setShowTrailer(false)

        const [videoData, providerData] = await Promise.all([
          getMovieVideos(movie.id),
          getWatchProviders(movie.id, 'ES')
        ])

        setTrailer(videoData)
        setProviders(providerData)
        setLoadingExtras(false)
      }
    }
    loadExtras()
  }, [movie?.id, isOpen])

  useEffect(() => {
    if (!isOpen) {
      setTrailer(null)
      setProviders(null)
      setShowTrailer(false)
    }
  }, [isOpen])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  if (!isOpen) return null

  const backdropUrl = movie?.backdrop_path
    ? getBackdropUrl(movie.backdrop_path)
    : getPosterUrl(movie?.poster_path ?? null, 'w500')

  const directors = movie?.credits?.crew
    ?.filter(person => person.job === 'Director')
    .map(d => d.name)
    .join(', ') || 'N/A'

  const cast = movie?.credits?.cast
    ?.slice(0, 5)
    .map(actor => actor.name)
    .join(', ') || 'N/A'

  const year = movie?.release_date ? movie.release_date.split('-')[0] : 'N/A'
  const rating = movie?.vote_average ? movie.vote_average.toFixed(1) : 'N/A'
  const genresText = movie?.genres?.map(g => g.name).join(', ') || 'N/A'

  // Combinar todos los providers únicos
  const allProviders = [
    ...(providers?.flatrate || []),
    ...(providers?.rent || []),
    ...(providers?.buy || [])
  ].filter((provider, index, self) =>
    index === self.findIndex(p => p.provider_id === provider.provider_id)
  )

  return (
    <div
      className="fixed inset-0 bg-foreground/85 z-50 overflow-y-auto flex justify-center items-center p-8 animate-fadeIn"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-background max-w-[900px] w-full relative animate-slideUp max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-8 right-8 w-10 h-10 bg-foreground text-background border-none cursor-pointer text-2xl z-10 transition-all duration-300 flex items-center justify-center hover:bg-gold hover:rotate-90"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isLoading ? (
          <div className="h-[400px] flex items-center justify-center">
            <div className="inline-block w-10 h-10 border-3 border-muted border-t-gold rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {/* Hero section with backdrop/trailer */}
            <div className="w-full h-[400px] bg-gradient-to-br from-muted to-muted/80 relative overflow-hidden">
              {showTrailer && trailer ? (
                <iframe
                  src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&rel=0`}
                  title={trailer.name}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              ) : (
                <>
                  {backdropUrl && (
                    <Image
                      src={backdropUrl || "/placeholder.svg"}
                      alt={movie?.title || ''}
                      fill
                      className="object-cover"
                    />
                  )}
                  <div className="absolute bottom-0 left-0 w-full h-[150px] bg-gradient-to-b from-transparent to-background" />

                  {/* Play trailer button */}
                  {trailer && (
                    <button
                      onClick={() => setShowTrailer(true)}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-3 px-6 py-3 bg-background/90 hover:bg-gold text-foreground hover:text-background rounded-full transition-all duration-300 group shadow-xl"
                    >
                      <Play className="w-5 h-5 fill-current" />
                      <span className="font-medium tracking-wide">Ver Trailer</span>
                    </button>
                  )}
                </>
              )}
            </div>

            <div className="p-8 md:px-12 md:pb-12">
              <h2 className="font-serif text-3xl md:text-5xl font-normal mb-4 text-foreground tracking-wide">
                {movie?.title}
              </h2>

              <div className="flex gap-8 mb-8 flex-wrap">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gold font-medium tracking-widest uppercase text-xs">Año</span>
                  <span>{year}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gold font-medium tracking-widest uppercase text-xs">Duración</span>
                  <span>{movie?.runtime ? `${movie.runtime} min` : 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gold font-medium tracking-widest uppercase text-xs">Valoración</span>
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-gold fill-gold" />
                    {rating} / 10
                  </span>
                </div>
              </div>

              <p className="text-base leading-relaxed mb-8 text-foreground/80">
                {movie?.overview || 'Sin descripción disponible.'}
              </p>

              {/* Watch Providers Section - Minimalista */}
              {!loadingExtras && allProviders.length > 0 && (
                <div className="mb-8 pb-8 border-b border-foreground/10">
                  <p className="text-xs tracking-widest uppercase text-muted-foreground mb-3">
                    Disponible en
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {allProviders.slice(0, 8).map((provider) => (
                      <div
                        key={provider.provider_id}
                        className="group relative"
                        title={provider.provider_name}
                      >
                        <Image
                          src={getProviderLogoUrl(provider.logo_path) || "/placeholder.svg"}
                          alt={provider.provider_name}
                          width={32}
                          height={32}
                          className="rounded-md opacity-80 hover:opacity-100 transition-opacity duration-200"
                        />
                      </div>
                    ))}
                  </div>
                  {providers?.link && (
                    <a
                      href={providers.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-3 text-xs tracking-wider text-muted-foreground hover:text-gold transition-colors"
                    >
                      Ver más opciones
                    </a>
                  )}
                </div>
              )}

              {loadingExtras && (
                <div className="mb-8 pb-8 border-b border-foreground/10 flex items-center gap-3">
                  <div className="inline-block w-4 h-4 border-2 border-muted border-t-gold rounded-full animate-spin" />
                  <span className="text-xs text-muted-foreground">Cargando información...</span>
                </div>
              )}

              <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6">
                <div>
                  <h4 className="font-serif text-xl mb-2 text-foreground">Director</h4>
                  <p className="text-sm text-foreground/60">{directors}</p>
                </div>
                <div>
                  <h4 className="font-serif text-xl mb-2 text-foreground">Reparto</h4>
                  <p className="text-sm text-foreground/60">{cast}</p>
                </div>
                <div>
                  <h4 className="font-serif text-xl mb-2 text-foreground">Géneros</h4>
                  <p className="text-sm text-foreground/60">{genresText}</p>
                </div>
                <div>
                  <h4 className="font-serif text-xl mb-2 text-foreground">Idioma Original</h4>
                  <p className="text-sm text-foreground/60">{movie?.original_language?.toUpperCase() || 'N/A'}</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}