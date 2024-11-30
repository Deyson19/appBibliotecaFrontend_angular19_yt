import { Routes } from '@angular/router';
import LayoutComponent from './pages/layout/layout.component';
import { ListPageComponent } from './pages/listPage/listPage.component';
import { UpsertComponent } from './pages/upsert/upsert.component';
import { PrestamoComponent } from './pages/prestamo/prestamo.component';
import { Error404Component } from './shared/error404/error404.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: ListPageComponent,
      },
      {
        path: 'nuevo',
        component: UpsertComponent,
      },
      {
        path: 'editar/:id',
        component: UpsertComponent,
      },
      {
        path: 'detalle/:id',
        component: PrestamoComponent,
      },
      {
        path: '**',
        component: Error404Component,
      },
    ],
  },
];
