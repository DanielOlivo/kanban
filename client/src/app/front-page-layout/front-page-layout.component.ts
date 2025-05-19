import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninFormComponent } from '../signin-form/signin-form.component';
import { SignUpFormComponent } from '../sign-up-form/sign-up-form.component';


// type State = 'signin' | 'signup'

@Component({
  selector: 'front-page-layout',
  imports: [CommonModule],
  templateUrl: './front-page-layout.component.html',
  styleUrl: './front-page-layout.component.css'
})

export class FrontPageLayoutComponent {
  
  // state: State = 'signin'
}
