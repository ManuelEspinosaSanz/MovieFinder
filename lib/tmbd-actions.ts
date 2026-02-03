'use server'

import type { Video, WatchProviderCountry, VideosResponse, WatchProvidersResponse } from './types'

const API_KEY = process.env.TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

export async function getMovieVideos(movieId: number): Promise<Video | null> {
    try {
        // Intentar obtener videos en español primero
        const response = await fetch(
            `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=es-ES`,
            { next: { revalidate: 3600 } }
        )
        const data: VideosResponse = await response.json()

        // Buscar trailer oficial en español
        let trailer = data.results?.find(
            v => v.type === 'Trailer' && v.site === 'YouTube' && v.official
        )

        // Si no hay en español, buscar en inglés
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

export async function getWatchProviders(movieId: number, countryCode: string = 'ES'): Promise<WatchProviderCountry | null> {
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
