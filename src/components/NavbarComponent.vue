<template>
  <nav
    class="navbar sticky-top navbar-expand-md"
    style="background-color: #f60"
    data-bs-theme="dark"
  >
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <img
          src="@/assets/logo-staatsloterij.svg"
          alt="Staatsloterij logo"
          width="60"
          class="d-inline-block align-text-top"
        />
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link :to="{ name: 'home' }" class="nav-link" active-class="active">{{
              $t('menu.home')
            }}</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'about' }" class="nav-link" active-class="active">{{
              $t('menu.about')
            }}</router-link>
          </li>
        </ul>
        <LanguageSwitcher data-bs-theme="light" />
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
</script>

<style scoped></style>
