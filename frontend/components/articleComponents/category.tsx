'use client'

import axios from 'axios'
import { useEffect, useState } from 'react'

function CategorySlider({ onSelect }: Props) {
  const [categories, setCategories] = useState<Category[]>([])
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await axios.get('http://localhost:8000/category/')
      setCategories(data)
    }

    fetchCategories()
  }, [])

  return (
    <div className="flex gap-3 overflow-x-auto py-4">
      <button
        onClick={() => {
          setActive(null)
          onSelect(null)
        }}
        className={`px-4 py-2 rounded-full text-sm transition
          ${active === null ? 'bg-white text-black' : 'bg-white/10 text-white'}
        `}
      >
        همه
      </button>

      {categories.map(cat => (
        <button
          key={cat.id}
          onClick={() => {
            setActive(cat.slug)
            onSelect(cat.slug)
          }}
          className={`px-4 py-2 rounded-full text-sm transition
            ${active === cat.slug
              ? 'bg-white text-black'
              : 'bg-white/10 text-white hover:bg-white/20'}
          `}
        >
          {cat.title}
        </button>
      ))}
    </div>
  )
}

export default CategorySlider
