import { createWebHistory, createRouter } from "vue-router";

  const routes =  [
    {
    path: "/",
    component: () => import('../components/login.vue'),
  },
  {
    path: "/home",
    component: () => import('../components/home.vue'),
  },
  {
    path: "/form",
    component: () => import('../components/form.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: routes,
  linkActiveClass: 'active'
})



export default router;