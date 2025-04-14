import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarModule, CalendarView } from 'angular-calendar';

@Component({
  selector: 'app-calendar-header',
  imports: [CommonModule, FormsModule, CalendarModule],
  templateUrl: './calendar-header.component.html',
  styleUrl: './calendar-header.component.scss',
})
export class CalendarHeaderComponent {
  @Input() view!: CalendarView;
  @Input() viewDate!: Date;
  @Input() locale: string = 'en';
  @Output() viewChange = new EventEmitter<CalendarView>();
  @Output() viewDateChange = new EventEmitter<Date>();

  CalendarView = CalendarView;
}
