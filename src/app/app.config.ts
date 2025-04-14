import {
  ApplicationConfig,
  importProvidersFrom,
  InjectionToken,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DndModule } from 'ngx-drag-drop';

import { routes } from './app.routes';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { navigationConfig } from './configs';

const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (http: HttpClient) =>
  new TranslateHttpLoader(http, './i18n/', '.json');

export const NAVIGATION_CONFIG = new InjectionToken<unknown>('NavigationConfig');

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(HttpClient),
    importProvidersFrom(BrowserAnimationsModule),
    importProvidersFrom([
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: httpLoaderFactory,
          deps: [HttpClient],
        },
      }),
    ]),
    importProvidersFrom(
      CalendarModule.forRoot({
        provide: DateAdapter,
        useFactory: adapterFactory,
      }),
    ),
    {
      provide: NAVIGATION_CONFIG,
      useValue: navigationConfig,
    },
    importProvidersFrom(DndModule),
    provideStore(),
  ],
};
