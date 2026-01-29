'use client'

import Image from 'next/image'
import { Film, Star } from 'lucide-react'
import { getPosterUrl, getGenreNames } from '@/lib/tmdb'
import type { Movie, Genre } from '@/lib/types'

interface MovieCardProps {
  movie: Movie
  genres: Genre[]
  index: number
  onClick: (movieId: number) => void
}

export function MovieCard({ movie, genres, index, onClick }: MovieCardProps) {
  const posterUrl = getPosterUrl(movie.poster_path)
  const year = movie.release_date ? movie.release_date.split('-')[0] : 'N/A'
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'
  const genreText = getGenreNames(movie.genre_ids, genres)

  return (
    <article
      className="relative cursor-pointer transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-2 animate-appear"
      style={{ animationDelay: `${(index % 6) * 0.05}s` }}
      onClick={() => onClick(movie.id)}
    >
      <div className="w-full aspect-[2/3] bg-gradient-to-br from-muted to-muted/80 relative overflow-hidden shadow-md transition-shadow duration-400 hover:shadow-xl group">
        {posterUrl ? (
          <Image
            src={posterUrl || "/placeholder.svg"}
            alt={movie.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl opacity-15">
            <Film className="w-16 h-16" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-10" />
      </div>
      
      <div className="py-6">
        <h2 className="font-serif text-2xl font-normal mb-2 text-foreground tracking-wide line-clamp-2">
          {movie.title}
        </h2>
        <p className="text-sm text-foreground/50 font-light tracking-wide">
          {genreText}
        </p>
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-foreground/8">
          <span className="text-xs text-gold font-medium tracking-widest">
            {year}
          </span>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-gold fill-gold" />
            <span className="text-sm font-medium text-foreground">{rating}</span>
          </div>
        </div>
      </div>
    </article>
  )
}
