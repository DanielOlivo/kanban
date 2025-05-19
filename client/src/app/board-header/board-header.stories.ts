import type { Meta, StoryObj } from "@storybook/angular";
import { BoardHeaderComponent } from "./board-header.component";
import { faker } from "@faker-js/faker";
import { getBoard, StateService } from "../state.service";
import { moduleMetadata } from "@storybook/angular";

const meta: Meta<BoardHeaderComponent> = {
  title: 'Kanban/BoardHeader',
  component: BoardHeaderComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<BoardHeaderComponent>;


const boards = [ getBoard() ]

export const Primary: Story = {
  decorators: [
    moduleMetadata({
      providers: [
        {
          provide: StateService,
          useValue: {
            username: 'dude',
            boards,
            currentBoard: boards[0]
          }
        }
      ]
    })
  ]
}