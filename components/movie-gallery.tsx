'use client'

import { MovieCard } from './movie-card'
import { LoadingSpinner } from './loading-spinner'
import type { Movie, Genre } from '@/lib/types'

interface MovieGalleryProps {
  movies: Movie[]
  genres: Genre[]
  isLoading: boolean
  onMovieClick: (movieId: number) => void
}

export function MovieGallery({ movies, genres, isLoading, onMovieClick }: MovieGalleryProps) {
  if (isLoading) {
    return (
      <div className="max-w-[1300px] mx-auto p-8 grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-y-12 gap-x-8 min-h-[400px]">
        <LoadingSpinner />
      </div>
    )
  }

  if (!movies || movies.length === 0) {
    return (
      <div className="max-w-[1300px] mx-auto p-8 min-h-[400px]">
        <div className="text-center py-12 px-8 font-serif text-xl text-foreground/50">
          No se encontraron películas
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-[1300px] mx-auto p-8 grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-y-12 gap-x-8 min-h-[400px]">
      {movies.map((movie, index) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          genres={genres}
          index={index}
          onClick={onMovieClick}
        />
      ))}
    </div>
  )
}
