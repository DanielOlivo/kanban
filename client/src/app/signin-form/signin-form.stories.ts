import type { Meta, StoryObj } from "@storybook/angular";
import { SigninFormComponent } from "./signin-form.component";


const meta: Meta<SigninFormComponent> = {
  title: 'Auth/Signin',
  component: SigninFormComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
};

export default meta;
type Story = StoryObj<SigninFormComponent>;


export const Primary: Story = {}