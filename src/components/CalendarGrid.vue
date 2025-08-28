<template>
  <div class="card rounded-0 border-0 shadow">
    <div class="card-body p-4">
      <section class="nl-primary mb-4">
        <h3 class="fw-bold">{{ $t('game.title') }}</h3>
        <i18n-t keypath="game.intro" tag="p">
          <template #total>
            <b>{{ $t('game.totalBoxes', totalBoxes) }}</b>
          </template>
          <template #width>{{ width }}</template>
          <template #height>{{ height }}</template>
          <template #prize25000Count>{{ prize25000Count }}</template>
          <template #amount25000
            ><b>{{ $n(25000, 'currency') }}</b></template
          >
          <template #prize100Count>{{ prize100Count }}</template>
          <template #amount100
            ><b>{{ $n(100, 'currency') }}</b></template
          >
        </i18n-t>

        <p>
          <em>{{ $t('game.encouragement') }}</em> 🎉
        </p>

        <div class="d-flex flex-wrap gap-2">
          <button
            :title="$t('cta.changeSettings')"
            class="btn-primary"
            type="button"
            @click="calendarStore.resetGame()"
          >
            <span class="btn-text">{{ $t('cta.changeSettings') }}</span>
          </button>
          <button
            :title="$t('cta.startNew')"
            class="btn-cta"
            type="button"
            @click="calendarStore.initializeGrid"
          >
            <span class="btn-text">{{ $t('cta.startNew') }}</span>
          </button>
        </div>
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
    <ScratchModal :box="calendarStore.selectedBox" />
    <EndGameModal />
  </teleport>
</template>

<script lang="ts" setup>
import { useCalendarStore } from '@/stores/calendar.ts'
import { computed, type ComputedRef, ref, watch } from 'vue'
import type { Box } from '@/types/Calendar.ts'
import { storeToRefs } from 'pinia'
import EndGameModal from '@/components/EndGameModal.vue'
import ScratchModal from '@/components/ScratchModal.vue'

const calendarStore = useCalendarStore()
const { width, height, prize100Count, prize25000Count, minigame } = storeToRefs(calendarStore)

const zoom = ref<number>(1)
const scratchModalButton = ref<HTMLButtonElement | null>(null)
const modalButton = ref<HTMLButtonElement | null>(null)

const totalBoxes = computed(() => calendarStore.width * calendarStore.height)

const allOpened: ComputedRef<boolean> = computed(() =>
  calendarStore.boxes.every((box) => box.opened),
)

/**
 * Reveals the contents of the given box. If the box is already opened, no further action is taken.
 * If a minigame is active, it selects the box and triggers the scratch modal.
 * Otherwise, it opens the box using the calendar store.
 *
 * @param {Box} box - The box object to be revealed.
 * @return {void} This method does not return a value.
 */
function reveal(box: Box) {
  if (box.opened) return

  if (minigame.value) {
    calendarStore.selectedBox = box
    scratchModalButton.value?.click()
  } else {
    calendarStore.openBox(box.id)
  }
}

/**
 * Determines the CSS class for a box based on its state and prize amount.
 *
 * @param {Box} box - The box object, containing its state and prize information.
 * @return {string} The CSS class representing the state or prize value of the box.
 */
function boxClass(box: Box): string {
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
</script>

<style lang="scss" scoped>
.grid-container {
  width: 100%;
  height: max-content;
  max-height: 80vh;
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
