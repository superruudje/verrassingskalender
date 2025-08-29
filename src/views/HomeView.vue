<template>
  <div class="container py-3 py-md-5" role="region" aria-labelledby="calendar-heading">
    <h2 id="calendar-heading" class="visually-hidden">Calendar Section</h2>
    <div class="row justify-content-center">
      <div class="col">
        <div v-if="!gameStarted">
          <CalendarControls />
        </div>
        <div v-else>
          <CalendarGrid />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import CalendarGrid from '@/components/CalendarGrid.vue'
import CalendarControls from '@/components/CalendarControls.vue'
import { useCalendarStore } from '@/stores/calendar.ts'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const calendarStore = useCalendarStore()
const { gameStarted } = storeToRefs(calendarStore)

onMounted(() => {
  calendarStore.loadFromLocalStorage()
})
</script>

<style scoped></style>
