<script setup lang="ts">
import { usePhotoStore } from "@/entities/photo";
import AppFileUploader from "@/shared/ui/app-file-uploader";
import { useToast } from "vue-toastification";

const photoStore = usePhotoStore();

const toast = useToast();

const uploadFiles = (files: File[]) => {
  photoStore.uploadFiles(files);

  toast.success("Для просмотра изображений\nоткройте раздел «Предобработка»", {
    timeout: 3000,
  });
};
</script>

<template>
  <div class="photoUpload">
    <AppFileUploader
      class="home__file-uploader"
      multiple
      style="height: 200px"
      @files-selected="uploadFiles"
    />
  </div>
</template>

<style scoped lang="scss">
.photo-upload {
  position: relative;

  &__file-uploader {
    height: 200px;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 50%;
    transform: translate(-50%, 50%);
  }
}
</style>
