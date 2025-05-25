import { Component } from '@angular/core';
import { SignUpFormComponent } from "../sign-up-form/sign-up-form.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sign-up-page',
  standalone: true,
  imports: [CommonModule, SignUpFormComponent],
  templateUrl: './sign-up-page.component.html',
  styleUrl: './sign-up-page.component.css'
})

export class SignUpPageComponent {

}
