<script setup lang="ts">
import { usePhotoStore } from "@/5_entities/photo";
import PhotoPreprocessing from "@/features/photo/preprocessing";
import AppEmptyState from "@/shared/ui/app-empty-state";
import AppPopup from "@/shared/ui/app-popup";
import PhotoList from "@/widgets/photo/ui/PhotoList.vue";
import { computed, ref } from "vue";

const photoId = ref<string>();
const photoStore = usePhotoStore();

const isEmpty = computed(() => !Object.keys(photoStore.images).length);
</script>

<template>
  <div class="preprocessing">
    <AppEmptyState
      v-if="isEmpty"
      class="preprocessing__empty-state"
      button-text="Перейти к загрузке"
      route="/photo-upload"
      text="Нет загруженных изображений"
    />

    <PhotoList v-else @select="photoId = $event" />

    <AppPopup
      :is-visible="Boolean(photoId)"
      header="Предобработка изображения"
      @close="photoId = undefined"
    >
      <template #body><PhotoPreprocessing :photo-id="photoId!" /></template>
    </AppPopup>
  </div>
</template>

<style scoped lang="scss">
.preprocessing {
  &__empty-state {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
