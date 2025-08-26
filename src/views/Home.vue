<template>
  <div class="container-fluid py-5">
    <div class="row justify-content-center">
      <div class="col-md-10">
        <CalendarControls/>
        <CalendarGrid/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CalendarGrid from '@/components/CalendarGrid.vue'
import CalendarControls from '@/components/CalendarControls.vue'
</script>

<style scoped></style>
