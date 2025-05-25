<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import AppSvgIcon from "../app-svg-icon/AppSvgIcon.vue";

const {
  header = "",
  isVisible = false,
  closable = true,
} = defineProps<{
  header?: string;
  isVisible?: boolean;
  closable?: boolean;
}>();

const emit = defineEmits<{
  close: [];
}>();

const bodyRef = ref<HTMLElement | null>(null);
const hasScroll = ref(false);

const checkScroll = () => {
  if (bodyRef.value) {
    hasScroll.value = bodyRef.value.scrollHeight > bodyRef.value.clientHeight;
  }
};

onMounted(() => {
  checkScroll();
  window.addEventListener("resize", checkScroll);
});

const toggleBodyScroll = (isLocked: boolean) => {
  document.body.style.overflow = isLocked ? "hidden" : "";
};

watch(
  () => isVisible,
  (newValue) => {
    toggleBodyScroll(newValue);
    if (newValue) {
      // Даем время на рендер контента
      setTimeout(checkScroll, 0);
    }
  },
  { immediate: true }
);
</script>

<template>
  <div v-if="isVisible" class="app-popup__overlay">
    <div class="app-popup" :class="{ 'app-popup--has-scroll': hasScroll }">
      <div class="app-popup__header">
        <div class="app-popup__header-text">
          {{ header }}
        </div>

        <button v-if="closable" @click="emit('close')">
          <AppSvgIcon name="close" />
        </button>
      </div>

      <div ref="bodyRef" class="app-popup__body">
        <slot name="body" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/shared/assets/styles/z-index.scss";

.app-popup__overlay {
  position: fixed;
  z-index: $z-index-popup;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(1, 1, 1, 0.7);
}

.app-popup {
  $padding: 16px;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 400px;
  max-width: 60vw;
  width: auto;
  padding: $padding;
  border-radius: 8px;
  background-color: white;

  &--has-scroll {
    padding-right: 0;

    .app-popup__body,
    .app-popup__header {
      padding-right: $padding;
    }
  }

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
    padding-right: 0;
  }
}
</style>
