import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ListComponent } from './components/list/list.component';
import { MessagesComponent } from './components/messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';
import { UserListComponent } from './components/users/user-list/user-list.component';
import { UserDetailComponent } from './components/users/user-detail/user-detail.component';
import { UserResolver } from './_resolvers/user.resolver';
import { UsersResolver } from './_resolvers/users.resolver';

export const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    {
        path: '', runGuardsAndResolvers: 'always', canActivate: [AuthGuard], children: [
            { path: 'users', component: UserListComponent, resolve: { users: UsersResolver } },
            { path: 'users/:id', component: UserDetailComponent, resolve: { user: UserResolver } },
            { path: 'lists', component: ListComponent },
            { path: 'messages', component: MessagesComponent },
        ]
    },
    { path: '**', redirectTo: 'home', pathMatch: 'full' }
]