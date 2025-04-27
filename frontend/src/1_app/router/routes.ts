import { type RouteRecordRaw } from "vue-router";

export const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/pages/home"),
  },
  {
    path: "/preprocessing",
    name: "preprocessing",
    component: () => import("@/pages/preprocessing"),
  },
  {
    path: "/classification",
    name: "classification",
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
