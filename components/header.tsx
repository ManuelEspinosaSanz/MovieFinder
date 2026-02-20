export function Header() {
  return (
    <header className="px-8 pt-16 pb-12 text-center relative bg-gradient-to-b from-muted to-background">
      <div className="inline-block relative">
        <h1 className="font-serif text-5xl md:text-7xl font-light tracking-wider bg-gradient-to-br from-foreground from-60% to-gold bg-clip-text text-transparent">
          MovieFinder
        </h1>
      </div>
      <p className="text-sm tracking-[0.5em] uppercase text-gold mt-4 font-light">
        Cartelera Contemporánea
      </p>
      <div className="w-15 h-px bg-gold mx-auto mt-8 relative before:content-[''] before:absolute before:w-1.5 before:h-1.5 before:bg-gold before:rounded-full before:-top-0.5 before:-left-4 after:content-[''] after:absolute after:w-1.5 after:h-1.5 after:bg-gold after:rounded-full after:-top-0.5 after:-right-4" />
    </header>
  )
}
