export interface Movie {
  id: number
  title: string
  poster_path: string | null
  backdrop_path: string | null
  overview: string
  release_date: string
  vote_average: number
  genre_ids: number[]
  original_language: string
  runtime?: number
  genres?: Genre[]
  credits?: {
    cast: CastMember[]
    crew: CrewMember[]
  }
}

export interface Genre {
  id: number
  name: string
}

export interface CastMember {
  id: number
  name: string
  character: string
}

export interface CrewMember {
  id: number
  name: string
  job: string
}

export interface MovieDetails extends Movie {
  runtime: number
  genres: Genre[]
  credits: {
    cast: CastMember[]
    crew: CrewMember[]
  }
}

export type FilterType = 'popular' | 'now_playing' | 'upcoming' | 'top_rated'

export interface TMDBResponse {
  results: Movie[]
  page: number
  total_pages: number
  total_results: number
}

export interface GenresResponse {
  genres: Genre[]
}

export interface Video {
  id: string
  key: string
  name: string
  site: string
  type: string
  official: boolean
}

export interface VideosResponse {
  results: Video[]
}

export interface WatchProvider {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface WatchProviderCountry {
  link?: string
  flatrate?: WatchProvider[]
  rent?: WatchProvider[]
  buy?: WatchProvider[]
  ads?: WatchProvider[]
}

export interface WatchProvidersResponse {
  results: {
    [countryCode: string]: WatchProviderCountry
  }
}
