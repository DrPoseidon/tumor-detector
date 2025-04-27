<script setup lang="ts">
import { usePhotoStore } from "@/entities/photo";
import AppFileUploader from "@/shared/ui/app-file-uploader";
import { ref, watch } from "vue";

const photoStore = usePhotoStore();

const selectedImage = ref<string>();

const isShowPopup = ref(false);

watch(selectedImage, (value) => {
  console.log(value);
  isShowPopup.value = Boolean(value);
});
</script>

<template>
  <div class="home">
    <AppFileUploader
      class="home__file-uploader"
      multiple
      style="height: 200px"
      @files-selected="photoStore.uploadFiles"
    />
  </div>
</template>

<style scoped lang="scss">
.home {
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
