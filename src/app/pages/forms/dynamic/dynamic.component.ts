import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AbstractComponent } from '../../../abstractions';
import { ValidationMessageComponent } from '../../../components/validation-message';

interface FormField {
  uniqueId: string;
  key: string;
  type: string;
  name: string;
  props: {
    label: string;
    cssClass?: string;
    placeholder?: string;
    required?: boolean;
  };
}

@Component({
  selector: 'app-dynamic',
  imports: [ReactiveFormsModule, CommonModule, ValidationMessageComponent],
  templateUrl: './dynamic.component.html',
  styleUrl: './dynamic.component.scss',
})
export class DynamicComponent extends AbstractComponent implements OnInit {
  public formFields: FormField[] = [];
  public dynamicForm: FormGroup = new FormGroup({});
  private fb = inject(FormBuilder);

  ngOnInit(): void {
    this.formFields = this.activatedRoute.snapshot.data['formFields'];

    this.formFields.forEach(field => {
      const validators = field.props.required ? [Validators.required] : [];
      this.dynamicForm.addControl(field.name, this.fb.control('', validators));
    });
  }

  onSubmit(): void {
    if (this.dynamicForm.valid) {
      console.log(this.dynamicForm.value);
      // Handle form submission here
    } else {
      this.dynamicForm.markAllAsTouched();
    }
  }
}
