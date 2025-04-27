<script setup lang="ts">
const { progress = 0 } = defineProps<{
  progress?: number;
}>();
</script>

<template>
  <div class="app-progress">
    <div class="app-progress__bar" :style="{ width: `${progress}%` }" />
  </div>
</template>

<style scoped lang="scss">
.app-progress {
  width: 100%;
  height: 4px;
  background-color: lightgray;
  border-radius: 2px;
  overflow: hidden;

  &__bar {
    height: 100%;
    background-color: #42b983;
    transition: width 0.2s ease;
  }
}
</style>
