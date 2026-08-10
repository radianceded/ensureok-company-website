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

type Cluster = {
  id: number
  x: number
  y: number
  z: number
  sx: number
  sy: number
  sz: number
  type: 'foliage' | 'canopy' | 'root'
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
  const sectionCount = 24
  const sectionDepth = volumeDepth / sectionCount
  const clusters: Cluster[][] = []
  let clusterNumber = 0

  for (let section = 0; section < sectionCount; section += 1) {
    const z = 1 - section * sectionDepth
    const pathOffset = Math.sin(section * 0.61) * 0.9 + Math.sin(section * 0.19) * 0.45
    const sectionClusters: Cluster[] = []

    for (const side of [-1, 1]) {
      for (let c = 0; c < 3; c += 1) {
        sectionClusters.push({
          id: clusterNumber++,
          x: pathOffset + side * (7.1 + random() * 5.7),
          y: -0.8 + c * 3.4 + signed(random) * 1.2,
          z: z + signed(random) * 2.4,
          sx: 1.8 + random() * 2.5,
          sy: 1.4 + random() * 2.2,
          sz: 1.8 + random() * 2.8,
          type: 'foliage',
        })
      }
    }

    sectionClusters.push({
      id: clusterNumber++,
      x: pathOffset + signed(random) * 4.6,
      y: 8.6 + random() * 2.2,
      z: z + signed(random) * 2.3,
      sx: 4.2 + random() * 3.4,
      sy: 1.5 + random() * 1.8,
      sz: 2.2 + random() * 2.8,
      type: 'canopy',
    })

    for (const side of [-1, 1]) {
      sectionClusters.push({
        id: clusterNumber++,
        x: pathOffset + side * (5.2 + random() * 5.8),
        y: -7.7 + random() * 1.15,
        z: z + signed(random) * 2.4,
        sx: 3 + random() * 3.8,
        sy: 0.5 + random() * 0.65,
        sz: 2.1 + random() * 2.7,
        type: 'root',
      })
    }

    clusters.push(sectionClusters)
  }

  for (let i = 0; i < count; i += 1) {
    const index = i * 3
    const sectionIndex = Math.floor(random() * sectionCount)
    const sectionZ = 1 - sectionIndex * sectionDepth
    const pathOffset = Math.sin(sectionIndex * 0.61) * 0.9 + Math.sin(sectionIndex * 0.19) * 0.45
    const kind = random()
    const side = random() < 0.5 ? -1 : 1
    let x = 0
    let y = 0
    let z = sectionZ + signed(random) * sectionDepth * 0.54
    let size = 1.5
    let light = 0.42
    let alpha = 0.5
    let layer = 0.5
    let cluster = sectionClustersFor(clusters, sectionIndex, 0)

    if (kind < 0.2) {
      // Trunks lean along the corridor walls, giving the eye stable vertical landmarks.
      const t = random()
      const trunkSlot = Math.floor(random() * 3)
      const baseX = pathOffset + side * (7.8 + trunkSlot * 2.25 + random() * 0.7)
      x = baseX - side * t * (0.8 + random() * 1.7) + signed(random) * 0.17
      y = -7.9 + t * 18.8 + signed(random) * 0.18
      z += signed(random) * 0.22
      size = 1.9 + random() * 2.3
      light = 0.3 + random() * 0.42
      alpha = 0.62 + random() * 0.16
      layer = 0.72
      cluster = sectionClustersFor(clusters, sectionIndex, side < 0 ? 0 : 3)
    } else if (kind < 0.43) {
      // Long branch arcs project over the path and visibly sweep past the camera.
      const t = random()
      const baseX = pathOffset + side * (9.2 + random() * 3.6)
      const reach = 7.3 + random() * 5.2
      x = baseX - side * reach * t + Math.sin(t * Math.PI * 2) * 0.38 + signed(random) * 0.16
      y = 4.8 + random() * 4.1 + Math.sin(t * Math.PI) * (2.2 + random() * 2.8) + signed(random) * 0.18
      z += (t - 0.5) * (3.5 + random() * 3.2) + signed(random) * 0.22
      size = 1.65 + random() * 2.2
      light = 0.36 + random() * 0.5
      alpha = 0.56 + random() * 0.2
      layer = 0.82
      cluster = sectionClustersFor(clusters, sectionIndex, 6)
    } else {
      // Ellipsoidal clusters create coherent foliage, canopy, and root masses.
      const choices = clusters[sectionIndex]
      cluster = choices[Math.floor(random() * choices.length)]
      const theta = random() * Math.PI * 2
      const phi = Math.acos(signed(random))
      const radius = Math.pow(random(), 0.58)
      x = cluster.x + Math.sin(phi) * Math.cos(theta) * radius * cluster.sx
      y = cluster.y + Math.cos(phi) * radius * cluster.sy
      z = cluster.z + Math.sin(phi) * Math.sin(theta) * radius * cluster.sz

      if (cluster.type === 'root') {
        y += Math.sin(x * 0.45 + z * 0.27) * 0.28
        size = 1.8 + random() * 2.6
        light = 0.27 + random() * 0.46
        alpha = 0.5 + random() * 0.2
        layer = 0.88
      } else {
        size = 1.45 + random() * 2.35
        light = 0.32 + random() * 0.64
        alpha = 0.48 + random() * 0.24
        layer = cluster.type === 'canopy' ? 0.78 : 0.66
      }
    }

    // A sparse, irregular understory keeps the central route organic rather than empty.
    if (i % 23 === 0) {
      x = pathOffset + signed(random) * (2.1 + random() * 3.8)
      y = -7.4 + random() * 4.8
      z = 1 - random() * volumeDepth
      size = 1.35 + random() * 2
      light = 0.24 + random() * 0.36
      alpha = 0.38 + random() * 0.18
      layer = 0.38
    }

    positions[index] = x
    positions[index + 1] = y
    positions[index + 2] = z
    sizes[i] = size
    brightness[i] = THREE.MathUtils.clamp(light, 0, 1)
    depthLayers[i] = layer
    randoms[i] = random()
    clusterIds[i] = cluster.id
    clusterCenters[index] = cluster.x
    clusterCenters[index + 1] = cluster.y
    clusterCenters[index + 2] = cluster.z
    motionPhases[i] = random() * Math.PI * 2
    motionSpeeds[i] = 0.62 + random() * 0.78
    colorVariations[i] = random()
    alphas[i] = alpha
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

function sectionClustersFor(clusters: Cluster[][], section: number, index: number) {
  return clusters[section][Math.min(index, clusters[section].length - 1)]
}
