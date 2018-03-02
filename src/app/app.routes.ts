import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ListComponent } from './components/list/list.component';
import { MessagesComponent } from './components/messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';
import { UserListComponent } from './components/users/user-list/user-list.component';

export const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    {
        path: '', runGuardsAndResolvers: 'always', canActivate: [AuthGuard], children: [
            { path: 'users', component: UserListComponent },
            { path: 'lists', component: ListComponent },
            { path: 'messages', component: MessagesComponent },
        ]
    },
    { path: '**', redirectTo: 'home', pathMatch: 'full' }
]