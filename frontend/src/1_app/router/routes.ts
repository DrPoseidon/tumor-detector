import { type RouteRecordRaw } from "vue-router";

export const routes = [
  {
    path: "/",
    name: "home",
    meta: { title: "Главная", isVisibleInHeader: true },
    component: () => import("@/pages/home"),
  },
  {
    path: "/photo-upload",
    name: "photo-upload",
    meta: { title: "Загрузка изображений", isVisibleInHeader: true },
    component: () => import("@/pages/photo-upload"),
  },
  {
    path: "/preprocessing",
    name: "preprocessing",
    meta: { title: "Предобработка", isVisibleInHeader: true },
    component: () => import("@/pages/preprocessing"),
  },
  {
    path: "/classification",
    name: "classification",
    meta: { title: "Классификация", isVisibleInHeader: true },
    component: () => import("@/pages/classification"),
    children: [],
  },
  {
    path: "/classification/:id",
    name: "classification-id",
    component: async () =>
      (await import("@/pages/classification")).ClassificationId,
  },
] satisfies Readonly<RouteRecordRaw[]>;
