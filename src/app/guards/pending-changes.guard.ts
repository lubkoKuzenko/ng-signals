import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { first, Observable, of } from 'rxjs';
import { PendingChangesService } from '../services/pending-changes.service';

export interface ComponentCanDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}

@Injectable({
  providedIn: 'root',
})
export class PendingChangesGuard implements CanDeactivate<ComponentCanDeactivate> {
  constructor(private service: PendingChangesService) {}

  canDeactivate(component: ComponentCanDeactivate) {
    if (component.canDeactivate()) {
      this.service.closeConfirmation();
      return of(true);
    }

    this.service.openConfirmation();
    return this.service.confirmed$.pipe(first(v => v !== null)) as Observable<boolean>;
  }
}
