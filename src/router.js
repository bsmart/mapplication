import Vue from "vue";
import Router from "vue-router";

import store from "./store";
import Map from "./views/Map.vue";
import Sources from "./views/Sources.vue";
import Layers from "./views/Layers.vue";

Vue.use(Router);

function requireAccessToken(to, from, next) {
  if (!store.state.map.accessToken) {
    next({
      path: "/settings"
    });
  } else {
    next();
  }
}

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/map"
    },
    {
      path: "/map",
      name: "map",
      component: Map,
      beforeEnter: requireAccessToken
    },
    {
      path: "/sources",
      name: "sources",
      component: Sources
    },
    {
      path: "/layers",
      name: "layers",
      component: Layers
    },
    {
      path: "/settings",
      name: "settings",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Settings.vue")
    }
  ]
});
