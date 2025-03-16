import { createRouter, createWebHistory } from 'vue-router'

import { isAuthenticated } from '@/utils/cookies'

import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/auth/login',
      name: 'login',
      component: () => import("@/views/LoginView.vue"),
    },
  ],
})

router.beforeEach((to,_,next) => {
  if(to.meta.requiresAuth && !isAuthenticated()){
    next('auth/login');
  } else {
    next();
  }
})

export default router
