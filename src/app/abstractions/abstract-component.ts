import { inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

export abstract class AbstractComponent {
  protected readonly router = inject(Router);
  protected readonly activatedRoute = inject(ActivatedRoute);

  protected readonly _loading$ = new BehaviorSubject<boolean>(true);
  protected readonly loading$ = this._loading$.asObservable();
}
