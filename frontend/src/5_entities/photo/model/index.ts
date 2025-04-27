import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const usePhotoStore = defineStore("photo", () => {
  const files = ref<Record<string, File>>({});

  const uploadFiles = (_files: File[]) => {
    _files.forEach((file) => {
      if (file.type.startsWith("image/")) {
        const id = crypto.randomUUID();
        files.value[id] = file;
      }
    });
  };

  const images = computed(() => {
    return Object.entries(files.value).reduce(
      (acc, entry) => {
        const [id, file] = entry;
        acc[id] = URL.createObjectURL(file);
        return acc;
      },
      {} as Record<string, string>
    );
  });

  return {
    files,
    images,
    uploadFiles,
  };
});
