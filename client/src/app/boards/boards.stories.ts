import { applicationConfig, moduleMetadata, type Meta, type StoryObj } from "@storybook/angular";
import { componentWrapperDecorator } from "@storybook/angular";
import { RouterTestingModule} from '@angular/router/testing'
import { provideRouter, RouterModule, withHashLocation } from "@angular/router";
import { BoardsComponent } from "./boards.component";
import { environment } from "../../environments/environment";
import { StateService } from "../state.service";
import { http, HttpResponse } from 'msw'
import { v4 as uuid } from 'uuid'
import { faker } from "@faker-js/faker";
import { BoardComponent } from "../board/board.component";

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

const baseUrl = environment.apiUrl
const state = new StateService()


export const Primary: Story = {
  decorators: [
    // (Story) => ({
    //   template: `<div><story /></div>`
    // }),
    applicationConfig({
      providers: [
        provideRouter([], withHashLocation())
      ]
    }),
    componentWrapperDecorator((story) => `<div style='width: 500px;'>${story}</div>`),
    moduleMetadata({
      providers: [
        {
          provide: StateService,
          useValue: state
        }
      ],
    }),
  ],
  parameters: {
    msw: {
      handlers: [
        http.get(new URL('/board/names', baseUrl).href, async () => {
          const response = Array.from({length: 4}, () => ({
            _id: uuid(),
            name: faker.lorem.word()
          }))
          console.log('MSW get list: ', response)
          return HttpResponse.json(response)
        })
      ]
    }
  }
}