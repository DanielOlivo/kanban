import { Component, inject } from '@angular/core';
import { Credentials, StateService } from '../state.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'sign-up-form',
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule,
    MatFormFieldModule, MatInputModule, MatButtonModule
  ],
  templateUrl: './sign-up-form.component.html',
  styleUrl: './sign-up-form.component.css'
})
export class SignUpFormComponent {
  private readonly state: StateService = inject(StateService)
  // private readonly route = inject(ActivatedRoute)
  private readonly router = inject(Router)

  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)])
  })

  async submit(){
    const value = this.form.value as Credentials
    await this.state.signup(value)

    this.router.navigate(['/signin'])
  }
}
