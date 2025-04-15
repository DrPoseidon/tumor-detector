<script setup lang="ts">
import AppSvgIcon from "../app-svg-icon/AppSvgIcon.vue";

const { header = "", isVisible = false } = defineProps<{
  header?: string;
  isVisible?: boolean;
}>();

const emit = defineEmits<{
  close: [];
}>();
</script>

<template>
  <div v-if="isVisible" class="app-popup__overlay">
    <div class="app-popup">
      <div class="app-popup__header">
        <div class="app-popup__header-text">
          {{ header }}
        </div>

        <button @click="emit('close')"><AppSvgIcon name="close" /></button>
      </div>

      <div class="app-popup__body">
        <slot name="body" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.app-popup__overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(1, 1, 1, 0.7);
}

.app-popup {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 400px;
  max-width: 60vw;
  width: auto;
  padding: 16px;
  border-radius: 8px;
  background-color: white;

  &__header {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    gap: 20px;
    padding-bottom: 10px;

    &-text {
      font-size: 20px;
      font-weight: 700;
    }

    & > button {
      padding: 2px;
      background: lightgray;
      border: none;
      border-radius: 8px;
      cursor: pointer;
    }
  }

  &__body {
    max-height: 600px;
    overflow-y: auto;
    overflow-x: hidden;
  }
}
</style>
