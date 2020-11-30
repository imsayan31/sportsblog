import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestSportsComponent } from './test-sports/test-sports.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CategoryComponent } from './category/category.component';
import { BlogsComponent } from './blogs/blogs.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddCategoryComponent } from './add-category/add-category.component';
import { MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { LimitcharPipe } from './limitchar.pipe';
import { EditCategoryComponent } from './edit-category/edit-category.component';

@NgModule({
  declarations: [
    AppComponent,
    TestSportsComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    CategoryComponent,
    BlogsComponent,
    AddCategoryComponent,
    LimitcharPipe,
    EditCategoryComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
