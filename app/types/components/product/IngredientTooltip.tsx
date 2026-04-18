// src/components/product/IngredientTooltip.tsx
'use client'

import * as Tooltip from '@radix-ui/react-tooltip'

interface IngredientTooltipProps {
  name: string
  description: string
}

const IngredientTooltip = ({ name, description }: IngredientTooltipProps) => {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <span className="border-b border-dotted border-gray-400 cursor-help hover:text-accent transition-colors">
            {name}
          </span>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="bg-gray-900 text-white text-sm px-3 py-2 rounded shadow-lg max-w-xs z-50"
            sideOffset={5}
          >
            {description}
            <Tooltip.Arrow className="fill-gray-900" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}

export default IngredientTooltip
