<template>
  <div
    id="scratchModal"
    aria-hidden="true"
    aria-labelledby="staticBackdropLabel"
    class="modal fade"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content nl-primary">
        <div class="modal-header">
          <h3 id="staticBackdropLabel" class="modal-title fs-5 fw-bold">Kras het vakje open</h3>
        </div>
        <div class="modal-body text-center nl-primary">
          <p>
            Kras het vakje open om te zien of er een prijs achter zit. Wanneer je start met krassen
            kun je niet meer annuleren.
          </p>
          <div class="d-flex justify-content-center">
            <ScratchCard
              :key="box?.id"
              :prize="box?.prize ?? 0"
              @revealed="openBox"
              @started="started = true"
            />
          </div>
          <span v-if="box?.opened && !box.prize"><b>Helaas!</b> Volgende keer beter.</span>
          <span v-else-if="box?.opened && box.prize"
            ><b>Gefeliciteerd!</b> Je wint €{{ box.prize.toLocaleString() }}.</span
          >
          <span v-else>Kras minimaal 75% van de kraskaart.</span>
        </div>
        <div class="modal-footer">
          <button
            v-if="box?.opened"
            class="btn-primary ms-auto"
            data-bs-dismiss="modal"
            type="button"
          >
            <span class="btn-text">Sluiten</span>
          </button>
          <button
            v-if="!box?.opened"
            :disabled="started"
            class="btn-primary ms-auto"
            data-bs-dismiss="modal"
            type="button"
          >
            <span class="btn-text">Annuleer</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Box } from '@/types/Calendar.ts'
import { useCalendarStore } from '@/stores/calendar.ts'
import { popConfetti } from '@/helpers/confetti.ts'
import ScratchCard from '@/components/ScratchCard.vue'
import { ref, watch } from 'vue'

const calendarStore = useCalendarStore()

const props = defineProps<{
  box: Box | null
}>()

const started = ref<boolean>(false)

function openBox() {
  if (!props.box) return
  calendarStore.openBox(props.box.id)
  if (props.box.prize) popConfetti()
}

watch(
  () => props.box,
  () => {
    started.value = false
  },
)
</script>

<style scoped></style>
