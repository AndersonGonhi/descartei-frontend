import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import PontoColetaForm from '../components/PontoColetaForm.vue';
import ResultadoPesquisa from '../components/ResultadoPesquisa.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/pontocoleta',
    name: 'PontoColetaForm',
    component: PontoColetaForm,
  },
  {
    path: '/resultados', // Defina a rota para a página de resultados
    name: 'resultados',
    component: ResultadoPesquisa,
    props: (route) => ({ cidade: route.query.cidade, estado: route.query.estado }) 
  }
];

const router = createRouter({
  history: createWebHistory(), // Modo "history" para URLs limpas
  routes,
});

export default router;
