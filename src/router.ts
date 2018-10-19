import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login.vue";


Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: "/",
      name: "login",
      component: Login
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("./views/Profile.vue")
    },
    {
      path: "/users",
      name: "users",
      component: () => import("./views/Users.vue")
    },
    {
      path: "/userprofile/:id",
      name: "userprofile",
      component: () => import("./views/UserProfile.vue")
    }
  ]
});
