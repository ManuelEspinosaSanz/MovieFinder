'use server'

import { fetchMovies, fetchMovieDetails, fetchGenres } from '@/lib/tmdb'
import type { FilterType } from '@/lib/types'

export async function getMovies(filter: FilterType = 'popular') {
  return fetchMovies(filter)
}

export async function searchMovies(query: string) {
  return fetchMovies('popular', query)
}

export async function getMovieDetails(movieId: number) {
  return fetchMovieDetails(movieId)
}

export async function getGenres() {
  return fetchGenres()
}
