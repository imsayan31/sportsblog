import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddBlogComponent } from "./add-blog/add-blog.component";
import { AddCategoryComponent } from "./add-category/add-category.component";
import { CategoryComponent } from "./category/category.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { EditBlogComponent } from "./edit-blog/edit-blog.component";
import { EditCategoryComponent } from "./edit-category/edit-category.component";
import { ProfileComponent } from "./profile/profile.component";
import { SubscriptionComponent } from "./subscription/subscription.component";

const routes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "profile", component: ProfileComponent },
  { path: "subscription", component: SubscriptionComponent },
  { path: "add-blog", component: AddBlogComponent },
  { path: "edit-blog/:id", component: EditBlogComponent },
  { path: "categories", component: CategoryComponent },
  { path: "add-category", component: AddCategoryComponent },
  { path: "edit-category/:id", component: EditCategoryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyAccountRoutingModule {}
