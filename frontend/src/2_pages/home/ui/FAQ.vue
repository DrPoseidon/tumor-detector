<script setup lang="ts">
import AppNote from "@/6_shared/ui/app-note";
</script>

<template>
  <div class="faq">
    <h2 class="faq__title">Как пользоваться системой?</h2>

    <div class="faq__section">
      <h3 class="faq__section-title">1. Загрузка изображений</h3>
      <article class="faq__content">
        <p class="faq__text">Кликните на "Загрузка изображений" в хедере.</p>

        <img
          src="@/shared/assets/images/faq/upload1.png"
          alt="Скриншот загрузки изображений"
          class="faq__image"
        />

        <p class="faq__text">
          Перетяните изображене в зону загрузки или кликните по кнопке "Выберите
          файл"
        </p>

        <img
          src="@/shared/assets/images/faq/upload2.png"
          alt="Скриншот зоны загрузки"
          class="faq__image"
        />

        <AppNote>
          ⚠️ Система поддерживает загрузку нескольких изображений в формате
          DICOM, PNG и JPG
        </AppNote>

        <p class="faq__text">
          После успешной загрузки Вы увидете соответствующее сообщение. Теперь
          изображения доступны для предобработки и классификации
        </p>

        <img
          src="@/shared/assets/images/faq/upload3.png"
          alt="Успешная загрузка изображения"
          class="faq__image"
        />
      </article>
    </div>

    <div class="faq__section">
      <h3 class="faq__section-title">2. Предобработка изображений</h3>
      <article class="faq__content">TODO // РАЗДЕЛ ЕЩЕ НЕ ГОТОВ</article>
    </div>
  </div>
</template>

<style lang="scss">
.faq {
  margin: 0 20px;
  padding: 20px;

  &__title {
    font-size: 2rem;
    color: #2c3e50;
    margin-bottom: 2rem;
    font-weight: 600;
  }

  &__section {
    margin-bottom: 3rem;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__section-title {
    font-size: 1.5rem;
    color: #42b983;
    margin-bottom: 1.5rem;
    font-weight: 500;
  }

  &__content {
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }

  &__text {
    font-size: 1.1rem;
    line-height: 1.6;
    color: #4a5568;
    margin-bottom: 1.5rem;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__image {
    width: 100%;
    max-width: 600px;
    height: auto;
    border-radius: 6px;
    border: 1px solid #e2e8f0;
    margin: 1.5rem auto;
    display: block;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
}
</style>
