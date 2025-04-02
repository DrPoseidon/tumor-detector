import { ref } from "vue";
import { UPLOAD_STATUS } from "../config";

interface UseUploadProgressOptions {
  onSuccess: (files: File[]) => void;
}

export function useUploadProgress({ onSuccess }: UseUploadProgressOptions) {
  const isUploading = ref(false);
  const uploadProgress = ref(0);
  const uploadStatus = ref("");

  const startUpload = async (files: File[]) => {
    isUploading.value = true;
    uploadProgress.value = 0;
    uploadStatus.value = UPLOAD_STATUS.LOADING;

    try {
      // Имитация загрузки (замените на реальную логику загрузки)
      await new Promise((resolve) => {
        let progress = 0;
        const interval = setInterval(() => {
          progress += 10;
          uploadProgress.value = progress;

          if (progress >= 100) {
            clearInterval(interval);
            resolve(true);
          }
        }, 200);
      });

      uploadStatus.value = UPLOAD_STATUS.SUCCESS;
      onSuccess(files);

      setTimeout(() => {
        isUploading.value = false;
      }, 1000);
    } catch (error) {
      uploadStatus.value = UPLOAD_STATUS.ERROR;
      console.error(error);
    }
  };

  return {
    isUploading,
    uploadProgress,
    uploadStatus,
    startUpload,
  };
}
