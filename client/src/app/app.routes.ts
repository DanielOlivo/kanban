import { Routes } from '@angular/router';
import { SignInPageComponent } from './sign-in-page/sign-in-page.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BoardsComponent } from './boards/boards.component';
import { BoardPageComponent } from './board-page/board-page.component';
import { RenderMode } from '@angular/ssr';

export const routes: Routes = [
    { 
        path: 'signin', 
        component: SignInPageComponent,
        title: 'Kanban: Sign in'
    },
    { 
        path: 'signup', 
        component: SignUpPageComponent,
        title: 'Kanban: Sign up'
    },
    { 
        path: '', 
        redirectTo: 'signin', 
        // redirectTo: 'boards',  // temp
        pathMatch: 'full' 
    },
    // { 
    //     path: '**', 
    //     component: PageNotFoundComponent,
    //     title: 'Kanban: Page not found'
    // },
    { 
        path: 'boards', 
        component: BoardsComponent,
        title: 'Boards'
    },

    // https://stackoverflow.com/questions/79547542/angular-19-ssr-the-detail-id-route-uses-prerendering-and-includes-parameters
    { 
        path: 'board/:id', 
        component: BoardPageComponent,
    }
];
