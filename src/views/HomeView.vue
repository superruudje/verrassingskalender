<template>
  <div class="container-fluid py-3 py-md-5">
    <div class="row justify-content-center">
      <div class="col-md-10">
        <CalendarControls v-if="!gameStarted" />
        <CalendarGrid v-else />
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
