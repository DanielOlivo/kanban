import type { Meta, StoryObj } from "@storybook/angular";
import { moduleMetadata } from "@storybook/angular";
import { BoardPageComponent } from "./board-page.component";
import { getBoard, getDeck, StateService } from "../state.service";
import { faker } from "@faker-js/faker";

const meta: Meta<BoardPageComponent> = {
  title: 'Kanban/BoardPage',
  component: BoardPageComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<BoardPageComponent>;

const boards = [ getBoard() ]
const currentBoard = boards[0]
currentBoard.decks.push( getDeck() )
currentBoard.decks.push( getDeck() )

export const Primary: Story = {
    decorators: [
        moduleMetadata({
            providers: [
                {
                    provide: StateService,
                    useValue: {
                        username: faker.internet.username(),
                        boards,
                        currentBoard: boards[0]
                    }
                }
            ]
        })
    ]
}