<script setup lang="ts">
import AppDropdown from "@/shared/ui/app-dropdown";
import AppRange from "@/shared/ui/app-range";

enum NOISE_FILTER {
  GAUSSIAN = "gaussian",
  MEDIAN = "median",
  BILINEAR = "bilinear",
}

const filterType = defineModel<NOISE_FILTER>("type");
const filterStrength = defineModel<number>("strength");
</script>

<template>
  <div class="noise-reduction">
    <AppDropdown
      v-model="filterType"
      placeholder="Выберите фильтр"
      :options="[
        { value: NOISE_FILTER.GAUSSIAN, text: 'Гауссов фильтр' },
        { value: NOISE_FILTER.MEDIAN, text: 'Медианный фильтр' },
        { value: NOISE_FILTER.BILINEAR, text: 'Билинейная фильтрация' },
      ]"
    />

    <AppRange
      v-model="filterStrength"
      label="Сила фильтрации"
      :min="0"
      :max="10"
      :step="1"
      :disabled="!filterType"
    />
  </div>
</template>

<style scoped lang="scss">
.noise-reduction {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
