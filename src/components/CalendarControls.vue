<template>
  <div class="card rounded-0 border-0 shadow mb-4">
    <div class="card-body p-4">
      <h3 class="nl-primary fw-bold">{{ $t('gameSettings.title') }}</h3>
      <form class="row g-3" @submit.prevent="startGame">
        <div class="col-md-6 col-lg-3">
          <label class="form-label" for="gridWidth">{{ $t('gameSettings.width') }}</label>
          <input
            id="gridWidth"
            v-model.number="form.width"
            class="form-control"
            inputmode="numeric"
            min="1"
            type="number"
          />
        </div>
        <div class="col-md-6 col-lg-3">
          <label class="form-label" for="gridHeight">{{ $t('gameSettings.height') }}</label>
          <input
            id="gridHeight"
            v-model.number="form.height"
            class="form-control"
            inputmode="numeric"
            min="1"
            type="number"
          />
        </div>
        <div class="col-md-6 col-lg-3">
          <label class="form-label" for="prize100">{{
            $t('gameSettings.100prizes', { amount: currency(100) })
          }}</label>
          <input
            id="prize100"
            v-model.number="form.prize100Count"
            class="form-control"
            inputmode="numeric"
            min="1"
            type="number"
          />
        </div>
        <div class="col-md-6 col-lg-3">
          <label class="form-label" for="prize25000">{{
            $t('gameSettings.25000prizes', { amount: currency(25000) })
          }}</label>
          <input
            id="prize25000"
            v-model.number="form.prize25000Count"
            class="form-control"
            inputmode="numeric"
            min="1"
            type="number"
          />
        </div>
        <div class="col-md-6 col-lg-3">
          <div class="form-check form-switch">
            <input
              id="checkNativeSwitch"
              v-model="form.minigame"
              class="form-check-input"
              switch
              type="checkbox"
              value=""
            />
            <label class="form-check-label" for="checkNativeSwitch">{{
              $t('gameSettings.minigame')
            }}</label>
          </div>
        </div>

        <div v-if="errorMessage" class="col-12">
          <div class="alert alert-danger mb-0">{{ errorMessage }}</div>
        </div>

        <div class="col-12">
          <button class="btn-cta btn-submit" type="submit">
            <span class="btn-text">{{ $t('cta.startNew') }}</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useCalendarStore } from '@/stores/calendar.ts'
import { computed, reactive, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const calendarStore = useCalendarStore()

const form = reactive({
  width: calendarStore.width,
  height: calendarStore.height,
  prize100Count: calendarStore.prize100Count,
  prize25000Count: calendarStore.prize25000Count,
  minigame: calendarStore.minigame,
})

const { n, t } = useI18n()

const errorMessage = computed(() => {
  const totalBoxes = form.width * form.height
  const totalPrizes = form.prize100Count + form.prize25000Count

  if (form.width < 1 || form.height < 1) {
    return t('gameSettings.errors.gridSize')
  }

  if (totalPrizes > totalBoxes) {
    return t('gameSettings.errors.maxPrizes', { totalPrizes, totalBoxes })
  }

  if (form.prize100Count < 0 || form.prize25000Count < 0) {
    return t('gameSettings.errors.minPrizes')
  }

  return ''
})

/**
 * Initiates the game setup by validating input and calling the startGame function
 * from the calendarStore with specified parameters.
 *
 * @return {void} Does not return a value but starts the game if no error message exists.
 */
function startGame() {
  if (errorMessage.value) return
  calendarStore.startGame(
    form.width,
    form.height,
    form.prize100Count,
    form.prize25000Count,
    form.minigame,
  )
}

function currency(value: number) {
  return n(value, 'currency')
}

watch(
  () => ({
    width: calendarStore.width,
    height: calendarStore.height,
    prize100Count: calendarStore.prize100Count,
    prize25000Count: calendarStore.prize25000Count,
    minigame: calendarStore.minigame,
  }),
  (newValues) => {
    Object.assign(form, newValues)
  },
  { immediate: true },
)
</script>

<style scoped></style>
