import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, NgForm, Validators, FormsModule, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatButtonModule } from '@angular/material/button';
import { Credentials, StateService } from '../state.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'signin-form',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './signin-form.component.html',
  styleUrl: './signin-form.component.css'
})

export class SigninFormComponent {

  private readonly state: StateService = inject(StateService)
  // private readonly route = inject(ActivatedRoute)
  private readonly router = inject(Router)

  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)])
  })


  async submit(){
    const value = this.form.value as Credentials
    console.log('credentials ', value)
    await this.state.signin(value)

    console.log('navigating...')
    this.router.navigate(['/boards'])
  }
}
