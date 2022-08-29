import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ProductsView from "@/views/ProductsView.vue";
import LoginView from "../views/LoginView.vue";
import NotFound from "../views/NotFound.vue";

import store from "../store/index.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/products",
      name: "products",
      component: ProductsView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
      meta: {
        requiresUnauth: true,
      },
    },
    {
      path: "/:notFound(.*)",
      name: "notfound",
      component: NotFound,
    },
  ],
});

router.beforeEach(function (to, _, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next("/login");
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next("/products");
  } else {
    next();
  }
});

export default router;
