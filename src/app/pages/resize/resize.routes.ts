import { Routes } from '@angular/router';
import { ResizeComponent } from './resize.component';
import { PendingChangesGuard } from '../../guards/pending-changes.guard';
import { DndRowsComponent } from './dnd-rows/dnd-rows.component';

export const resizeRoutes: Routes = [
  {
    path: '',
    component: DndRowsComponent,
    // component: ResizeComponent,
    canDeactivate: [PendingChangesGuard],
  },
];
