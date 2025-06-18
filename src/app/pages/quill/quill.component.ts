import { Component, AfterViewInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import Quill from 'quill';
import './custom-variable.blot';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-editor',
  imports: [RouterModule],
  templateUrl: './quill.component.html',
  styleUrl: './quill.component.scss',
})
export class EditorComponent implements AfterViewInit {
  constructor(private http: HttpClient) {}
  private quill!: Quill;

  ngAfterViewInit(): void {
    this.quill = new Quill('#editor', {
      theme: 'snow',
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline'],
          [{ 'align': '' }, { 'align': 'center' }, { 'align': 'right' }],
        ],
      },
    });
  }

  insertVariable(variable: string) {
    if (!this.quill) return;
    const range = this.quill.getSelection(true);
    this.quill.insertEmbed(range.index, 'variable', variable, 'user');
    this.quill.setSelection(range.index + 1, 0);
  }
  submit() {
    const html = this.quill.root.innerHTML;

    const values = {
      'Full Name': 'Vova',
      'Date': '01.01.2024',
      'Status': 'Active',
    };

    const result = this.replaceVariables(html, values);

    this.http.post('https://jsonplaceholder.typicode.com/posts', { text: result })
.subscribe(response => {
      console.log('Ответ от API:', response);
      alert('Done!');
    });
  }
  replaceVariables(html: string, values: Record<string, string>): string {
    return html.replace(/&lt;&lt;([\w\s]+)&gt;&gt;/g, (match, p1) => {
      const key = p1.trim();
      return values[key] || match;
    });
  }
} 
