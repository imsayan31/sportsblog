import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MyAccountRoutingModule } from "./my-account-routing.module";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProfileComponent } from "./profile/profile.component";
import { SubscriptionComponent } from "./subscription/subscription.component";
import { UserSidebarComponent } from "./user-sidebar/user-sidebar.component";
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatSelectModule,
  MatSortModule,
  MatTableModule,
} from "@angular/material";
import { AddBlogComponent } from "./add-blog/add-blog.component";
import { EditBlogComponent } from "./edit-blog/edit-blog.component";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AddCategoryComponent } from "./add-category/add-category.component";
import { CategoryComponent } from "./category/category.component";
import { EditCategoryComponent } from "./edit-category/edit-category.component";
import { SharedModulesModule } from "../shared-modules/shared-modules.module";

@NgModule({
  declarations: [
    DashboardComponent,
    ProfileComponent,
    SubscriptionComponent,
    UserSidebarComponent,
    AddBlogComponent,
    EditBlogComponent,
    AddCategoryComponent,
    CategoryComponent,
    EditCategoryComponent,
  ],
  imports: [
    CommonModule,
    MyAccountRoutingModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModulesModule,
  ],
})
export class MyAccountModule {}
