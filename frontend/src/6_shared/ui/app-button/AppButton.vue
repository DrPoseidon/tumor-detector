<template>
  <button class="app-button" @click="$emit('click')">
    <slot />
  </button>
</template>

<script setup lang="ts">
defineEmits<{
  click: [];
}>();
</script>

<style scoped lang="scss">
.app-button {
  padding: 0.5rem 1rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: darken(#42b983, 10%);
  }

  &:active {
    background-color: darken(#42b983, 15%);
  }
}
</style>
