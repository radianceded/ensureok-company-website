import * as THREE from 'three'

export type ForestAttributes = {
  positions: Float32Array
  sizes: Float32Array
  brightness: Float32Array
  depthLayers: Float32Array
  randoms: Float32Array
  clusterIds: Float32Array
  clusterCenters: Float32Array
  motionPhases: Float32Array
  motionSpeeds: Float32Array
  colorVariations: Float32Array
  alphas: Float32Array
}

function mulberry32(seed: number) {
  return () => {
    let value = (seed += 0x6d2b79f5)
    value = Math.imul(value ^ (value >>> 15), value | 1)
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61)
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296
  }
}

function signed(random: () => number) {
  return random() * 2 - 1
}

/**
 * A calm, structureless particle volume. The former forest generator built
 * trunks, canopy bands, and a central corridor; in perspective those masses
 * read as a bright doorway behind the hero. This field deliberately avoids
 * recognizable geometry and gently quiets the center for content legibility.
 */
export function createProceduralForest(count: number): ForestAttributes {
  const random = mulberry32(90421)
  const positions = new Float32Array(count * 3)
  const sizes = new Float32Array(count)
  const brightness = new Float32Array(count)
  const depthLayers = new Float32Array(count)
  const randoms = new Float32Array(count)
  const clusterIds = new Float32Array(count)
  const clusterCenters = new Float32Array(count * 3)
  const motionPhases = new Float32Array(count)
  const motionSpeeds = new Float32Array(count)
  const colorVariations = new Float32Array(count)
  const alphas = new Float32Array(count)

  const volumeDepth = 120
  const halfWidth = 18
  const halfHeight = 11
  const cellWidth = 4.5
  const cellHeight = 3.7
  const cellDepth = 6
  const xCells = Math.ceil((halfWidth * 2) / cellWidth)
  const yCells = Math.ceil((halfHeight * 2) / cellHeight)

  for (let i = 0; i < count; i += 1) {
    const index = i * 3

    // Stratifying depth prevents accidental bright bands while retaining a
    // natural random distribution across the visible x/y plane.
    const depth = ((i + random()) / count) * volumeDepth
    const x = signed(random) * halfWidth
    const y = signed(random) * halfHeight
    const z = 3 - depth

    // A soft radial falloff keeps the central copy and product visualization
    // readable without creating a visible cut-out or another portal shape.
    const radialDistance = Math.sqrt((x / halfWidth) ** 2 + (y / halfHeight) ** 2)
    const centerQuiet = THREE.MathUtils.smoothstep(radialDistance, 0.08, 0.72)
    const contentVisibility = 0.46 + centerQuiet * 0.54

    const cellX = Math.floor((x + halfWidth) / cellWidth)
    const cellY = Math.floor((y + halfHeight) / cellHeight)
    const cellZ = Math.floor(depth / cellDepth)
    const clusterId = cellZ * xCells * yCells + cellY * xCells + cellX
    const centerX = -halfWidth + (cellX + 0.5) * cellWidth
    const centerY = -halfHeight + (cellY + 0.5) * cellHeight
    const centerZ = 3 - (cellZ + 0.5) * cellDepth

    positions[index] = x
    positions[index + 1] = y
    positions[index + 2] = z
    sizes[i] = 1.05 + random() * 1.45
    brightness[i] = (0.24 + random() * 0.52) * contentVisibility
    depthLayers[i] = 0.28 + random() * 0.5
    randoms[i] = random()
    clusterIds[i] = clusterId
    clusterCenters[index] = centerX
    clusterCenters[index + 1] = centerY
    clusterCenters[index + 2] = centerZ
    motionPhases[i] = random() * Math.PI * 2
    motionSpeeds[i] = 0.38 + random() * 0.62
    colorVariations[i] = random()
    alphas[i] = (0.25 + random() * 0.3) * contentVisibility
  }

  return {
    positions,
    sizes,
    brightness,
    depthLayers,
    randoms,
    clusterIds,
    clusterCenters,
    motionPhases,
    motionSpeeds,
    colorVariations,
    alphas,
  }
}
