<template>
  <div class="app-note">
    <slot />
  </div>
</template>

<script setup lang="ts">
// Нет пропсов, только слот
</script>

<style scoped lang="scss">
.app-note {
  background-color: #fff3cd;
  border-left: 4px solid #ffc107;
  padding: 1rem;
  border-radius: 4px;
  margin: 1.5rem 0;
  color: #856404;
  font-size: 1.05rem;
}
</style>
