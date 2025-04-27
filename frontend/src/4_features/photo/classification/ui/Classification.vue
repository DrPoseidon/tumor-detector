<script setup lang="ts">
import { Photo } from "@/entities/photo";
import AppButton from "@/shared/ui/app-button";
import AppChip from "@/shared/ui/app-chip";
import AppRange from "@/shared/ui/app-range";
import AppSvgIcon from "@/shared/ui/app-svg-icon";
import { reactive, ref, watch } from "vue";

defineProps<{
  photo: string;
}>();

const selectedClassificator = ref<string>();
const isResetAvailable = ref(false);

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
</script>

<template>
  <div class="photo-classification">
    <Photo :img-url="photo" :clickable="false" />

    <div class="photo-classification__filters">
      <AppButton :disabled="!isResetAvailable" @click="resetFilters">
        <AppSvgIcon name="reset" :size="15" />
      </AppButton>

      <AppChip
        v-for="(filter, id) in classificationMethods"
        :key="id"
        :is-active="selectedClassificator === id"
        @click="toggleFilter(id)"
      >
        {{ filter.label }}
      </AppChip>
    </div>

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

        <AppRange label="Параметр растяжения" :min="1" :max="1000" hide-value />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.photo-classification {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

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
    grid-area: 1/2;
  }

  &__selected-filter {
    grid-row: 2/3;
    grid-column: 1/3;
  }

  &__active-contours {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
}
</style>
