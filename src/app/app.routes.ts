import { Routes, RouterModule, Router } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { ListComponent } from "./components/list/list.component";
import { MessagesComponent } from "./components/messages/messages.component";
import { AuthGuard } from "./_guards/auth.guard";
import { UserListComponent } from "./components/users/user-list/user-list.component";
import { UserDetailComponent } from "./components/users/user-detail/user-detail.component";
import { UserResolver } from "./_resolvers/user.resolver";
import { UsersResolver } from "./_resolvers/users.resolver";
import { UserEditComponent } from "./components/users/user-edit/user-edit.component";
import { UserEditResolver } from "./_resolvers/user-edit.resolver";
import { PreventUnsavedChanges } from "./_guards/unsaved-changes.guard";
import { NgModule } from "@angular/core";

const routes: Routes = [
  { path: "home", component: HomeComponent },
  {
    path: "",
    runGuardsAndResolvers: "always",
    canActivate: [AuthGuard],
    children: [
      {
        path: "users",
        component: UserListComponent,
        resolve: { users: UsersResolver }
      },
      {
        path: "users/:id",
        component: UserDetailComponent,
        resolve: { user: UserResolver }
      },
      {
        path: "user/:id",
        component: UserEditComponent,
        resolve: { user: UserEditResolver },
        canDeactivate: [PreventUnsavedChanges]
      },
      { path: "lists", component: ListComponent },
      { path: "messages", component: MessagesComponent }
    ]
  },
  { path: "**", redirectTo: "home", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
