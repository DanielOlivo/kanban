import { componentWrapperDecorator, moduleMetadata, type Meta, type StoryObj } from "@storybook/angular";
import { SignInPageComponent } from "./sign-in-page.component";
import { FrontPageLayoutComponent } from "../front-page-layout/front-page-layout.component";
import { SigninFormComponent } from "../signin-form/signin-form.component";
import { CommonModule } from "@angular/common";

const meta: Meta<SignInPageComponent> = {
  title: 'Auth/SignInPage',
  component: SignInPageComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  decorators: [
    componentWrapperDecorator((story) => `<div style="width: 600px;">${story}</div>`),
        moduleMetadata({
            imports: [CommonModule, FrontPageLayoutComponent, SigninFormComponent],
        })
  ]
};

export default meta;
type Story = StoryObj<SignInPageComponent>;

export const Primary: Story = {}