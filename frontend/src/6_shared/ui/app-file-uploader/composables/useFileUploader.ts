import { ref } from "vue";

export const useFileUploader = () => {
  const files = ref<File[]>([]);
  const isDragging = ref(false);
  const progress = ref(0);

  const uploadFiles = (event: Event | DragEvent) => {
    const fileList =
      event instanceof DragEvent
        ? event.dataTransfer?.files
        : (event.target as HTMLInputElement).files;

    if (!fileList) return;

    files.value = Array.from(fileList);
    progress.value = 0;

    // Имитация загрузки
    const interval = setInterval(() => {
      progress.value += 10;
      if (progress.value >= 100) {
        clearInterval(interval);
      }
    }, 100);
  };

  return {
    files,
    uploadFiles,
    isDragging,
    progress,
  };
};
