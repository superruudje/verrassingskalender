<template>
  <div class="card rounded-0 border-0 shadow mb-4">
    <div class="card-body p-4">
      <section class="nl-primary">
        <h3 class="fw-bold">Welkom bij de verrassingskalender!</h3>
        <p>
          Voor je zie je een kalender met
          <strong>{{ totalCells.toLocaleString() }} vakjes</strong>
          ({{ width }} × {{ height }}). In deze kalender
          {{ prize25000Count > 1 ? 'zijn' : 'is' }}
          <strong>{{ prize25000Count }}</strong>
          {{ prize25000Count > 1 ? 'hoofdprijzen' : 'hoofdprijs' }} van
          <strong>€25.000</strong> verstopt en <strong>{{ prize100Count }}</strong> troostprijzen
          van <strong>€100</strong>. Je mag <strong>één vakje</strong> openkrassen om te zien of er
          een prijs achter zit. Ook zie je welke vakjes al door andere spelers geopend zijn.
        </p>
        <p><em>Veel succes!</em> 🎉</p>
      </section>
      <div class="d-flex flex-wrap align-items-center gap-2 mb-3">
        <div class="d-flex align-items-center gap-1">
          <span class="prize-0" style="height: 12px; width: 12px"></span>
          <span>= €0,00</span>
        </div>
        <div class="d-flex align-items-center gap-1">
          <span class="prize-100" style="height: 12px; width: 12px"></span>
          <span>= €100,00</span>
        </div>
        <div class="d-flex align-items-center gap-1">
          <span class="prize-25000" style="height: 12px; width: 12px"></span>
          <span>= €25000,00</span>
        </div>

        <div class="ms-auto zoom-controls">
          <button class="btn btn-sm btn-secondary" type="button" @click="zoomOut">-</button>
          <span class="mx-2">{{ Math.round(zoom * 100) }}%</span>
          <button class="btn btn-sm btn-secondary" type="button" @click="zoomIn">+</button>
        </div>
      </div>
      <div class="grid-container">
        <div
          :style="{
            gridTemplateColumns: `repeat(${calendarStore.width}, minmax(0, 80px))`,
            minWidth: `${calendarStore.width * 20}px`,
            transform: `scale(${zoom})`,
            transformOrigin: 'top left',
          }"
          class="grid"
        >
          <div
            v-for="box in calendarStore.boxes"
            :key="box.id"
            :class="boxClass(box)"
            class="box"
            @click="reveal(box)"
          ></div>
        </div>
      </div>
    </div>
  </div>

  <button
    ref="modalButton"
    class="d-none"
    data-bs-target="#endGameModal"
    data-bs-toggle="modal"
    type="button"
  ></button>
  <button
    ref="scratchModalButton"
    class="d-none"
    data-bs-target="#scratchModal"
    data-bs-toggle="modal"
    type="button"
  ></button>

  <teleport to="body">
    <ScratchModal :box="selectedBox" />
    <EndGameModal />
  </teleport>
</template>

<script lang="ts" setup>
import { useCalendarStore } from '@/stores/calendar.ts'
import { computed, type ComputedRef, onMounted, ref, watch } from 'vue'
import type { Box } from '@/types/Calendar.ts'
import { storeToRefs } from 'pinia'
import EndGameModal from '@/components/EndGameModal.vue'
import ScratchModal from '@/components/ScratchModal.vue'

const calendarStore = useCalendarStore()
const { width, height, prize100Count, prize25000Count } = storeToRefs(calendarStore)

const zoom = ref<number>(1)
const selectedBox = ref<Box | null>(null)
const scratchModalButton = ref<HTMLButtonElement | null>(null)
const modalButton = ref<HTMLButtonElement | null>(null)

const totalCells = computed(() => calendarStore.width * calendarStore.height)

const allOpened: ComputedRef<boolean> = computed(() =>
  calendarStore.boxes.every((box) => box.opened),
)

function reveal(box: Box) {
  if (box.opened) return
  selectedBox.value = box
  scratchModalButton.value?.click()

  // calendarStore.openBox(box.id)
  // if (box.prize) popConfetti()
}

function boxClass(box: { prize: number; opened: boolean }): string {
  if (!box.opened) return 'hidden'
  if (box.prize === 25000) return 'prize-25000'
  if (box.prize === 100) return 'prize-100'
  return 'prize-0'
}

function zoomIn() {
  if (zoom.value < 3) zoom.value += 0.1 // max 300%
}

function zoomOut() {
  if (zoom.value > 0.3) zoom.value -= 0.1 // min 30%
}

watch(allOpened, (val) => {
  if (val) modalButton.value?.click()
})

onMounted(() => {
  calendarStore.loadFromLocalStorage()
})
</script>

<style lang="scss" scoped>
.grid-container {
  width: 100%;
  height: 80vh;
  overflow: auto;
  border: 1px solid #ccc;

  .grid {
    display: grid;
    justify-content: start;
    cursor: pointer;
    min-width: 100%;
    transition: transform 0.2s ease;
  }
}

.box {
  width: 100%;
  aspect-ratio: 1 / 1;
  border: 1px solid #ddd;
  background: #f5f5f5;
  transition: background 0.2s ease;
  max-width: 80px;
  max-height: 80px;

  &:hover {
    background: #b3d4fc;
  }

  &.hidden {
    background: #f5f5f5;
  }
}

.prize-0 {
  background: #ccc;
}

.prize-100 {
  background: #002d6e;
}

.prize-25000 {
  background: #ff5a00;
}

.zoom-controls {
  display: flex;
  align-items: center;
  column-gap: 8px;

  background-color: #5442001a;
  padding: 4px;
  border-radius: 20px;
  width: fit-content;

  button {
    align-items: center;
    background: #fff;
    border: none;
    border-radius: 50%;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);
    color: #002d6e;
    cursor: pointer;
    display: flex;
    font-size: 1rem;
    font-weight: normal;
    height: 32px;
    justify-content: center;
    line-height: 1;
    transition: transform 0.2s;
    width: 32px;
  }
}
</style>
