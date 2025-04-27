<script setup lang="ts">
import { useRouter } from "vue-router";
import AppButton from "../app-button";

const router = useRouter();

const props = defineProps<{
  text: string;
  buttonText: string;
  route?: string;
}>();

const handleClick = () => {
  if (props.route) {
    router.push(props.route);
  }
};
</script>

<template>
  <div class="app-empty-state">
    <p>{{ text }}</p>
    <AppButton @click="handleClick">{{ buttonText }}</AppButton>
  </div>
</template>

<style scoped lang="scss">
.app-empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  color: gray;
}
</style>
