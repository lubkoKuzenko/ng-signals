import { ChangeDetectorRef, Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import gridConfig from './grid-config.json';
import { CommonModule } from '@angular/common';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDragPlaceholder,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

import { ResizableModule, ResizeEvent } from 'angular-resizable-element';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, ResizableModule, CdkDropListGroup, CdkDropList, CdkDrag, CdkDragPlaceholder],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  @ViewChildren('gridItem') gridItemsRef!: QueryList<ElementRef>;
  gridItems: any[] = [];

  backgroundColors = [
    'bg-red-200',
    'bg-blue-200',
    'bg-green-200',
    'bg-yellow-200',
    'bg-purple-200',
    'bg-pink-200',
    'bg-indigo-200',
    'bg-gray-200',
  ];
  textColors = [
    'text-red-700',
    'text-blue-700',
    'text-green-700',
    'text-yellow-700',
    'text-purple-700',
    'text-pink-700',
    'text-indigo-700',
    'text-gray-700',
  ];
  heights = ['h-32', 'h-48', 'h-24', 'h-40', 'h-64', 'h-28', 'h-36', 'h-56'];
  colSpans = [1, 2, 3, 4];

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.gridItems = gridConfig;
  }
  ngAfterViewInit() {
    this.saveInitialPositions();
  }

  addElement() {
    const randomBackgroundColor = this.backgroundColors[Math.floor(Math.random() * this.backgroundColors.length)];
    const randomTextColor = this.textColors[Math.floor(Math.random() * this.textColors.length)];
    const randomHeight = this.heights[Math.floor(Math.random() * this.heights.length)];
    const randomColSpan = this.colSpans[Math.floor(Math.random() * this.colSpans.length)];
    const randomText = `Element ${this.gridItems.length + 1}`; // Generate unique text

    this.gridItems.push({
      id: Math.random().toString(36).substring(2),
      backgroundColor: randomBackgroundColor,
      textColor: randomTextColor,
      height: randomHeight,
      colSpan: randomColSpan,
      text: randomText,
    });
  }

  saveInitialPositions() {
    this.gridItemsRef.forEach(item => {
      const el = item.nativeElement as HTMLElement;
      el.style.transition = 'none'; // Disable transition initially
      const rect = el.getBoundingClientRect();
      el.dataset['x'] = rect.left.toString();
      el.dataset['y'] = rect.top.toString();
    });
  }

  drop(event: CdkDragDrop<any, any>) {
    const { previousContainer, container } = event;
    console.log(previousContainer.data, container.data);
    if (previousContainer === container) {
      moveItemInArray(container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(previousContainer.data, container.data, event.previousIndex, event.currentIndex);
    }
    this.updateWidgetPositions(previousContainer, container);
  }

  updateWidgetPositions(previousContainer: CdkDropList<any>, container: CdkDropList<any>) {
    // find the index of previous container data and target container data inside gridItems.
    const prevIndex = this.gridItems.findIndex(item => item === previousContainer.data);
    const currentIndexGrid = this.gridItems.findIndex(item => item === container.data);
    // update the gridItems array by creating a new array.
    let newGridItems = [...this.gridItems];
    newGridItems[prevIndex] = container.data;
    newGridItems[currentIndexGrid] = previousContainer.data;
    this.gridItems = newGridItems;
  }

  reorderElements() {
    const previousPositions = new Map();

    // Save previous positions
    this.gridItemsRef.forEach(item => {
      const el = item.nativeElement as HTMLElement;
      const rect = el.getBoundingClientRect();
      previousPositions.set(el, { left: rect.left, top: rect.top });
    });

    // Shuffle items
    this.gridItems = [...this.gridItems.sort(() => Math.random() - 0.5)];

    // Wait for DOM update
    setTimeout(() => {
      this.gridItemsRef.forEach(item => {
        const el = item.nativeElement as HTMLElement;
        const rect = el.getBoundingClientRect();
        const prev = previousPositions.get(el);

        if (prev) {
          const deltaX = prev.left - rect.left;
          const deltaY = prev.top - rect.top;

          el.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
          el.style.transition = 'none'; // Disable transition during reposition

          requestAnimationFrame(() => {
            el.style.transform = 'translate(0, 0)';
            el.style.transition = 'transform 1s ease-in-out'; // Smooth move
          });
        }
      });
    });
  }
  logItem(item: any) {
    console.log(item);
    return '';
  }
}
