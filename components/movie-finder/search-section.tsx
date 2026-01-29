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
    <section className="max-w-[700px] mx-auto mb-20 px-8">
      <SearchInput value={searchQuery} onChange={onSearchChange} />
      <FilterPills currentFilter={currentFilter} onFilterChange={onFilterChange} />
    </section>
  )
}
