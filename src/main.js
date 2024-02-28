import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import InstruccionesComponent from './components/InstruccionesComponent.vue';
import VideosComponent from './components/VideosComponent.vue';

import 'bootstrap/dist/css/bootstrap.css';

const routes = [
  { path: '/', component: InstruccionesComponent },
  { path: '/videos', component: VideosComponent },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  // Redirigir a la página raíz si la ruta no es válida
  if (!to.matched.length) {
    next('/');
  } else {
    next();
  }
});

const app = createApp(App);
app.use(router);
app.mount('#app');
