import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/components/Home";
// import Home from ''

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: "/", redirect: "/login" },
    {
      path: "/login",
      name: "login",
      component: () => import("@/components/Login"),
    },
    {
      path: "/home",
      component: Home,
      redirect: "/welcome",
      children: [
        {
          path: "/welcome",
          name: "welcome",
          component: () => import("@/components/Welcome"),
        },
        {
          path: "/users",
          name: "users",
          component: () => import("@/components/users/Users"),
        },
        {
          path: "/roles",
          name: "roles",
          component: () => import("@/components/roles/Roles"),
        },
        {
          path: "/permits",
          name: "permits",
          component: () => import("@/components/permits/Permits"),
        },
        {
          path: "/goods",
          name: "goods",
          component: () => import("@/components/goods/Goods"),
        },
        {
          path: "/other",
          name: "other",
          component: () => import("@/components/others/Other"),
        },
        {
          path: "/lang",
          name: "lang",
          component: () => import("@/components/langs/Lang"),
        }
      ],
    },
    { path: "*", name: "*", component: () => import("@/components/404"), },
  ],
});
const LOGIN_PAGE_NAME = "login";
const HOME_PAGE_NAME = "welcome";

router.beforeEach((to, from, next) => {
  const token = window.sessionStorage.getItem("token");
  if (!token && to.name != LOGIN_PAGE_NAME) {
    next({ name: LOGIN_PAGE_NAME });
  } else {
    next();
  }
});

export default router;
