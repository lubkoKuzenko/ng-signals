import { Routes } from '@angular/router';
import { FormsComponent } from './forms.component';
import { BasicComponent } from './basic/basic.component';
import { NestedComponent } from './nested/nested.component';
import { DynamicComponent } from './dynamic/dynamic.component';
import { Dynamic2Component } from './dynamic-2/dynamic-2.component';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const formFieldsData: any[] = [
  {
    uniqueId: 1,
    key: 'text',
    type: 'input',
    name: 'first-name',
    props: {
      label: 'First Name',
      placeholder: 'First Name',
      required: true,
      cssClass: 'col-50',
    },
  },
  {
    uniqueId: 2,
    key: 'text',
    type: 'input',
    name: 'last-name',
    props: {
      label: 'Last Name',
      placeholder: 'Last Name',
      required: false,
      cssClass: 'col-50',
    },
  },
  {
    uniqueId: 4,
    key: 'text',
    type: 'input',
    name: 'full-name',
    props: {
      label: 'full Name',
      placeholder: 'full Name',
      required: false,
      cssClass: 'col-50',
    },
  },
  {
    uniqueId: 3,
    key: 'whyNot',
    type: 'textarea',
    name: 'comment',
    props: {
      label: 'Why Not?',
      cssClass: 'col-100',
      placeholder: 'Type in here... I dare you',
    },
  },
];

export const formsRoutes: Routes = [
  {
    path: '',
    component: FormsComponent,
    children: [
      { path: 'basic', component: BasicComponent },
      { path: 'nested', component: NestedComponent },
      {
        path: 'dynamic',
        component: DynamicComponent,
        data: { formFields: formFieldsData },
      },
      { path: 'dynamic-2', component: Dynamic2Component },
      { path: '', redirectTo: 'basic', pathMatch: 'full' },
    ],
  },
];
