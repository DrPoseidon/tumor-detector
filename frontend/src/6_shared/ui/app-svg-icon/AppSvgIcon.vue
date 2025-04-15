<script setup lang="ts">
import {
  defineAsyncComponent,
  shallowReactive,
  watch,
  type Component,
} from "vue";

const props = withDefaults(
  defineProps<{
    name: string;
    size?: number;
  }>(),
  {
    size: 24,
  }
);

const getIconComponent = (name: string) =>
  defineAsyncComponent(() => import(`@/shared/assets/${name}.svg`));

const icons: Record<string, Component> = shallowReactive({
  camera: getIconComponent("camera"),
  close: getIconComponent("x"),
});

watch(
  () => props.name,
  (value) => {
    if (!icons[value]) {
      console.warn(`[WARN]: Нет иконки с именем ${props.name}`);
    }
  },
  {
    immediate: true,
  }
);
</script>

<template>
  <component
    :is="icons[name]"
    v-if="icons[name]"
    :width="size"
    :height="size"
    class="app-svg-icon"
  />
</template>

<style lang="scss" scoped>
.app-svg-icon {
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  text-align: center;
  flex-shrink: 0;
}
</style>
