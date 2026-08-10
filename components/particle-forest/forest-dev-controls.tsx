'use client'

import type { ForestTuning } from './particle-forest'

type ForestDevControlsProps = {
  values: ForestTuning
  onChange: (next: ForestTuning) => void
}

const fields: Array<{ key: keyof ForestTuning; label: string; min: number; max: number; step: number }> = [
  { key: 'pointScale', label: 'Particle size', min: 0.6, max: 2.2, step: 0.05 },
  { key: 'opacity', label: 'Opacity', min: 0.25, max: 1.2, step: 0.05 },
  { key: 'cameraSpeed', label: 'Camera speed', min: 0, max: 3, step: 0.1 },
  { key: 'density', label: 'Forest density', min: 0.2, max: 1, step: 0.05 },
  { key: 'interactionRadius', label: 'Field radius', min: 0.18, max: 0.75, step: 0.01 },
  { key: 'repulsion', label: 'Repulsion', min: 0.3, max: 2, step: 0.05 },
  { key: 'swirl', label: 'Swirl', min: 0.2, max: 1.8, step: 0.05 },
  { key: 'depth', label: 'Depth force', min: 0, max: 1.4, step: 0.05 },
  { key: 'velocity', label: 'Velocity wake', min: 0, max: 3, step: 0.1 },
  { key: 'fog', label: 'Fog density', min: 0, max: 0.55, step: 0.01 },
]

export function ForestDevControls({ values, onChange }: ForestDevControlsProps) {
  return (
    <aside className="fixed bottom-16 left-4 z-50 w-64 rounded-sm border border-foreground/20 bg-background/90 p-4 font-mono text-[0.65rem] text-foreground shadow-2xl backdrop-blur-md">
      <div className="mb-3 flex items-center justify-between uppercase tracking-widest">
        <span>Forest controls</span>
        <span className="text-foreground/50">D to close</span>
      </div>
      <div className="flex flex-col gap-2.5">
        {fields.map((field) => (
          <label key={field.key} className="flex flex-col gap-1">
            <span className="flex justify-between text-foreground/70">
              {field.label}
              <output>{values[field.key].toFixed(2)}</output>
            </span>
            <input
              className="accent-foreground"
              type="range"
              min={field.min}
              max={field.max}
              step={field.step}
              value={values[field.key]}
              onChange={(event) => onChange({ ...values, [field.key]: Number(event.target.value) })}
            />
          </label>
        ))}
      </div>
    </aside>
  )
}
