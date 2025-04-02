import { type RouteRecordRaw } from "vue-router";

export const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/home')
  }
] satisfies Readonly<RouteRecordRaw[]>
