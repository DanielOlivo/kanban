current state

- making backend
- ![writing test for board router](./server/src/routes/board.router.test.ts)
    - encounter error at 'add deck to board'
      - because id is undefined; on creating new item should return id
      - I've reached my copilot quota, lol
      - failing at getting item by id. I need to test it with playground
      - don't mess Object with ObjectId
    - for current stage I think it's done, all user related stuff will be added later
- client: set redirect to boards page
- fetched from server
- deck component
  - reordering across one deck is fixed
  - create new note 
  - forget for instant focus for now
- board component: make use of deck component
- setup msw
- endpoint to get list of boards
  - test case
- boards page loads names  
- boards-page stories
  - error with getting list: HttpResponse.json !!!
- boards: some styling
  - fixing href
- to enable components with routerLink in storybook:
  ```
    applicationConfig({
      providers: [
        provideRouter([], withHashLocation())
      ]
    }),
  ```
- fetch board
- how to rename field in Mongo?
- mat-sidenav - fix behaviour in board page: remove mode property
- where is deck's name? (field name mismatch: title vs name)
- sign in: return token
- express: auth middleware
- fixing board.router.ts test: pay attention to which fields you are updating
- sign in page
- you cannot insert item in empty list !!!:
  - set minimum size to fix this issue

== NOW ==
https://stackblitz.com/edit/angular-material-context-menu?file=app%2Fcontext-menu-example.html

== LATER ==
- create note: focus on newly created note

== requests for copilot ==

Angular, storybook: I have a component which should be opened at route '/board/<someId>'. The component is fetching <someId> and use it in its own logic. 
Also this component uses injected service.
I want to put this component into the storybook, how to do that with decorators, applicationConfig, provideRouter?
Keep in mind that RouterTestingModule is deprecated