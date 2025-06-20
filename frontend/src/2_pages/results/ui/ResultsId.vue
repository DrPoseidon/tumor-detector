<template>
  <div v-if="result" class="result-details-page">
    <router-link to="/results" class="result-details-page__back-link">
      &larr; Назад ко всем результатам
    </router-link>
    <div class="result-details-page__content">
      <div class="result-details-page__image-container">
        <img
          :src="resultImage"
          alt="Результат исследования"
          class="result-details-page__image"
        />
      </div>
      <div class="result-details-page__info">
        <h1 class="result-details-page__title">Детали исследования</h1>
        <p class="result-details-page__diagnosis">
          <strong>Диагноз:</strong> {{ result.diagnosis }}
        </p>
        <AppButton
          class="result-details-page__download-btn"
          @click="downloadReport"
        >
          Выгрузить отчет
        </AppButton>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Результат не найден.</p>
  </div>
</template>

<script setup lang="ts">
import AppButton from "@/6_shared/ui/app-button/AppButton.vue";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import resultImage from "../../../../../test_images/test--result.jpg";

interface ResearchResult {
  id: number;
  date: string;
  diagnosis: string;
}

const mockResults: ResearchResult[] = [
  { id: 1, date: "2023-10-26T10:00:00", diagnosis: "Здоров" },
  { id: 2, date: "2023-10-27T11:30:00", diagnosis: "Обнаружена опухоль" },
  { id: 3, date: "2023-10-28T14:00:00", diagnosis: "Здоров" },
];

const route = useRoute();
const result = ref<ResearchResult | null>(null);

onMounted(() => {
  const resultId = Number(route.params.id);
  result.value = mockResults.find((r) => r.id === resultId) || null;
});

const downloadReport = () => {
  alert("Загрузка отчета...");
};
</script>

<style scoped lang="scss">
.result-details-page {
  margin: 0 20px;
  padding: 20px;

  &__back-link {
    display: inline-block;
    margin-bottom: 20px;
    color: #42b983;
    text-decoration: none;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }

  &__content {
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    display: flex;
    gap: 20px;
  }

  &__image-container {
    flex: 1;
    max-width: 500px;
  }

  &__image {
    width: 100%;
    border-radius: 6px;
    border: 1px solid #e2e8f0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &__info {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  &__title {
    font-size: 2rem;
    color: #2c3e50;
    margin-bottom: 2rem;
    font-weight: 600;
  }

  &__diagnosis {
    font-size: 1.1rem;
    line-height: 1.6;
    color: #4a5568;
    margin-bottom: 1.5rem;
    flex-grow: 1;
  }

  &__download-btn {
    align-self: flex-start;
  }
}
</style>
