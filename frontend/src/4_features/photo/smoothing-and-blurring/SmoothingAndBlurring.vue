<script setup lang="ts">
import AppDropdown from "@/shared/ui/app-dropdown";
import AppRange from "@/shared/ui/app-range";

enum NOISE_FILTER {
  GAUSSIAN = "gaussian",
  AVERAGE = "average",
  MEDIAN = "median",
}

const filterType = defineModel<NOISE_FILTER>("type");
const filterStrength = defineModel<number>("strength");
</script>

<template>
  <div class="noise-reduction">
    <AppDropdown
      v-model="filterType"
      placeholder="Выберите тип размытия"
      :options="[
        { value: NOISE_FILTER.GAUSSIAN, text: 'Гауссово размытие' },
        { value: NOISE_FILTER.AVERAGE, text: 'Среднее размытие' },
        { value: NOISE_FILTER.MEDIAN, text: 'Медианное размытие' },
      ]"
    />

    <AppRange
      v-model="filterStrength"
      label="Сила размытия"
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
