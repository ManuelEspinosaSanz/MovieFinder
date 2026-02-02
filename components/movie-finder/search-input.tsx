'use client'

import React from "react"
import { useEffect, useRef, useState } from 'react'
import { Search, X } from 'lucide-react'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
}

export function SearchInput({ value, onChange }: SearchInputProps) {
  const [localValue, setLocalValue] = useState(value)
  const [isFocused, setIsFocused] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setLocalValue(value)
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setLocalValue(newValue)

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      onChange(newValue)
    }, 500)
  }

  const handleClear = () => {
    setLocalValue('')
    onChange('')
    inputRef.current?.focus()
  }

  return (
    <div className="relative group">
      {/* Decorative background glow on focus */}
      <div
        className={`absolute inset-0 -z-10 rounded-2xl bg-gold/5 blur-xl transition-opacity duration-500 ${isFocused ? 'opacity-100' : 'opacity-0'
          }`}
      />

      <div className={`relative flex items-center gap-4 px-6 py-4 rounded-2xl border transition-all duration-300 ${isFocused
          ? 'border-gold/50 bg-background shadow-lg shadow-gold/5'
          : 'border-border bg-secondary/30 hover:border-foreground/20'
        }`}>
        <Search className={`w-5 h-5 flex-shrink-0 transition-colors duration-300 ${isFocused ? 'text-gold' : 'text-muted-foreground'
          }`} />

        <input
          ref={inputRef}
          type="text"
          value={localValue}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Buscar por titulo, actor, director..."
          className="flex-1 bg-transparent text-base tracking-wide focus:outline-none placeholder:text-muted-foreground/50 placeholder:font-light"
        />

        {localValue && (
          <button
            onClick={handleClear}
            className="flex-shrink-0 p-1.5 rounded-full hover:bg-foreground/10 transition-colors duration-200"
            aria-label="Limpiar busqueda"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        )}
      </div>

      {/* Hint text */}
      <p className={`mt-3 text-center text-xs tracking-wider text-muted-foreground/60 transition-opacity duration-300 ${isFocused && !localValue ? 'opacity-100' : 'opacity-0'
        }`}>
        Escribe para descubrir tu proxima pelicula favorita
      </p>
    </div>
  )
}
