export function LoadingSpinner({ message = 'Cargando películas...' }: { message?: string }) {
  return (
    <div className="text-center py-16 px-8 font-serif text-xl text-gold tracking-widest col-span-full">
      <div className="inline-block w-10 h-10 border-3 border-muted border-t-gold rounded-full animate-spin mb-4" />
      <div>{message}</div>
    </div>
  )
}
