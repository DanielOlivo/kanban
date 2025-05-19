import type { Meta, StoryObj } from "@storybook/angular";
import { DeckComponent } from "./deck.component";
import { moduleMetadata } from "@storybook/angular";
import { getBoard, StateService } from "../state.service";

const meta: Meta<DeckComponent> = {
  title: 'Kanban/Deck',
  component: DeckComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<DeckComponent>;

const boards = [ getBoard() ]
const deck = boards[0].decks[0]

export const Pirmary: Story = {
    args: {
        deck
    },
    decorators: [
        moduleMetadata({
            providers: [
                {
                    provide: StateService,
                    useValue: {
                        username: '',
                        boards,
                        currentBoard: boards[0]
                    }
                }
            ]
        })
    ]
}