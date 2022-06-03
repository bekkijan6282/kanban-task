import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: "/kanban",
    name: "KanbanIndex",
    component: () => import("../views/kanban/index.vue"),
  },
]

const router = new VueRouter({
  routes,
  mode: "history",
})

export default router
