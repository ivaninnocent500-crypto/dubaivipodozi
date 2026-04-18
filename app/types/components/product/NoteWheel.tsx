// src/components/product/NoteWheel.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface NoteWheelProps {
  topNotes: string[]
  heartNotes: string[]
  baseNotes: string[]
}

const NoteWheel = ({ topNotes, heartNotes, baseNotes }: NoteWheelProps) => {
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null)
  
  return (
    <div className="relative w-64 h-64 mx-auto">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        {/* Top Notes Segment (0-120 degrees) */}
        <motion.path
          d="M100,100 L100,20 A80,80 0 0,1 169.28,60 Z"
          fill={hoveredSegment === 'top' ? '#7A3E52' : '#5A2A3C'}
          className="cursor-pointer transition-colors duration-200"
          onMouseEnter={() => setHoveredSegment('top')}
          onMouseLeave={() => setHoveredSegment(null)}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        />
        
        {/* Heart Notes Segment (120-240 degrees) */}
        <motion.path
          d="M100,100 L169.28,60 A80,80 0 0,1 100,180 Z"
          fill={hoveredSegment === 'heart' ? '#8B5A6B' : '#6A3A4C'}
          className="cursor-pointer transition-colors duration-200"
          onMouseEnter={() => setHoveredSegment('heart')}
          onMouseLeave={() => setHoveredSegment(null)}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        />
        
        {/* Base Notes Segment (240-360 degrees) */}
        <motion.path
          d="M100,100 L100,180 A80,80 0 0,1 30.72,60 Z"
          fill={hoveredSegment === 'base' ? '#9B6A7B' : '#7A4A5C'}
          className="cursor-pointer transition-colors duration-200"
          onMouseEnter={() => setHoveredSegment('base')}
          onMouseLeave={() => setHoveredSegment(null)}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        />
        
        {/* Center Circle */}
        <circle cx="100" cy="100" r="40" fill="#F9F6F0" stroke="#5A2A3C" strokeWidth="2" />
        <text x="100" y="105" textAnchor="middle" className="text-xs fill-accent font-medium">
          NOTES
        </text>
      </svg>
      
      {/* Notes Display */}
      <div className="mt-6 text-center space-y-2">
        {hoveredSegment === 'top' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm"
          >
            <strong>Top Notes:</strong> {topNotes.join(', ')}
          </motion.div>
        )}
        {hoveredSegment === 'heart' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm"
          >
            <strong>Heart Notes:</strong> {heartNotes.join(', ')}
          </motion.div>
        )}
        {hoveredSegment === 'base' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm"
          >
            <strong>Base Notes:</strong> {baseNotes.join(', ')}
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default NoteWheel
