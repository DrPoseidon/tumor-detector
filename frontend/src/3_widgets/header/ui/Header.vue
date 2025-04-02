<script setup lang="ts">
import { useRouter } from "vue-router";

const tabs = [
  {
    label: "Загрузка изображений",
    path: "/",
  },
  {
    label: "Предобработка",
    path: "/1",
  },
  {
    label: "Классификация",
    path: "/2",
  },
  {
    label: "История исследований",
    path: "/3",
  },
  {
    label: "Результаты",
    path: "/4",
  },
];

const router = useRouter();
</script>

<template>
  <div class="header">
    <router-link
      v-for="(tab, index) in tabs"
      :key="index"
      class="header__link"
      :class="{
        'header__link--selected': router.currentRoute.value.path === tab.path,
      }"
      :to="tab.path"
    >
      {{ tab.label }}
    </router-link>
  </div>
</template>

<style scoped lang="scss">
.header {
  height: 60px;
  padding: 0 40px;
  background-color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid lightgray;

  &__link {
    $hPadding: 8px;

    padding: 12px $hPadding;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    color: black;
    text-decoration: none;
    text-transform: uppercase;

    &--selected {
      position: relative;

      &::after {
        content: "";
        position: absolute;
        height: 2px;
        width: calc(100% - $hPadding * 2);
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        background-color: black;
      }
    }
  }
}
</style>
