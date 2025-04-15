<script setup lang="ts">
import NoiseReduction from "@/4_features/photo/noise-reduction/NoiseReduction.vue";
import AppChip from "@/shared/ui/app-chip";
import { reactive, ref } from "vue";
import SmoothingAndBlurring from "../smoothing-and-blurring/SmoothingAndBlurring.vue";

defineProps<{
  photo: string;
}>();

const selectedFilter = ref<string>();

const toggleFilter = (filterId: string) => {
  selectedFilter.value = filterId;
};

const filters = reactive({
  noise_reduction: {
    id: "noise_reduction",
    label: "Фильтрация шума",
    filter: {
      type: undefined,
      strength: undefined,
    },
  },
  smoothing_and_blurring: {
    id: "smoothing_and_blurring",
    label: "Гладкость/размытие",
    filter: {
      type: undefined,
      strength: undefined,
    },
  },
  contrast_enhancement: {
    id: "contrast_enhancement",
    label: "Повышение контраста",
  },
  rescaling_cropping: {
    id: "rescaling_cropping",
    label: "Масштабирование",
  },
  intensity_normalization: {
    id: "intensity_normalization",
    label: "Нормализация интенсивности",
  },
  transformation_and_sharpness_enhancement: {
    id: "transformation_and_sharpness_enhancement",
    label: "Преобразование и улучшение резкости",
  },
  alignment_and_registration: {
    id: "alignment_and_registration",
    label: "Выравнивание и выпрямление",
  },
});
</script>

<template>
  <div class="photo-preprocessing">
    <img class="photo-preprocessing__img" :src="photo" />

    <div class="photo-preprocessing__filters">
      <AppChip
        v-for="(filter, id) in filters"
        :key="id"
        :is-active="selectedFilter === id"
        @click="toggleFilter(id)"
      >
        {{ filter.label }}
      </AppChip>
    </div>

    <div class="photo-preprocessing__selected-filter">
      <NoiseReduction
        v-if="selectedFilter === 'noise_reduction'"
        v-model:type="filters.noise_reduction.filter.type"
        v-model:strength="filters.noise_reduction.filter.strength"
      />

      <SmoothingAndBlurring
        v-if="selectedFilter === 'smoothing_and_blurring'"
        v-model:type="filters.smoothing_and_blurring.filter.type"
        v-model:strength="filters.smoothing_and_blurring.filter.strength"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.photo-preprocessing {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  &__img {
    width: 300px;
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
    grid-area: 1/2;
  }

  &__selected-filter {
    grid-row: 2/3;
    grid-column: 1/3;
  }
}
</style>
