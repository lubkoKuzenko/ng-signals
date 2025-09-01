import { ChangeDetectionStrategy, Component, inject, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ValidationMessageComponent } from '../../../components/validation-message';
import { LayoutItemConfig } from '../resize.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-viewer',
  imports: [CommonModule, ReactiveFormsModule, ValidationMessageComponent],
  templateUrl: './viewer.component.html',
  styleUrl: './viewer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewerComponent implements OnInit {
  @Input() layoutConfig: LayoutItemConfig[][] = [];

  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  public myForm: FormGroup = this.fb.group({});

  ngOnInit(): void {
    this.createForm(this.layoutConfig.flat());
  }

  createForm(json: LayoutItemConfig[]) {
    for (const control of json) {
      const validatorsToAdd = [];
      for (const [key, value] of Object.entries(control.validators)) {
        switch (key) {
          case 'min':
            validatorsToAdd.push(Validators.min(value as number));
            break;
          case 'max':
            validatorsToAdd.push(Validators.max(value as number));
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
            validatorsToAdd.push(Validators.minLength(value as number));
            break;
          case 'maxLength':
            validatorsToAdd.push(Validators.maxLength(value as number));
            break;
          case 'pattern':
            validatorsToAdd.push(Validators.pattern(value as unknown as string | RegExp));
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
      this.myForm.addControl(control.name, this.fb.control(control.name, validatorsToAdd));
    }
  }

  onSubmit() {
    console.log('Form valid: ', this.myForm.valid);
    console.log('Form values: ', this.myForm.value);
  }
}
