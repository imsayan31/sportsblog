import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCategoryComponent } from './add-category/add-category.component';
import { BlogsComponent } from './blogs/blogs.component';
import { CategoryComponent } from './category/category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'categories', component: CategoryComponent},
  { path: 'add-category', component: AddCategoryComponent},
  { path: 'edit-category/:id', component: EditCategoryComponent},
  { path: 'blogs', component: BlogsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
