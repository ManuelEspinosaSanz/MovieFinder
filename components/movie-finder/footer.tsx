import { ArrowUpRight } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-24 py-20 px-8 bg-secondary/50">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-8">
        {/* Decorative element */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold/60" />
          <div className="w-2 h-2 rotate-45 bg-gold/80" />
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold/60" />
        </div>

        {/* Main CTA */}
        <div className="text-center space-y-3">
          <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground">
            Creado por
          </p>
          <a
            href="https://manuelespinosa.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gold/30 bg-background/80 hover:bg-gold hover:border-gold transition-all duration-300"
          >
            <span className="font-serif text-xl tracking-wide text-foreground group-hover:text-primary-foreground transition-colors duration-300">
              Manuel Espinosa
            </span>
            <ArrowUpRight className="w-4 h-4 text-gold group-hover:text-primary-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
          </a>
          <p className="text-xs tracking-[0.2em] text-muted-foreground/60 pt-2">
            Descubre más proyectos en mi portfolio
          </p>
        </div>

        {/* Bottom info */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 pt-4 text-xs tracking-[0.2em] uppercase text-foreground/30">
          <span>&copy; {currentYear}</span>
        </div>
      </div>
    </footer>
  )
}
