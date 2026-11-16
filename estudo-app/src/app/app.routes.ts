import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Estudo · Câmara de Cuiabá',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
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
