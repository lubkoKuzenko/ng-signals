import { ChangeDetectionStrategy, Component, inject, Input, signal, OnInit } from '@angular/core';
import { JsonFormData, JsonFormControls } from './interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ValidationMessageComponent } from '../../../components/validation-message';

@Component({
  imports: [ReactiveFormsModule, ValidationMessageComponent],
  templateUrl: './dynamic-2.component.html',
  styleUrl: './dynamic-2.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dynamic2Component implements OnInit {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  public myForm: FormGroup = this.fb.group({});
  public jsonFormData = signal<JsonFormData | null>(null);

  ngOnInit(): void {
    this.http.get('/assets/form.json').subscribe(json => {
      this.jsonFormData.set(json as JsonFormData);
      this.createForm(json as JsonFormData);
    });
  }

  createForm(json: JsonFormData) {
    const controls = json.controls;

    for (const control of controls) {
      const validatorsToAdd = [];
      for (const [key, value] of Object.entries(control.validators)) {
        switch (key) {
          case 'min':
            validatorsToAdd.push(Validators.min(value));
            break;
          case 'max':
            validatorsToAdd.push(Validators.max(value));
            break;
          case 'required':
            if (value) {
              validatorsToAdd.push(Validators.required);
            }
            break;
          case 'requiredTrue':
            if (value) {
              validatorsToAdd.push(Validators.requiredTrue);
            }
            break;
          case 'email':
            if (value) {
              validatorsToAdd.push(Validators.email);
            }
            break;
          case 'minLength':
            validatorsToAdd.push(Validators.minLength(value));
            break;
          case 'maxLength':
            validatorsToAdd.push(Validators.maxLength(value));
            break;
          case 'pattern':
            validatorsToAdd.push(Validators.pattern(value));
            break;
          case 'nullValidator':
            if (value) {
              validatorsToAdd.push(Validators.nullValidator);
            }
            break;
          default:
            break;
        }
      }
      this.myForm.addControl(control.name, this.fb.control(control.value, validatorsToAdd));
    }
  }

  onSubmit() {
    console.log('Form valid: ', this.myForm.valid);
    console.log('Form values: ', this.myForm.value);
  }
}
