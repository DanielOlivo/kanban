import type { Meta, StoryObj } from "@storybook/angular";
import { BoardsComponent } from "./boards.component";

const meta: Meta<BoardsComponent> = {
  title: 'Kanban/Boards',
  component: BoardsComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  }
};

export default meta;
type Story = StoryObj<BoardsComponent>;

export const Primary: Story = {}