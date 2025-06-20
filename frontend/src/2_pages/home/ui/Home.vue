<script setup lang="ts">
import { routes } from "@/app/router/routes.ts";
import { computed, onMounted } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const articles = computed(
  () => routes.find((route) => route.path === "/")?.children || []
);

onMounted(() => {
  if (route.path === "/") {
    router.push("/article/faq");
  }
});
</script>

<template>
  <div class="home">
    <div class="home__sidebar">
      <h3 class="home__sidebar-title">Содержание</h3>
      <ul class="home__menu">
        <li
          v-for="article in articles"
          :key="article.path"
          class="home__menu-item"
        >
          <RouterLink
            :to="article.path"
            class="home__menu-link"
            :class="{
              'home__menu-link--active': route.path === '/' + article.path,
            }"
          >
            {{ article.meta?.title }}
          </RouterLink>
        </li>
      </ul>
    </div>

    <div class="home__content">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss">
.home {
  display: grid;
  grid-template-columns: 300px 1fr;
  column-gap: 40px;
  min-height: 100%;

  &__sidebar {
    position: relative;
    padding: 20px 0;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      width: 1px;
      height: 100%;
      background-color: #e2e8f0;
    }
  }

  &__sidebar-title {
    font-size: 1.25rem;
    color: #2c3e50;
    margin-bottom: 1.5rem;
    padding: 0 12px;
    font-weight: 600;
  }

  &__menu {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  &__menu-item {
    margin-bottom: 0.5rem;
  }

  &__menu-link {
    display: block;
    padding: 0.75rem 12px;
    color: #4a5568;
    text-decoration: none;
    font-size: 1rem;
    transition: all 0.2s ease;
    border-radius: 4px;
    margin: 0 8px;

    &:hover {
      background-color: #f7fafc;
      color: #42b983;
    }

    &--active {
      background-color: #42b983;
      color: white;

      &:hover {
        background-color: darken(#42b983, 5%);
        color: white;
      }
    }
  }

  &__content {
    padding: 20px 0;
  }
}
</style>
