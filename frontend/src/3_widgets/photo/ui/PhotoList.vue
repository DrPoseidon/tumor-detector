<script setup lang="ts">
import { Photo, usePhotoStore } from "@/entities/photo";

const photoStore = usePhotoStore();

const emit = defineEmits<{
  select: [imgId: string];
}>();
</script>

<template>
  <div class="photo-list">
    <Photo
      v-for="(imageUrl, imageId) in photoStore.images"
      :key="imageId"
      class="photo-list__img"
      :img-url="imageUrl"
      @click="emit('select', imageId)"
    />
  </div>
</template>

<style scoped lang="scss">
.photo-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 24px;
}
</style>
