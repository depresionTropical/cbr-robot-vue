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

// Agregar un manejador de eventos para manejar la recarga de página
window.addEventListener('beforeunload', (event) => {
  // Obtener la ruta actual
  const currentPath = window.location.pathname;
  const currentSearch = window.location.search;

  // Redirigir a la página raíz solo si la ruta actual es '/videos' sin parámetros de consulta
  if (currentPath === '/videos' && currentSearch === '') {
    window.location.href = '/';
    event.preventDefault();
  }
});


const app = createApp(App);
app.use(router);
app.mount('#app');
