<script setup lang="ts">
import { Header } from "@/widgets/header";
</script>

<template>
  <div class="app">
    <Header />
    <RouterView class="app__content" />
  </div>
</template>

<style lang="scss">
html,
body {
  height: 100%;
  margin: 0;
}

#app {
  height: 100%;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100%;

  &__content {
    flex: 1;
    padding: 20px 10%;
  }
}
</style>
