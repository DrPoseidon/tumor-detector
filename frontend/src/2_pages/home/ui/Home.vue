<script setup lang="ts">
import { PhotoPreprocessing } from "@/features/photo";
import AppFileUploader from "@/shared/ui/app-file-uploader";
import AppPopup from "@/shared/ui/app-popup";
import { computed, ref, watch } from "vue";

const files = ref<Record<string, File>>({});
const selectedImage = ref<string>();

const isShowPopup = ref(false);

watch(selectedImage, (value) => {
  console.log(value);
  isShowPopup.value = Boolean(value);
});

const uploadFiles = (_files: File[]) => {
  _files.forEach((file) => {
    if (file.type.startsWith("image/")) {
      files.value[file.name] = file;
    }
  });
};

const images = computed(() => {
  return Object.entries(files.value).reduce(
    (acc, entry) => {
      const [name, file] = entry;

      acc[name] = URL.createObjectURL(file);
      return acc;
    },
    {} as Record<string, string>
  );
});
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
