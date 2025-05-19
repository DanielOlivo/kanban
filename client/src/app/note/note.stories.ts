import type { Meta, StoryObj } from "@storybook/angular";
import { NoteComponent } from "./note.component";

const meta: Meta<NoteComponent> = {
  title: 'Kanban/Note',
  component: NoteComponent,
  tags: ['autodocs'],
  
};

export default meta;
type Story = StoryObj<NoteComponent>;

export const Primary: Story = {
    args: {
        note: {
            id: '0',
            title: "I'm the note",
            content: ''
        },
        onEdit: false
    }
}