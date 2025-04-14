import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PendingChangesService {
  confirmed$: BehaviorSubject<boolean | null> = new BehaviorSubject<boolean | null>(null);
  askForConfirmation$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  openConfirmation(): void {
    // cancel possible previous confirmation states
    this.confirmed$.next(null);
    // trigger opening dialog
    this.askForConfirmation$.next(true);
  }

  closeConfirmation(): void {
    // cancel possible previous confirmation states
    this.confirmed$.next(null);
    // close dialog
    this.askForConfirmation$.next(false);
  }

  confirm(): void {
    // confirm navigation
    this.confirmed$.next(true);
    // close dialog
    this.askForConfirmation$.next(false);
  }

  cancel(): void {
    // cancel navigation
    this.confirmed$.next(false);
    // close dialog
    this.askForConfirmation$.next(false);
  }
}
