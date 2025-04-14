import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';
import { TranslateModule } from '@ngx-translate/core';
import { ThemeSwitcherComponent } from '../theme-switcher/theme-switcher.component';
import { NavigationItem } from '../../configs';
import { NAVIGATION_CONFIG } from '../../app.config';

@Component({
  selector: 'app-navigation',
  imports: [RouterModule, TranslateModule, LanguageSwitcherComponent, ThemeSwitcherComponent],
  providers: [],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  navigationItems = inject<NavigationItem[]>(NAVIGATION_CONFIG);
}
