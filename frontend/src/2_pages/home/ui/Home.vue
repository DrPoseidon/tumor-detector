<script setup lang="ts">
import { PhotoPreprocessing } from "@/features/photo";
import AppFileUploader from "@/shared/ui/app-file-uploader";
import AppPopup from "@/shared/ui/app-popup";
import { ref, watch } from "vue";

const images = ref<Record<string, string>>({});
const selectedImage = ref<string>();

const isShowPopup = ref(false);

watch(selectedImage, (value) => {
  console.log(value);
  isShowPopup.value = Boolean(value);
});

const uploadFiles = (files: File[]) => {
  files.forEach((file) => {
    if (file.type.startsWith("image/")) {
      const imgUrl = URL.createObjectURL(file);
      images.value[file.name] = imgUrl;
    }
  });
};
</script>

<template>
  <div class="home">
    <AppFileUploader
      multiple
      style="height: 200px"
      @files-selected="uploadFiles"
    />

    <div class="home__images">
      <img
        v-for="(imageUrl, imageName) in images"
        :key="imageName"
        :src="imageUrl"
        @click="selectedImage = imageUrl"
      />
    </div>

    <AppPopup
      :is-visible="Boolean(selectedImage)"
      header="Предобработка изображения"
      @close="selectedImage = undefined"
    >
      <template #body><PhotoPreprocessing :photo="selectedImage!" /></template>
    </AppPopup>
  </div>
</template>

<style scoped lang="scss">
.home {
  &__images {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    margin-top: 24px;

    img {
      width: 100%;
      aspect-ratio: 1;
      object-fit: contain;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      background-color: #f5f5f5;
      cursor: pointer;
      transition: box-shadow 0.2s ease;

      &:hover {
        box-shadow: 0px 0px 10px 5px lightgray;
      }
    }
  }
}
</style>
