import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Estudo · Câmara de Cuiabá',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
  },
  {
    path: 'disciplina/:id',
    title: 'Disciplina · Estudo',
    loadComponent: () => import('./pages/disciplina/disciplina').then((m) => m.Disciplina),
  },
  { path: '**', redirectTo: '' },
];
