'use client'

import React from "react"

import { cn } from '@/lib/utils'
import type { FilterType } from '@/lib/types'
import { Flame, Clapperboard, Calendar, Star } from 'lucide-react'

interface FilterPillsProps {
  currentFilter: FilterType
  onFilterChange: (filter: FilterType) => void
}

const filters: { label: string; value: FilterType; icon: React.ReactNode; description: string }[] = [
  { label: 'Popular', value: 'popular', icon: <Flame className="w-4 h-4" />, description: 'Lo mas visto' },
  { label: 'En Cartelera', value: 'now_playing', icon: <Clapperboard className="w-4 h-4" />, description: 'Ahora en cines' },
  { label: 'Proximamente', value: 'upcoming', icon: <Calendar className="w-4 h-4" />, description: 'Muy pronto' },
  { label: 'Mejor Valoradas', value: 'top_rated', icon: <Star className="w-4 h-4" />, description: 'Las favoritas' },
]

export function FilterPills({ currentFilter, onFilterChange }: FilterPillsProps) {
  return (
    <div className="mt-12">
      {/* Section title */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <div className="h-px w-12 bg-gradient-to-r from-transparent to-border" />
        <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-light">
          Explorar por categoria
        </span>
        <div className="h-px w-12 bg-gradient-to-l from-transparent to-border" />
      </div>

      {/* Filter buttons */}
      <div className="flex gap-3 justify-center flex-wrap">
        {filters.map((filter) => {
          const isActive = currentFilter === filter.value
          return (
            <button
              key={filter.value}
              onClick={() => onFilterChange(filter.value)}
              className={cn(
                'group relative flex items-center gap-2.5 px-5 py-3 rounded-xl border transition-all duration-300:',
                isActive
                  ? 'bg-foreground text-background border-foreground shadow-lg'
                  : 'bg-transparent border-border hover:border-gold/50 hover:bg-gold/5 cursor-pointer'
              )}
            >
              <span className={cn(
                'transition-colors duration-300',
                isActive ? 'text-gold' : 'text-muted-foreground group-hover:text-gold'
              )}>
                {filter.icon}
              </span>
              <span className="text-sm font-medium tracking-wide">
                {filter.label}
              </span>

              {/* Active indicator dot */}
              {isActive && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gold" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
