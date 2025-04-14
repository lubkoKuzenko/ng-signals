import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly LANGUAGE_KEY = 'language';

  constructor(private translate: TranslateService) {
    this.initLanguage();
  }

  private initLanguage(): void {
    const storedLanguage = localStorage.getItem(this.LANGUAGE_KEY);
    const defaultLanguage = this.translate.defaultLang || 'en';

    const language = storedLanguage || defaultLanguage;

    this.setLanguage(language);
  }

  setLanguage(language: string): void {
    this.translate.use(language);
    localStorage.setItem(this.LANGUAGE_KEY, language);
  }

  getCurrentLanguage(): string {
    return this.translate.currentLang;
  }
}
