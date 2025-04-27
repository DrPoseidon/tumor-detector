<script setup lang="ts">
import { usePhotoStore } from "@/entities/photo";
import PhotoClassification from "@/features/photo/classification";
import AppEmptyState from "@/shared/ui/app-empty-state";
import AppPopup from "@/shared/ui/app-popup";
import { PhotoList } from "@/widgets/photo";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const selectedImage = ref<string>();

const handlePhotoSelect = (imgId: string) => {
  console.log(`/classification/${imgId}`);
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
      route="/"
      text="Нет загруженных изображений"
    />

    <PhotoList v-else @select="handlePhotoSelect" />

    <AppPopup
      :is-visible="Boolean(selectedImage)"
      header="Классификация"
      @close="selectedImage = undefined"
    >
      <template #body>
        <PhotoClassification :photo="selectedImage!" />
      </template>
    </AppPopup>
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
