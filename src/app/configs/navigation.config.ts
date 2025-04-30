export interface NavigationItem {
  label: string;
  routerLink: string;
  exact?: boolean; // Optional: for exact route matching
}

export const navigationConfig: NavigationItem[] = [
  { label: 'Dashboard', routerLink: '/', exact: true },
  { label: 'Chart', routerLink: '/chart' },
  { label: 'Resize', routerLink: '/resize' },
  { label: 'Forms', routerLink: '/forms' },
  { label: 'DnD', routerLink: '/dnd' },
  { label: 'Map', routerLink: '/map' },
  { label: 'Calendar', routerLink: '/calendar' },
  { label: 'Data Provider', routerLink: '/data-provider' },
  { label: 'Signal Store', routerLink: '/signal-store' },
  { label: 'Step Nav Demo', routerLink: '/step-navigation-demo' },
];
