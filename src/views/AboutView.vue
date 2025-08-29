<template>
  <div class="container py-3 py-md-5">
    <div class="row">
      <div class="col-md-8">
        <section class="card nl-primary rounded-0 border-0 shadow mb-4">
          <div class="card-body p-4">
            <h3 class="nl-primary fw-bold">{{ $t('about.case.title') }}</h3>
            <p>{{ $t('about.case.p1') }}</p>
            <p>{{ $t('about.case.p2') }}</p>
            <ul>
              <li v-for="n in 4" :key="n">
                {{ $t(`about.case.li${n}`) }}
              </li>
            </ul>
            <p>{{ $t('about.case.p3') }}</p>
          </div>
        </section>
        <section class="card nl-primary rounded-0 border-0 shadow mb-4">
          <div class="card-body p-4">
            <h3 class="nl-primary fw-bold">{{ $t('about.stack.title') }}</h3>
            <i18n-t keypath="about.stack.p1" tag="p">
              <template #stack>
                <strong>frontend tech stack</strong>
              </template>
            </i18n-t>
            <h4 class="mt-4">{{ $t('about.stack.tech.title') }}</h4>
            <ul>
              <li>
                <i18n-t keypath="about.stack.tech.vue" tag="span">
                  <template #vue><strong>Vue 3</strong></template>
                </i18n-t>
              </li>
              <li>
                <i18n-t keypath="about.stack.tech.pinia" tag="span">
                  <template #pinia><strong>Pinia</strong></template>
                </i18n-t>
              </li>
              <li>
                <i18n-t keypath="about.stack.tech.router" tag="span">
                  <template #router><strong>Vue Router</strong></template>
                </i18n-t>
              </li>
              <li>
                <i18n-t keypath="about.stack.tech.bootstrap" tag="span">
                  <template #bootstrap><strong>Bootstrap 5</strong></template>
                  <template #icons><strong>Bootstrap Icons</strong></template>
                </i18n-t>
              </li>
              <li>
                <i18n-t keypath="about.stack.tech.sass" tag="span">
                  <template #sass><strong>Sass (sass-embedded)</strong></template>
                </i18n-t>
              </li>
              <li>
                <i18n-t keypath="about.stack.tech.i18n" tag="span">
                  <template #i18n><strong>Vue I18n</strong></template>
                </i18n-t>
              </li>
            </ul>
            <h4 class="mt-4">{{ $t('about.stack.env.title') }}</h4>
            <ul>
              <li>
                <i18n-t keypath="about.stack.env.vite" tag="span">
                  <template #vite><strong>Vite</strong></template>
                </i18n-t>
              </li>
              <li>
                <i18n-t keypath="about.stack.env.typescript" tag="span">
                  <template #ts><strong>TypeScript</strong></template>
                </i18n-t>
              </li>
              <li>
                <i18n-t keypath="about.stack.env.eslint" tag="span">
                  <template #eslint><strong>ESLint</strong></template>
                  <template #prettier><strong>Prettier</strong></template>
                </i18n-t>
              </li>
              <li>
                <i18n-t keypath="about.stack.env.vueTsc" tag="span">
                  <template #vueTsc><strong>vue-tsc</strong></template>
                </i18n-t>
              </li>
              <li>
                <i18n-t keypath="about.stack.env.viteDevtools" tag="span">
                  <template #viteDevtools><strong>Vite Plugin Vue Devtools</strong></template>
                </i18n-t>
              </li>
            </ul>
          </div>
        </section>
      </div>
      <div class="col-md-4">
        <section
          class="card text-light rounded-0 border-0 shadow mb-4"
          style="background-color: #002d6e"
        >
          <div class="card-body p-4">
            <h3 class="fw-bold">{{ $t('about.cta.title') }}</h3>
            <ul class="list-group list-group-flush">
              <li class="list-group-item d-flex align-items-center gap-3">
                <i class="bi bi-github fs-5"></i>
                <a
                  aria-label="Bekijk code op Github (opent in een nieuw tabblad)"
                  class="link-light text-decoration-none"
                  href="https://github.com/superruudje/verrassingskalender"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {{ $t('about.cta.github') }}
                  <span aria-hidden="true">
                    <i class="ms-2 small bi bi-box-arrow-up-right"></i>
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.list-group-item {
  background-color: transparent;
  color: white;
}
</style>
