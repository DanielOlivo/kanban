import { applicationConfig, moduleMetadata, type Meta, type StoryObj } from "@storybook/angular";
import { ActivatedRoute, RouterModule, convertToParamMap, provideRouter, withComponentInputBinding, withHashLocation } from "@angular/router";
import { of } from'rxjs'
import { BoardComponent } from "./board.component";
import { faker } from '@faker-js/faker'
import { v4 as uuid } from 'uuid'
import { Note } from "../note";
import { Deck } from "../deck";
import { Board } from "../board";
import { getBoard, StateService } from "../state.service";
import { http, HttpResponse } from 'msw'
import { environment } from "../../environments/environment";
import { routes } from "../app.routes";

const mockActivatedRoute = (id: string) => ({
    paramMap: of({
        get: (key: string) => key === 'id' ? id : null,
        has: (key: string) => key === 'id'
    })
})


const someState = new StateService()

const meta: Meta<BoardComponent> = {
    title: 'Kanban/Board',
    component: BoardComponent,
    tags: ['autodocs'],
    decorators: [
        applicationConfig({
        // We need to provide the router for components that expect it
        // Even if we're not actually navigating, the component might inject Router or ActivatedRoute
        providers: [
            provideRouter([
                { path: 'board/:someId', component: BoardComponent },
                { path: '', component: BoardComponent }
            ]),
            {
                provide: ActivatedRoute,
                useValue: mockActivatedRoute('default-id-from-decorator') // Default ID for the component
            },
            {
                provide: StateService,
                useValue: someState
            }
        ],
        }),
        // This decorator allows us to override the ActivatedRoute for individual stories
        (story, context) => {
        const { parameters } = context;
        const boardId = parameters['boardId'] || 'default-story-id'; // Get boardId from story parameters

        // If a specific boardId is provided in story parameters, use it
        if (boardId) {
            return {
            template: story().template,
            props: story().props,
            // Override the ActivatedRoute provider for this specific story
            applicationConfig: {
                providers: [
                {
                    provide: ActivatedRoute,
                    useValue: mockActivatedRoute(boardId)
                }
                ]
            }
            };
        }
        return story();
        }
    ],
    parameters: {
        boardId: 'component-level-default'
    }
};

export default meta;
type Story = StoryObj<BoardComponent>;


const genNote = (): Note => ({
    id: '000',
    title: faker.lorem.words(),
    content: ''
})

const genDeck = (): Deck => ({
    id: uuid(),
    name: faker.lorem.word(),
    notes: Array.from({length: 4}, genNote)
})

const genBoard = (): Board => ({
    id: '00',
    name: faker.lorem.word(),
    decks: Array.from({length: 4}, genDeck)
})

const board = getBoard()

const baseUrl = environment.apiUrl
const state = new StateService()

export const Primary: Story = {
    decorators: [
        moduleMetadata({
            providers: [
                {
                    provide: StateService,
                    useValue: state
                },
            ], 
        }),
    ],
    parameters: {
        msw: {
            handlers: [
                http.get(new URL('/board/:id', baseUrl).href, async ({params}) => {
                    console.log('REQUEST for board')
                    return HttpResponse.json(board)
                }),
                http.put(new URL('/board/:id', baseUrl).href, async ({request, params}) => {
                    const { id } = params
                    const data = await request.json()
                    console.log('updating board with id ', id)
                    console.log('body ', data)
                    return new HttpResponse('success', {status: 200})
                })
            ]
        }
    }
}