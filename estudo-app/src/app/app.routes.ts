import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Estudo · Câmara de Cuiabá',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
  },
  {
    path: 'edital',
    title: 'Edital verticalizado · Estudo',
    loadComponent: () => import('./pages/edital/edital').then((m) => m.Edital),
  },
  {
    path: 'cronograma',
    title: 'Cronograma · Estudo',
    loadComponent: () => import('./pages/cronograma/cronograma').then((m) => m.Cronograma),
  },
  {
    path: 'simulado',
    title: 'Simulados · Estudo',
    loadComponent: () => import('./pages/simulado/simulado').then((m) => m.Simulado),
  },
  {
    path: 'desempenho',
    title: 'Desempenho · Estudo',
    loadComponent: () => import('./pages/desempenho/desempenho').then((m) => m.Desempenho),
  },
  {
    path: 'guia',
    title: 'Guia do concurso · Estudo',
    loadComponent: () => import('./pages/guia/guia').then((m) => m.Guia),
  },
  {
    path: 'disciplina/:id',
    title: 'Disciplina · Estudo',
    loadComponent: () => import('./pages/disciplina/disciplina').then((m) => m.Disciplina),
  },
  { path: '**', redirectTo: '' },
];
