<template>
  <NavbarComponent />
  <div class="content">
    <router-view />
  </div>
  <FooterComponent />
</template>

<script setup lang="ts">
import NavbarComponent from '@/components/NavbarComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
</script>

<style lang="scss" scoped>
.content {
  background-color: #f8f7f0;
  min-height: 80vh;
}
</style>
