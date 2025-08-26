<template>
  <div :style="{ width: width + 'px', height: height + 'px' }" class="scratch-container">
    <div class="scratch-card">
      <div class="code">€{{ prize.toLocaleString() }}</div>
    </div>
    <canvas
      ref="canvas"
      :height="height"
      :width="width"
      class="scratch-canvas"
      @pointerdown="onPointerDown"
      @pointerleave="stopScratching"
      @pointermove="onPointerMove"
      @pointerup="stopScratching"
    ></canvas>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'

const emit = defineEmits(['revealed', 'started'])
const props = defineProps<{
  prize: number
  width?: number
  height?: number
  brushSize?: number
  coverColor?: string
}>()

const canvas = ref<HTMLCanvasElement | null>(null)
const ctx = ref<CanvasRenderingContext2D | null>(null)
const isScratching = ref<boolean>(false)
const scratchedPercentage = ref<number>(0)
const started = ref<boolean>(false)

const width = props.width ?? 150
const height = props.height ?? 100
const brushSize = props.brushSize ?? 12
const coverColor = props.coverColor ?? '#f60'

function initCover() {
  if (!ctx.value) return
  ctx.value.globalCompositeOperation = 'source-over'
  ctx.value.fillStyle = coverColor
  ctx.value.fillRect(0, 0, width, height)
}

function scratch(x: number, y: number) {
  if (!ctx.value) return
  if (!started.value) {
    started.value = true
    emit('started')
  }

  ctx.value.globalCompositeOperation = 'destination-out'
  ctx.value.beginPath()
  ctx.value.arc(x, y, brushSize, 0, 2 * Math.PI)
  ctx.value.fill()

  scratchedPercentage.value = calculateScratchedPercentage()
}

function getCoords(e: PointerEvent) {
  const rect = canvas.value?.getBoundingClientRect()
  if (!rect) return { x: 0, y: 0 }
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
  }
}

function onPointerDown(e: PointerEvent) {
  isScratching.value = true
  const { x, y } = getCoords(e)
  scratch(x, y)
}

function onPointerMove(e: PointerEvent) {
  if (!isScratching.value) return
  const { x, y } = getCoords(e)
  scratch(x, y)
}

function stopScratching() {
  isScratching.value = false
}

function calculateScratchedPercentage(): number {
  if (!ctx.value || !canvas.value) return 0

  const imageData = ctx.value.getImageData(0, 0, canvas.value.width, canvas.value.height)
  const pixels = imageData.data
  let transparentCount = 0

  // Every pixel has 4 values: R,G,B,A
  for (let i = 3; i < pixels.length; i += 4) {
    if (pixels[i] === 0) transparentCount++
  }

  return Math.round((transparentCount / (canvas.value.width * canvas.value.height)) * 100)
}

watch(scratchedPercentage, (value) => {
  if (value >= 75) {
    emit('revealed')
  }
})

onMounted(() => {
  if (canvas.value) {
    ctx.value = canvas.value.getContext('2d', { willReadFrequently: true })
    initCover()
  }
})
</script>

<style lang="scss" scoped>
.scratch-container {
  border-radius: 10px;
  margin-bottom: 32px;
  overflow: hidden;
  position: relative;

  .scratch-card {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    font-size: 32px;
    font-weight: bold;
    letter-spacing: 2px;
    user-select: none;
  }

  .scratch-canvas {
    position: absolute;
    inset: 0;
    cursor: grab;
    touch-action: none;
  }
}
</style>
