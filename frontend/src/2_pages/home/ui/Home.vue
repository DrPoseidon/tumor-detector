<script setup lang="ts">
import FileUpload from "@/shared/ui/app-file-uploader";
import { ref } from "vue";

const uploadedImage = ref<string | null>(null);

const handleFileUpload = (files: File[]) => {
  const file = files[0];
  if (file && file.type.startsWith("image/")) {
    uploadedImage.value = URL.createObjectURL(file);
  }
};
</script>

<template>
  <div class="home">
    <div class="home__uploader">
      <FileUpload @files-selected="handleFileUpload" />
    </div>

    <div v-if="uploadedImage" class="home__preview">
      <img :src="uploadedImage" alt="Загруженное изображение" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.home {
  display: flex;
  gap: 2rem;
  padding: 2rem;

  &__uploader {
    height: 500px;
    width: 500px;
  }

  &__preview {
    width: 500px;
    height: 500px;
    border: 1px solid #ccc;
    border-radius: 8px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}
</style>
