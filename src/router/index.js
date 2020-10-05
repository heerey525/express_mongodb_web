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
          path: "/goods",
          name: "goods",
          component: () => import("@/components/Goods"),
        },
        {
          path: "/other",
          name: "other",
          component: () => import("@/components/Other"),
        },
        {
          path: "/lang",
          name: "lang",
          component: () => import("@/components/Lang"),
        }
      ],
    },
  ],
});
const LOGIN_PAGE_NAME = "login";
const HOME_PAGE_NAME = "welcome";
const token = window.sessionStorage.getItem("token");
router.beforeEach((to, from, next) => {
  if (!token && to.name != LOGIN_PAGE_NAME) {
    next({ name: LOGIN_PAGE_NAME });
  } else if (!token && to.name == LOGIN_PAGE_NAME) {
    next();
  } else if (token && to.name == LOGIN_PAGE_NAME) {
    next()
  } else if (token && to.name == HOME_PAGE_NAME) {
    next()
  } else {
    next();
  }
});

export default router;
