<script setup lang="ts">
defineProps<{
  isActive: boolean;
}>();

const emit = defineEmits<{
  click: [];
}>();
</script>

<template>
  <div
    class="app-chip"
    :class="{
      'app-chip--active': isActive,
    }"
    @click="emit('click')"
  >
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.app-chip {
  width: fit-content;
  height: fit-content;
  padding: 7px 12px 6px;
  border-radius: 4px;
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  line-height: 18px;
  white-space: nowrap;
  background-color: #e9ecf1;
  color: #66707e;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover:not(&--active) {
    background-color: #dbdfe5;
  }

  &--active {
    background-color: #66707e;
    color: white;
  }
}
</style>
