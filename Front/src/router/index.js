import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    name: "login",
    path: "/",
    component: () => import("@/views/Login.vue"),
  },
  {
    name: "profile",
    path: "/profile",
    component: () => import("@/views/Profile.vue"),
    meta: { needConnect: true },
  },
  {
    name: "forum",
    path: "/forum",
    component: () => import("@/views/Forum.vue"),
    meta: { needConnect: true },
  },
  {
    name: "postForm",
    path: "/postForm/:id(\\d+)",
    component: () => import("@/views/postForm.vue"),
    meta: { needConnect: true },
  },
  {
    name: "comForm",
    path: "/comForm/:id(\\d+)",
    component: () => import("@/views/comForm.vue"),
    meta: { needConnect: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  // to route vers laquelle tu veux aller / From d'ou tu viens / next est un callback fonction ( fonction qui re-dirige )
  if (to.meta.needConnect) {
    if (!localStorage.getItem("token")) {
      next({
        name: "login",
      });
    } else {
      fetch(process.env.VUE_APP_BASE_API + "auth/checkToken", {
        method: "GET",
        headers: {
          Authorization: "bearer: " + localStorage.getItem("token"),
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          if (data.message == true) {
            next();
          } else {
            next({
              name: "login",
            });
          }
        });
    }
  } else {
    next()
  }
});
export default router;
