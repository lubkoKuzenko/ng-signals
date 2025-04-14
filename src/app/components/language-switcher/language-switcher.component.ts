import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../services';

@Component({
  selector: 'app-language-switcher',
  imports: [CommonModule, TranslateModule],
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.scss',
})
export class LanguageSwitcherComponent {
  languageService = inject(LanguageService);
  translate = inject(TranslateService);

  useLanguage(language: string): void {
    this.languageService.setLanguage(language);
  }
}
