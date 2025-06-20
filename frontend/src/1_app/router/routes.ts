import { type RouteRecordRaw } from "vue-router";

export const routes: readonly RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    meta: { title: "Справочник", isVisibleInHeader: true },
    component: () => import("@/pages/home"),
    children: [
      {
        path: "/article/faq",
        meta: { title: "Как пользоваться системой?" },
        component: async () => (await import("@/pages/home")).FAQ,
      },
    ],
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
  {
    path: "/results",
    name: "results",
    component: () => import("@/pages/results"),
    meta: { title: "Результаты", isVisibleInHeader: true },
    children: [
      {
        path: "/:id",
        name: "results-id",
        component: async () => (await import("@/pages/results")).ResultsId,
      },
    ],
  },
  {
    path: "/results/:id",
    name: "results-id",
    component: async () => (await import("@/pages/results")).ResultsId,
  },
];
