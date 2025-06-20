<script setup lang="ts">
import { Photo, usePhotoStore } from "@/entities/photo";
import AppButton from "@/shared/ui/app-button";
import AppChip from "@/shared/ui/app-chip";
import AppPopup from "@/shared/ui/app-popup/AppPopup.vue";
import AppProgress from "@/shared/ui/app-progress/AppProgress.vue";
import AppRange from "@/shared/ui/app-range";
import { computed, reactive, ref, watch } from "vue";
import { useRoute } from "vue-router";

import { useToast } from "vue-toastification";
import TestPhotoPesult from "../../../../../test_images/test--result.jpg";
import TestPhoto from "../../../../../test_images/test.jpg";

const PROCESSING_STATUS = {
  LOADING: "Обработка...",
  SUCCESS: "Классификация завершена успешно!",
  ERROR: "Ошибка во время обработки, повторите позже",
} as const;

const toast = useToast();

const route = useRoute();
const photoStore = usePhotoStore();
const selectedClassificator = ref<string>();
const isResetAvailable = ref(false);

const originalPhoto = computed(() => {
  // const id = route.params.id as string;
  // return photoStore.images[id];
  return TestPhoto;
});

const resultPhoto = ref<typeof TestPhotoPesult | null>(null);

const toggleFilter = (filterId: string) => {
  selectedClassificator.value = filterId;
};

const classificationMethods = reactive({
  active_contours: {
    id: "active_contours",
    label: "Активные контуры ",
  },
  thresholding: {
    id: "thresholding",
    label: "Пороговая обработка ",
  },
  geometry_characteristics: {
    id: "geometry_characteristics",
    label: "Метод геометрических характеристик объектов",
  },
});

watch(
  classificationMethods,
  () => {
    isResetAvailable.value = true;
  },
  { deep: true }
);

const resetFilters = () => {
  isResetAvailable.value = true;

  // TODO: сброс фильтров
};

const uploadProgress = ref(0);
const uploadStatus = ref("");
const classificationInProgress = ref(false);
const applyClassification = async () => {
  classificationInProgress.value = true;

  uploadProgress.value = 0;
  uploadStatus.value = PROCESSING_STATUS.LOADING;

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

    uploadStatus.value = PROCESSING_STATUS.SUCCESS;
    resultPhoto.value = TestPhotoPesult;

    setTimeout(() => {
      classificationInProgress.value = false;
    }, 2000);
  } catch (error) {
    uploadStatus.value = PROCESSING_STATUS.ERROR;
    console.error(error);
  }
};

const saveResult = () => {
  toast.success(
    "Результат исследования сохранен. \nДля просмотра откройте раздел «Результаты»",
    {
      timeout: 3000,
    }
  );
};
</script>

<template>
  <div class="photo-classification">
    <Photo
      :img-url="originalPhoto"
      class="photo-classification__original-photo"
      :clickable="false"
    />

    <Photo
      v-if="resultPhoto"
      :img-url="resultPhoto"
      class="photo-classification__result-photo"
      :clickable="false"
    />

    <div class="photo-classification__filters">
      <b style="line-height: 31px">Параметры обработки:</b>

      <AppChip
        v-for="(filter, id) in classificationMethods"
        :key="id"
        :is-active="selectedClassificator === id"
        @click="toggleFilter(id)"
      >
        {{ filter.label }}
      </AppChip>

      <div class="photo-classification__selected-filter">
        <div
          v-if="selectedClassificator === 'active_contours'"
          class="photo-classification__active-contours"
        >
          <AppRange label="Параметр гладкости" :min="0" :max="5" />

          <AppRange
            label="Энергия внешнего потенциала"
            :min="0"
            :max="100"
            :disabled="true"
            hide-value
          />

          <AppRange
            label="Максимальное количество итераций"
            :min="1"
            :max="1000"
          />

          <AppRange
            label="Параметр растяжения"
            :min="1"
            :max="1000"
            hide-value
          />
        </div>
      </div>
    </div>

    <AppButton
      class="photo-classification__apply-btn"
      :variant="resultPhoto ? 'secondary' : 'primary'"
      @click="resultPhoto ? resetFilters() : applyClassification()"
    >
      {{
        resultPhoto ? "Сбросить параметры" : "Запустить обработку"
      }}</AppButton
    >

    <AppButton
      v-if="resultPhoto"
      class="photo-classification__save-btn"
      @click="saveResult"
      >Сохранить результат</AppButton
    >

    <AppPopup :is-visible="classificationInProgress" :closable="false">
      <template #body>
        <AppProgress :progress="uploadProgress" />
        <p class="photo-classification__status">{{ uploadStatus }}</p>
      </template>
    </AppPopup>
  </div>
</template>

<style lang="scss" scoped>
.photo-classification {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  &__original-photo {
    grid-area: 1/1;
  }

  &__result-photo {
    grid-area: 1/2;
  }

  &__apply-btn {
    height: min-content;
    grid-area: 2/1;
  }

  &__save-btn {
    grid-area: 2/2;
  }

  &__img {
    width: 100%;
    aspect-ratio: 1;
    object-fit: contain;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: #f5f5f5;
    grid-area: 1/1;
  }

  &__filters {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px;
    height: fit-content;
    grid-column: 1/2;
    grid-row: 3/4;
  }

  &__selected-filter {
    grid-area: 2/3;
  }

  &__active-contours {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  &__status {
    color: #666;
    margin: 0;
  }
}
</style>
