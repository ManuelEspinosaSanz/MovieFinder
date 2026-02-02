'use client'

import { SearchInput } from './search-input'
import { FilterPills } from './filter-pills'
import type { FilterType } from '@/lib/types'

interface SearchSectionProps {
  searchQuery: string
  currentFilter: FilterType
  onSearchChange: (query: string) => void
  onFilterChange: (filter: FilterType) => void
}

export function SearchSection({
  searchQuery,
  currentFilter,
  onSearchChange,
  onFilterChange,
}: SearchSectionProps) {
  return (
    <section className="max-w-[800px] mx-auto mb-20 px-6 md:px-8">
      {/* Search container with subtle background */}
      <div className="relative">
        {/* Decorative corner accents */}
        <div className="absolute -top-4 -left-4 w-8 h-8 border-l-2 border-t-2 border-gold/20 rounded-tl-lg" />
        <div className="absolute -top-4 -right-4 w-8 h-8 border-r-2 border-t-2 border-gold/20 rounded-tr-lg" />
        <div className="absolute -bottom-4 -left-4 w-8 h-8 border-l-2 border-b-2 border-gold/20 rounded-bl-lg" />
        <div className="absolute -bottom-4 -right-4 w-8 h-8 border-r-2 border-b-2 border-gold/20 rounded-br-lg" />

        <div className="py-8 px-4 md:px-8">
          <SearchInput value={searchQuery} onChange={onSearchChange} />
          <FilterPills currentFilter={currentFilter} onFilterChange={onFilterChange} />
        </div>
      </div>
    </section>
  )
}
