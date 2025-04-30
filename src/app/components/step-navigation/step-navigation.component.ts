import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-step-navigation',
  imports: [CommonModule],
  templateUrl: './step-navigation.component.html',
  styleUrl: './step-navigation.component.scss',
})
export class StepNavigationComponent {
  steps = [
    { label: 'Step 1', status: 'complete' },
    { label: 'Step 2', status: 'complete' },
    { label: 'Step 3', status: 'current' },
    { label: 'Step 4', status: 'upcoming' },
  ];
}
