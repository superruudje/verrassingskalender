<template>
  <div class="card rounded-0 border-0 shadow mb-4">
    <div class="card-body p-4">
      <h3 class="nl-primary fw-bold">Spel instellingen</h3>
      <form class="row g-3" @submit.prevent="resetGrid">
        <div class="col-md-3">
          <label class="form-label" for="gridWidth">Breedte</label>
          <input
            id="gridWidth"
            v-model.number="form.width"
            class="form-control"
            min="1"
            type="number"
          />
        </div>
        <div class="col-md-3">
          <label class="form-label" for="gridHeight">Hoogte</label>
          <input
            id="gridHeight"
            v-model.number="form.height"
            class="form-control"
            min="1"
            type="number"
          />
        </div>
        <div class="col-md-3">
          <label class="form-label" for="prize100">€100 prijzen</label>
          <input
            id="prize100"
            v-model.number="form.prize100Count"
            class="form-control"
            min="0"
            type="number"
          />
        </div>
        <div class="col-md-3">
          <label class="form-label" for="prize25000">€25,000 prijzen</label>
          <input
            id="prize25000"
            v-model.number="form.prize25000Count"
            class="form-control"
            min="0"
            type="number"
          />
        </div>

        <div v-if="errorMessage" class="col-12">
          <div class="alert alert-danger mb-0">{{ errorMessage }}</div>
        </div>

        <div class="col-12">
          <button class="btn-cta btn-submit" type="submit">
            <span class="btn-text">Start</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useCalendarStore } from '@/stores/calendar.ts'
import { computed, reactive, watch } from 'vue'

const calendarStore = useCalendarStore()

const form = reactive({
  width: calendarStore.width,
  height: calendarStore.height,
  prize100Count: calendarStore.prize100Count,
  prize25000Count: calendarStore.prize25000Count,
})

const errorMessage = computed(() => {
  const totalBoxes = form.width * form.height
  const totalPrizes = form.prize100Count + form.prize25000Count

  if (totalPrizes > totalBoxes) {
    return `Totale prijzen (${totalPrizes}) kan niet hoger zijn dan totaal aantal vakjes (${totalBoxes}).`
  }

  if (form.width < 1 || form.height < 1) {
    return 'Breedte en hoogte moeten groter zijn dan 0.'
  }

  if (form.prize100Count < 0 || form.prize25000Count < 0) {
    return 'Aantal prijzen mag niet negatief zijn.'
  }

  return ''
})

/**
 * Resets the grid on the calendar store with the provided dimensions and prize counts.
 * Prevents resetting if there is an active error message.
 *
 * @return {void} Does not return a value.
 */
function resetGrid() {
  if (errorMessage.value) return

  calendarStore.resetGrid(form.width, form.height, form.prize100Count, form.prize25000Count)
}

watch(
  () => [
    calendarStore.width,
    calendarStore.height,
    calendarStore.prize100Count,
    calendarStore.prize25000Count,
  ],
  ([w, h, p100, p25]) => {
    form.width = w
    form.height = h
    form.prize100Count = p100
    form.prize25000Count = p25
  },
  { immediate: true },
)
</script>

<style scoped></style>
