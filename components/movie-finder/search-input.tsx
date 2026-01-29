'use client'

import React from "react"

import { useEffect, useRef, useState } from 'react'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
}

export function SearchInput({ value, onChange }: SearchInputProps) {
  const [localValue, setLocalValue] = useState(value)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

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

  return (
    <div className="relative mb-8">
      <input
        type="text"
        value={localValue}
        onChange={handleChange}
        placeholder="Explorar películas..."
        className="w-full py-5 px-6 font-sans text-base border-0 border-b border-foreground/10 bg-transparent transition-all duration-400 tracking-wide focus:outline-none focus:border-b-gold focus:bg-muted focus:pl-8 placeholder:text-foreground/30 placeholder:font-light"
      />
    </div>
  )
}
