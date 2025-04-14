import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ValidationMessageComponent } from '../../../components/validation-message';

@Component({
  selector: 'app-basic',
  imports: [ReactiveFormsModule, ValidationMessageComponent],
  templateUrl: './basic.component.html',
  styleUrl: './basic.component.scss',
})
export class BasicComponent implements OnInit {
  public form!: FormGroup;

  constructor() {}

  ngOnInit(): void {
    // Initialize the form with default values
    this.form = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.maxLength(3)]),
      lastName: new FormControl('', [Validators.required]),
    });
  }

  // Get access to form controls
  get controls() {
    return this.form.controls;
  }

  // Reset form
  public reset() {
    this.form.reset();
  }

  public onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value); // Raw form values
    } else {
      console.log('Form is invalid');
    }
  }
}
