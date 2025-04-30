import { Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ChartComponent } from './pages/chart/chart.component';
import { SignalStoreComponent } from './pages/signal-store/signal-store.component';
import { StepNavigationDemoComponent } from './pages/step-navigation-demo/step-navigation-demo.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'chart', component: ChartComponent },
  {
    path: 'forms',
    loadChildren: () => import('./pages/forms/forms.routes').then(m => m.formsRoutes),
  },
  {
    path: 'resize',
    loadChildren: () => import('./pages/resize/resize.routes').then(m => m.resizeRoutes),
  },
  {
    path: 'calendar',
    loadChildren: () => import('./pages/calendar/calendar.routes').then(m => m.calendarRoutes),
  },
  {
    path: 'dnd',
    loadChildren: () => import('./pages/dnd/dnd.routes').then(m => m.dndRoutes),
  },
  {
    path: 'map',
    loadChildren: () => import('./pages/google-map/google-map.routes').then(m => m.mapRoutes),
  },
  {
    path: 'data-provider',
    loadChildren: () => import('./pages/data-provider/data-provider.routes').then(m => m.dataProviderRoutes),
  },
  { path: 'signal-store', component: SignalStoreComponent },
  { path: 'step-navigation-demo', component: StepNavigationDemoComponent },
  { path: '**', component: NotFoundComponent },
];
