<template>
  <div
    id="endGameModal"
    aria-hidden="true"
    aria-labelledby="staticBackdropLabel"
    class="modal fade"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 id="staticBackdropLabel" class="modal-title fs-5">{{ $t('game.endGame.title') }}</h1>
          <button
            aria-label="Close"
            class="btn-close"
            data-bs-dismiss="modal"
            type="button"
          ></button>
        </div>
        <div class="modal-body">
          <p>{{ $t('game.endGame.text') }}</p>
        </div>
        <div class="modal-footer">
          <button class="btn-cta" data-bs-dismiss="modal" type="button" @click="resetGame">
            <span class="btn-text">{{ $t('cta.startNew') }}</span>
          </button>
          <button class="btn-primary ms-auto" data-bs-dismiss="modal" type="button">
            <span class="btn-text">{{ $t('cta.close') }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useCalendarStore } from '@/stores/calendar.ts'

const calendarStore = useCalendarStore()

function resetGame() {
  calendarStore.initializeGrid()
}
</script>

<style scoped></style>
