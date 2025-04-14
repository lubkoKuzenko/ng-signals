import { Routes } from '@angular/router';
import { ResizeComponent } from './resize.component';
import { PendingChangesGuard } from '../../guards/pending-changes.guard';

export const resizeRoutes: Routes = [
  {
    path: '',
    component: ResizeComponent,
    canDeactivate: [PendingChangesGuard],
  },
];
