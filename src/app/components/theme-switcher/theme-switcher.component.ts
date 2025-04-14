import { Component, inject } from '@angular/core';
import { GlobalStore } from '../../store/global.store';

@Component({
  selector: 'app-theme-switcher',
  imports: [],
  templateUrl: './theme-switcher.component.html',
  styleUrl: './theme-switcher.component.scss',
})
export class ThemeSwitcherComponent {
  public globalStore = inject(GlobalStore);

  toggleTheme() {
    this.globalStore.toggleTheme();
  }
}
