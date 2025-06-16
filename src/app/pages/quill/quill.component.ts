import { Component, AfterViewInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import Quill from 'quill';

@Component({
  selector: 'app-editor',
  imports: [RouterModule],
  templateUrl: './quill.component.html',
  styleUrl: './quill.component.scss',
})
export class EditorComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    const quill = new Quill('#editor', {
      theme: 'snow',
      modules: {
        toolbar: true,
      },
    });
  }
}
