'use client'

import { cn } from '@/lib/utils'
import type { FilterType } from '@/lib/types'

interface FilterPillsProps {
  currentFilter: FilterType
  onFilterChange: (filter: FilterType) => void
}

const filters: { label: string; value: FilterType }[] = [
  { label: 'Popular', value: 'popular' },
  { label: 'En Cartelera', value: 'now_playing' },
  { label: 'Próximamente', value: 'upcoming' },
  { label: 'Mejor Valoradas', value: 'top_rated' },
]

export function FilterPills({ currentFilter, onFilterChange }: FilterPillsProps) {
  return (
    <div className="flex gap-3 justify-center flex-wrap mt-10">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={cn(
            'px-7 py-2.5 bg-transparent border border-foreground/15 text-foreground font-sans text-sm tracking-wider uppercase cursor-pointer transition-all duration-300 rounded-full font-normal hover:border-gold hover:bg-gold hover:text-background hover:-translate-y-0.5',
            currentFilter === filter.value && 'bg-foreground text-background border-foreground'
          )}
        >
          {filter.label}
        </button>
      ))}
    </div>
  )
}
