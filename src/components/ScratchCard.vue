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
import logo from '@/assets/fingers-crossed.webp'

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

const width = props.width ?? 250
const height = props.height ?? 175
const brushSize = props.brushSize ?? 24
const coverColor = props.coverColor ?? '#f60'

/**
 * Initializes and renders a cover background along with a centered logo image on the canvas.
 * The canvas is filled with a specified background color, and the logo is scaled appropriately
 * to fit within the canvas dimensions while maintaining its aspect ratio.
 *
 * @return {void} This function performs rendering operations on a canvas and does not return a value.
 */
function initCover() {
  if (!ctx.value) return
  ctx.value.globalCompositeOperation = 'source-over'
  ctx.value.fillStyle = coverColor
  ctx.value.fillRect(0, 0, width, height)

  const img = new Image()
  img.src = logo
  img.onload = () => {
    const maxSize = Math.min(width, height) / 0.6
    const scale = Math.min(maxSize / img.width, maxSize / img.height)

    const logoWidth = img.width * scale
    const logoHeight = img.height * scale

    const x = (width - logoWidth) / 2
    const y = (height - logoHeight) / 2

    ctx.value?.drawImage(img, x, y, logoWidth, logoHeight)
  }
}

/**
 * Handles the scratching logic on a given surface by updating the canvas with a specific brushing effect
 * and calculating the scratched percentage.
 *
 * @param {number} x - The x-coordinate of the point where the scratch action is performed.
 * @param {number} y - The y-coordinate of the point where the scratch action is performed.
 * @return {void} This function does not return a value.
 */
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

/**
 * Calculates the coordinates of a pointer event relative to a canvas element.
 *
 * @param {PointerEvent} e - The pointer event object containing the clientX and clientY properties.
 * @return {Object} An object containing the x and y coordinates relative to the canvas. If the canvas is not available, returns { x: 0, y: 0 }.
 */
function getCoords(e: PointerEvent) {
  const rect = canvas.value?.getBoundingClientRect()
  if (!rect) return { x: 0, y: 0 }
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
  }
}

/**
 * Handles the pointer down event to initiate scratching.
 *
 * @param {PointerEvent} e - The pointer event that triggers the action.
 * @return {void} This function does not return a value.
 */
function onPointerDown(e: PointerEvent) {
  isScratching.value = true
  const { x, y } = getCoords(e)
  scratch(x, y)
}

/**
 * Handles the pointer move event. This function processes pointer movements by
 * checking if scratching is active and calculating the coordinates to perform
 * the scratching action.
 *
 * @param {PointerEvent} e - The pointer event triggered during pointer movement.
 * @return {void} This function does not return a value.
 */
function onPointerMove(e: PointerEvent) {
  if (!isScratching.value) return
  const { x, y } = getCoords(e)
  scratch(x, y)
}

/**
 * Stops the scratching action by updating the isScratching state.
 *
 * @return {void} Does not return a value.
 */
function stopScratching() {
  isScratching.value = false
}

/**
 * Calculates the percentage of transparent pixels in a canvas.
 * The method examines the alpha channel of the canvas image data to determine the proportion of transparent pixels,
 * represented as a percentage of the total number of pixels.
 *
 * @return {number} The percentage of transparent pixels on the canvas. Returns 0 if the canvas or context is not defined.
 */
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
  margin-bottom: 32px;
  overflow: hidden;
  position: relative;

  .scratch-card {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    font-size: 48px;
    font-weight: bold;
    letter-spacing: 2px;
    user-select: none;
  }

  .scratch-canvas {
    position: absolute;
    inset: 0;
    touch-action: none;
    cursor: grab;
  }
}
</style>
