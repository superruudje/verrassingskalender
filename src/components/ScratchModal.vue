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
          <h3 id="staticBackdropLabel" class="modal-title fs-5 fw-bold">
            {{ $t('scratch.title') }}
          </h3>
        </div>
        <div class="modal-body text-center nl-primary">
          <p>{{ $t('scratch.text') }}</p>
          <div class="d-flex justify-content-center">
            <ScratchCard
              :key="box?.id"
              :prize="box?.prize ?? 0"
              @revealed="openBox"
              @started="started = true"
            />
          </div>
          <template v-if="box?.opened && !box.prize">
            <i18n-t keypath="scratch.noPrize" tag="span">
              <b>{{ $t('scratch.no') }}</b>
            </i18n-t>
          </template>
          <template v-else-if="box?.opened && box.prize">
            <i18n-t keypath="scratch.prize" tag="span">
              <template #p>
                <b>{{ $t('scratch.congrats') }}</b>
              </template>
              <template #prize>{{ $n(box.prize, 'currency') }}</template>
            </i18n-t>
          </template>
          <span v-else>{{ $t('scratch.minimal') }}</span>
        </div>
        <div class="modal-footer">
          <button
            v-if="box?.opened"
            class="btn-primary ms-auto"
            data-bs-dismiss="modal"
            type="button"
          >
            <span class="btn-text">{{ $t('cta.close') }}</span>
          </button>
          <button
            v-if="!box?.opened"
            :disabled="started"
            class="btn-primary ms-auto"
            data-bs-dismiss="modal"
            type="button"
          >
            <span class="btn-text">{{ $t('cta.cancel') }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Box } from '@/types/Calendar.ts'
import { useCalendarStore } from '@/stores/calendar.ts'
import ScratchCard from '@/components/ScratchCard.vue'
import { ref, watch } from 'vue'

const calendarStore = useCalendarStore()

const props = defineProps<{
  box: Box | null
}>()

const started = ref<boolean>(false)

/**
 * Opens a box if it is available in the properties. This function interacts with the `calendarStore` to perform the action.
 *
 * @return {void} Does not return a value. Executes the opening of the specified box.
 */
function openBox() {
  if (!props.box) return
  calendarStore.openBox(props.box.id)
}

watch(
  () => props.box,
  () => {
    started.value = false
  },
)
</script>

<style scoped></style>
