import { Routes } from '@angular/router';
import { DataProviderComponent } from './data-provider.component';

export const dataProviderRoutes: Routes = [
  {
    path: '',
    component: DataProviderComponent,
  },
  {
    path: ':userId',
    component: DataProviderComponent,
  },
];
