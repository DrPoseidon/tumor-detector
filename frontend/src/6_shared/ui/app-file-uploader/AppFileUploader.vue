<template>
  <div
    class="app-file-uploader"
    :class="{ 'app-file-uploader--is-dragover': isDragOver }"
    @dragover.prevent="handleDragOver"
    @dragleave.prevent="handleDragLeave"
    @drop.prevent="handleDrop"
  >
    <div v-if="!isUploading" class="app-file-uploader__content">
      <AppSvgIcon name="camera" class="app-file-uploader__icon" />
      <p>Перетяните изображение сюда или</p>

      <AppButton type="button" @click="handleClick"> Выберите файл </AppButton>
    </div>

    <input
      ref="fileInput"
      type="file"
      class="app-file-uploader__input"
      :multiple="multiple"
      :accept="accept"
      @change="handleFileChange"
    />

    <!-- Модальное окно загрузки -->
    <div v-if="isUploading" class="upload-modal">
      <div class="upload-modal__content">
        <AppProgress :progress="uploadProgress" />
        <p class="upload-modal__status">{{ uploadStatus }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import AppButton from "@/shared/ui/app-button/AppButton.vue";
import AppSvgIcon from "@/shared/ui/app-svg-icon";
import { ref } from "vue";
import AppProgress from "../app-progress/AppProgress.vue";
import { useUploadProgress } from "./composables/useUploadProgress";
import { DEFAULT_ACCEPT } from "./config";

const { multiple = false, accept = DEFAULT_ACCEPT } = defineProps<{
  multiple?: boolean;
  accept?: string;
}>();

const emit = defineEmits<{
  "files-selected": [selectedFiles: File[]];
}>();

const fileInput = ref<HTMLInputElement | null>(null);
const isDragOver = ref(false);

const { isUploading, uploadProgress, uploadStatus, startUpload } =
  useUploadProgress({
    onSuccess: (files) => emit("files-selected", files),
  });

const handleClick = () => {
  if (fileInput.value) {
    fileInput.value.value = "";
    fileInput.value.click();
  }
};

const handleDragOver = () => {
  isDragOver.value = true;
};

const handleDragLeave = () => {
  isDragOver.value = false;
};

const handleDrop = (event: DragEvent) => {
  isDragOver.value = false;
  if (event.dataTransfer?.files) {
    emitFiles(event.dataTransfer.files);
  }
};

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    emitFiles(target.files);
  }
};

const emitFiles = (files: FileList) => {
  if (!multiple && files.length > 1) {
    console.warn("Multiple files selected, but multiple prop is false");
    return;
  }

  const selectedFiles = multiple ? Array.from(files) : [files[0]];
  startUpload(selectedFiles);
};
</script>

<style scoped lang="scss">
.app-file-uploader {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px dashed #ccc;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;

  &--is-dragover {
    border-color: #42b983;
    background-color: rgba(66, 185, 131, 0.1);
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  &__icon {
    width: 48px;
    height: 48px;
    color: #666;
  }

  &__input {
    display: none;
  }
}

.upload-modal {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;

  &__content {
    width: 80%;
    text-align: center;
  }

  &__status {
    color: #666;
    margin: 0;
  }
}
</style>
