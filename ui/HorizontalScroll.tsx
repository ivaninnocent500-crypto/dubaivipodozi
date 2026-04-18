// components/ui/HorizontalScroll.tsx
'use client'

import { ReactNode, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { clsx } from 'clsx'

interface HorizontalScrollProps {
  title: string
  viewAllHref?: string
  children: ReactNode
  className?: string
}

export default function HorizontalScroll({ title, viewAllHref, children, className }: HorizontalScrollProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section className={clsx("py-16 md:py-20", className)}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-heading text-gray-900 uppercase tracking-wider">
              {title}
            </h2>
            {viewAllHref && (
              <a href={viewAllHref} className="text-xs text-gray-500 hover:text-accent transition-colors mt-1 inline-block">
                View All →
              </a>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => scroll('left')}
              className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory gap-6 pb-4"
          style={{ scrollbarWidth: 'thin' }}
        >
          {children}
        </div>
      </div>
    </section>
  )
}
