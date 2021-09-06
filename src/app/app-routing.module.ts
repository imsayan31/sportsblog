import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BlogDetailsComponent } from "./blogs/blog-details/blog-details.component";
import { BlogsComponent } from "./blogs/blogs.component";
import { HomeComponent } from "./home/home.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: "blogs",
    children: [
      { path: "", component: BlogsComponent },
      { path: ":id", component: BlogDetailsComponent, pathMatch: "full" },
    ],
  },
  {
    path: "my-account",
    loadChildren: () =>
      import("./my-account/my-account.module").then((m) => m.MyAccountModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
