import { MovieFinderClient } from '@/components/movie-finder-client'
import { ApiKeyWarning } from '@/components/api-key-warning'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { getMovies, getGenres } from './actions'

export default async function Home() {
  const hasApiKey = !!process.env.TMDB_API_KEY

  if (!hasApiKey) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <ApiKeyWarning />
        <Footer />
      </div>
    )
  }

  const [initialMovies, genres] = await Promise.all([
    getMovies('popular'),
    getGenres()
  ])

  return <MovieFinderClient initialMovies={initialMovies} genres={genres} />
}
