<template>
  <button
    class="app-button"
    :class="{
      'app-button--disabled': disabled,
      'app-button--secondary': variant === 'secondary',
    }"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps<{
  disabled?: boolean;
  variant?: "primary" | "secondary";
}>();

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
  transition: all 0.3s ease;

  &:hover:not(&--disabled) {
    background-color: darken(#42b983, 10%);
  }

  &:active:not(&--disabled) {
    background-color: darken(#42b983, 15%);
  }

  &--disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background-color: #c0c4cc;
  }

  &--secondary {
    background-color: #909399;

    &:hover:not(&--disabled) {
      background-color: darken(#909399, 10%);
    }

    &:active:not(&--disabled) {
      background-color: darken(#909399, 15%);
    }
  }
}
</style>
