<template>
  <Navbar/>
  <div style="background-color: #f8f7f0">
    <router-view/>
  </div>
  <Footer/>
</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
</script>

<style scoped></style>
