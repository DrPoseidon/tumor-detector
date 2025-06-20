<template>
  <div class="results-page">
    <h1 class="results-page__title">Результаты исследований</h1>
    <ul class="results-list">
      <li v-for="result in results" :key="result.id" class="result-item">
        <router-link :to="`/results/${result.id}`" class="result-item__link">
          <span class="result-item__date">{{ formatDate(result.date) }}</span>
          <span class="result-item__diagnosis">{{ result.diagnosis }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface ResearchResult {
  id: number;
  date: string;
  diagnosis: string;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString("ru-RU", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const results = ref<ResearchResult[]>([
  { id: 1, date: "2023-10-26T10:00:00", diagnosis: "Здоров" },
  { id: 2, date: "2023-10-27T11:30:00", diagnosis: "Обнаружена опухоль" },
  { id: 3, date: "2023-10-28T14:00:00", diagnosis: "Здоров" },
]);
</script>

<style scoped>
.results-page {
  padding: 20px;
  font-family: sans-serif;
}

.results-page__title {
  margin-bottom: 20px;
}

.results-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.result-item {
  margin-bottom: 10px;
}

.result-item__link {
  display: flex;
  justify-content: space-between;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  text-decoration: none;
  color: #333;
  transition:
    background-color 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;
}

.result-item__link:hover {
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.result-item__date {
  font-weight: 500;
}
</style>
