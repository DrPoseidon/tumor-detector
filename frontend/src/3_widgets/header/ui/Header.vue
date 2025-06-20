<script setup lang="ts">
import { routes } from "@/app/router/routes";
import { computed } from "vue";
import { useRouter } from "vue-router";

const tabs = computed(() =>
  routes.filter((route) => route?.meta?.isVisibleInHeader)
);

const router = useRouter();

const isRouteActive = (path: string) => {
  const currentPath = router.currentRoute.value.path;

  if (path === "/") {
    // Для главной страницы проверяем и точное совпадение, и дочерние маршруты
    return currentPath === path || currentPath.startsWith("/article/");
  }

  return currentPath.startsWith(path);
};
</script>

<template>
  <div class="header">
    <router-link
      v-for="(tab, index) in tabs"
      :key="index"
      class="header__link"
      :class="{
        'header__link--selected': isRouteActive(tab.path),
      }"
      :to="tab.path"
    >
      {{ tab?.meta?.title ?? tab.name }}
    </router-link>
  </div>
</template>

<style scoped lang="scss">
@import "@/shared/assets/styles/z-index.scss";

.header {
  position: sticky;
  top: 0;
  z-index: $z-index-header;
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
