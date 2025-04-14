import { Component, inject } from '@angular/core';
import { Store } from './store/store';

@Component({
  selector: 'app-signal-store',
  templateUrl: './signal-store.component.html',
  styleUrl: './signal-store.component.scss',
  providers: [Store],
})
export class SignalStoreComponent {
  store = inject(Store);

  ngOnInit() {
    this.store.loadBooks();
    this.store.loadMovies();
  }
}
