'use client'

import { useState, useCallback } from 'react'
import useSWR from 'swr'
import { Header, SearchSection, MovieGallery, MovieModal, Footer } from '.'
import { getMovies, searchMovies, getMovieDetails } from '@/app/actions'
import type { Movie, Genre, MovieDetails, FilterType } from '@/lib/types'

interface MovieFinderClientProps {
  initialMovies: Movie[]
  genres: Genre[]
}

export function MovieFinderClient({ initialMovies, genres }: MovieFinderClientProps) {
  const [currentFilter, setCurrentFilter] = useState<FilterType>('popular')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null)

  // Fetch movies based on filter or search
  const { data: movies, isLoading: isLoadingMovies } = useSWR(
    searchQuery.length > 2 
      ? ['search', searchQuery] 
      : ['movies', currentFilter],
    async ([type, param]) => {
      if (type === 'search') {
        return searchMovies(param)
      }
      return getMovies(param as FilterType)
    },
    { 
      fallbackData: initialMovies,
      revalidateOnFocus: false 
    }
  )

  // Fetch movie details when a movie is selected
  const { data: selectedMovie, isLoading: isLoadingDetails } = useSWR<MovieDetails | null>(
    selectedMovieId ? ['movie', selectedMovieId] : null,
    async ([, id]) => getMovieDetails(id as number),
    { revalidateOnFocus: false }
  )

  const handleFilterChange = useCallback((filter: FilterType) => {
    setCurrentFilter(filter)
    setSearchQuery('')
  }, [])

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query)
  }, [])

  const handleMovieClick = useCallback((movieId: number) => {
    setSelectedMovieId(movieId)
  }, [])

  const handleCloseModal = useCallback(() => {
    setSelectedMovieId(null)
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <SearchSection
        searchQuery={searchQuery}
        currentFilter={currentFilter}
        onSearchChange={handleSearchChange}
        onFilterChange={handleFilterChange}
      />
      <MovieGallery
        movies={movies || []}
        genres={genres}
        isLoading={isLoadingMovies}
        onMovieClick={handleMovieClick}
      />
      <MovieModal
        movie={selectedMovie ?? null}
        isOpen={selectedMovieId !== null}
        isLoading={isLoadingDetails}
        onClose={handleCloseModal}
      />
      <Footer />
    </div>
  )
}
