<template>
  <footer class="bg-white nl-primary">
    <div class="container pt-5">
      <div class="row align-items-center justify-content-between gy-3 mb-4">
        <div class="col-8 col-md-5 offset-2 offset-md-0">
          <a href="https://www.nederlandseloterij.nl/" target="_blank">
            <img
              src="@/assets/logo-spel-van-nederlandse-loterij.svg"
              alt="Een spel van Nederlandse loterij logo"
              loading="lazy"
            />
          </a>
        </div>
        <div class="col-12 col-md-7 text-center text-md-end">
          <i18n-t tag="span" keypath="footer.warning" for="footer.age">
            <strong>{{ $t('footer.age') }}</strong>
          </i18n-t>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <p v-html="$t('footer.disclaimer')"></p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
footer {
  box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.1) !important;
}
</style>
