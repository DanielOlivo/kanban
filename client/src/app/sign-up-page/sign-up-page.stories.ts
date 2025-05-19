import { moduleMetadata, type Meta, type StoryObj } from "@storybook/angular";
import { FrontPageLayoutComponent } from "../front-page-layout/front-page-layout.component";
import { SignUpFormComponent } from "../sign-up-form/sign-up-form.component";
import { SignUpPageComponent } from "./sign-up-page.component";
import { CommonModule } from "@angular/common";

const meta: Meta<SignUpPageComponent> = {
  title: 'Auth/SignUpPage',
  component: SignUpPageComponent,
  tags: ['autodocs'],
  decorators: [
        moduleMetadata({
            imports: [CommonModule, FrontPageLayoutComponent, SignUpFormComponent],
        })
  ]
};

export default meta;
type Story = StoryObj<SignUpPageComponent>;

export const Primary: Story = {}