<script setup lang="ts">
import { usePhotoStore } from "@/entities/photo";
import AppEmptyState from "@/shared/ui/app-empty-state";
import { PhotoList } from "@/widgets/photo";
import { computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const handlePhotoSelect = (imgId: string) => {
  router.push(`/classification/${imgId}`);
};

const photoStore = usePhotoStore();

const isEmpty = computed(() => !Object.keys(photoStore.images).length);
</script>

<template>
  <div class="classification">
    <AppEmptyState
      v-if="isEmpty"
      class="classification__empty-state"
      button-text="Перейти к загрузке"
      route="/photo-upload"
      text="Нет загруженных изображений"
    />

    <PhotoList v-else @select="handlePhotoSelect" />
  </div>
</template>

<style scoped lang="scss">
.classification {
  &__empty-state {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
