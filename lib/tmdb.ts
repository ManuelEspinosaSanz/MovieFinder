import type {
  Movie,
  MovieDetails,
  Genre,
  FilterType,
  TMDBResponse,
  GenresResponse,
  Video,
  VideosResponse,
  WatchProviderCountry,
  WatchProvidersResponse
} from './types'

const API_KEY = process.env.TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

export const IMG_BASE_URL = 'https://image.tmdb.org/t/p'

export async function fetchMovies(endpoint: FilterType, query?: string): Promise<Movie[]> {
  try {
    let url = `${BASE_URL}/movie/${endpoint}?api_key=${API_KEY}&language=es-ES&page=1`

    if (query) {
      url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=es-ES&query=${encodeURIComponent(query)}&page=1`
    }

    const response = await fetch(url, { next: { revalidate: 3600 } })
    const data: TMDBResponse = await response.json()
    return data.results || []
  } catch (error) {
    console.error('Error fetching movies:', error)
    return []
  }
}

export async function fetchMovieDetails(movieId: number): Promise<MovieDetails | null> {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=es-ES&append_to_response=credits`,
      { next: { revalidate: 3600 } }
    )
    const data: MovieDetails = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching movie details:', error)
    return null
  }
}

export async function fetchGenres(): Promise<Genre[]> {
  try {
    const response = await fetch(
      `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=es-ES`,
      { next: { revalidate: 86400 } }
    )
    const data: GenresResponse = await response.json()
    return data.genres || []
  } catch (error) {
    console.error('Error loading genres:', error)
    return []
  }
}

export function getGenreNames(genreIds: number[], allGenres: Genre[]): string {
  if (!genreIds || !allGenres) return 'N/A'
  return genreIds
    .slice(0, 2)
    .map(id => {
      const genre = allGenres.find(g => g.id === id)
      return genre ? genre.name : ''
    })
    .filter(Boolean)
    .join(' · ') || 'N/A'
}

export function getPosterUrl(path: string | null, size: 'w500' | 'original' = 'w500'): string | null {
  if (!path) return null
  return `${IMG_BASE_URL}/${size}${path}`
}

export function getBackdropUrl(path: string | null): string | null {
  if (!path) return null
  return `${IMG_BASE_URL}/original${path}`
}

export async function fetchMovieVideos(movieId: number): Promise<Video | null> {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=es-ES`,
      { next: { revalidate: 3600 } }
    )
    const data: VideosResponse = await response.json()

    // Buscar trailer oficial en espanol primero
    let trailer = data.results?.find(
      v => v.type === 'Trailer' && v.site === 'YouTube' && v.official
    )

    // Si no hay en espanol, buscar en ingles
    if (!trailer) {
      const englishResponse = await fetch(
        `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`,
        { next: { revalidate: 3600 } }
      )
      const englishData: VideosResponse = await englishResponse.json()
      trailer = englishData.results?.find(
        v => v.type === 'Trailer' && v.site === 'YouTube' && v.official
      )
      // Si no hay oficial, buscar cualquier trailer
      if (!trailer) {
        trailer = englishData.results?.find(
          v => v.type === 'Trailer' && v.site === 'YouTube'
        )
      }
    }

    return trailer || null
  } catch (error) {
    console.error('Error fetching movie videos:', error)
    return null
  }
}

export async function fetchWatchProviders(movieId: number, countryCode: string = 'ES'): Promise<WatchProviderCountry | null> {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}/watch/providers?api_key=${API_KEY}`,
      { next: { revalidate: 3600 } }
    )
    const data: WatchProvidersResponse = await response.json()

    return data.results?.[countryCode] || null
  } catch (error) {
    console.error('Error fetching watch providers:', error)
    return null
  }
}

export function getProviderLogoUrl(path: string): string {
  return `${IMG_BASE_URL}/w92${path}`
}
