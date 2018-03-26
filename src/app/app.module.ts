import { AuthModule } from "./auth/auth.module";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Router } from "@angular/router";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";

import { TabsModule } from "ngx-bootstrap/tabs";
import { NgxGalleryModule } from "ngx-gallery";

import { AppComponent } from "./app.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { SignupComponent } from "./components/signup/signup.component";
import { HomeComponent } from "./components/home/home.component";
import { ListComponent } from "./components/list/list.component";
import { MessagesComponent } from "./components/messages/messages.component";
import { UserListComponent } from "./components/users/user-list/user-list.component";
import { UserViewComponent } from "./components/users/user-view/user-view.component";
import { UserDetailComponent } from "./components/users/user-detail/user-detail.component";
import { UserEditComponent } from "./components/users/user-edit/user-edit.component";
import { PhotoComponent } from "./components/users/photo/photo.component";

import { AuthService } from "./_services/auth.service";
import { AlertifyService } from "./_services/alertify.service";
import { UserService } from "./_services/user.service";

// import { appRoutes } from "./app.routes";
import { AuthGuard } from "./_guards/auth.guard";
import { UserResolver } from "./_resolvers/user.resolver";
import { UsersResolver } from "./_resolvers/users.resolver";
import { UserEditResolver } from "./_resolvers/user-edit.resolver";
import { PreventUnsavedChanges } from "./_guards/unsaved-changes.guard";
import { FileUploadModule } from "ng2-file-upload";
import { AppRoutingModule } from "./app.routes";

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
    UserDetailComponent,
    UserEditComponent,
    PhotoComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AuthModule,
    NgxGalleryModule,
    FileUploadModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    BsDatepickerModule.forRoot()
  ],
  providers: [
    AuthService,
    AlertifyService,
    AuthGuard,
    PreventUnsavedChanges,
    UserService,
    UserResolver,
    UsersResolver,
    UserEditResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
