import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontPageLayoutComponent } from "../front-page-layout/front-page-layout.component";
import { SignUpFormComponent } from "../sign-up-form/sign-up-form.component";

@Component({
  selector: 'sign-up-page',
  standalone: true,
  imports: [CommonModule, FrontPageLayoutComponent, SignUpFormComponent],
  templateUrl: './sign-up-page.component.html',
  styleUrl: './sign-up-page.component.css'
})

export class SignUpPageComponent {

}
