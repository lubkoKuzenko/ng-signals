import { computed, effect, inject, RendererFactory2 } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';

export enum Themes {
  LIGHT = 'light',
  DARK = 'dark',
}

export interface ThemeState {
  theme: Themes;
}

export const initialThemeState: ThemeState = {
  theme: Themes.LIGHT,
};

export const GlobalStore = signalStore(
  { providedIn: 'root' },
  withState(initialThemeState),
  withComputed(({ theme }) => ({
    theme: computed(() => theme()),
    isDarkTheme: computed(() => theme() === Themes.DARK),
    isLightTheme: computed(() => theme() === Themes.LIGHT),
  })),
  withMethods(({ theme, ...store }) => ({
    getTheme() {
      return theme();
    },
    toggleTheme() {
      patchState(store, {
        theme: theme() === Themes.LIGHT ? Themes.DARK : Themes.LIGHT,
      });
    },
    setTheme(theme: Themes) {
      patchState(store, { theme });
    },
  })),
  store => {
    const rendererFactory = inject(RendererFactory2);
    const renderer = rendererFactory.createRenderer(null, null);

    effect(() => {
      if (store.methods.getTheme() === Themes.DARK) {
        renderer.addClass(document.documentElement, 'dark');
      } else {
        renderer.removeClass(document.documentElement, 'dark');
      }
    });

    return store;
  },
);
