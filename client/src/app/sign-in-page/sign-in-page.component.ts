import { Component } from '@angular/core';
import { FrontPageLayoutComponent } from "../front-page-layout/front-page-layout.component";
import { SigninFormComponent } from "../signin-form/signin-form.component";

@Component({
  selector: 'sign-in-page',
  standalone: true,
  imports: [SigninFormComponent],
  templateUrl: './sign-in-page.component.html',
  styleUrl: './sign-in-page.component.css'
})
export class SignInPageComponent {

}
