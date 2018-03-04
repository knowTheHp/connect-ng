import { AuthModule } from './auth/auth.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { ListComponent } from './components/list/list.component';
import { MessagesComponent } from './components/messages/messages.component';
import { UserListComponent } from './components/users/user-list/user-list.component';
import { UserViewComponent } from './components/users/user-view/user-view.component';
import { UserDetailComponent } from './components/users/user-detail/user-detail.component';

import { AuthService } from './_services/auth.service';
import { AlertifyService } from './_services/alertify.service';
import { UserService } from './_services/user.service';

import { appRoutes } from './app.routes';
import { AuthGuard } from './_guards/auth.guard';
import { UserResolver } from './_resolvers/user.resolver';
import { UsersResolver } from './_resolvers/users.resolver';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SignupComponent,
    HomeComponent,
    UserListComponent,
    ListComponent,
    MessagesComponent,
    UserViewComponent,
    UserDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    AuthModule,
    TabsModule.forRoot()
  ],
  providers: [AuthService, AlertifyService, AuthGuard, UserService, UserResolver, UsersResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
