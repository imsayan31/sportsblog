import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { TestSportsComponent } from "./test-sports/test-sports.component";
import { HomeComponent } from "./home/home.component";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { BlogsComponent } from "./blogs/blogs.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
} from "@angular/material";
import { BlogDetailsComponent } from "./blogs/blog-details/blog-details.component";
import { SpLoaderComponent } from "./sp-loader/sp-loader.component";
import { UserAuthModule } from "./user-auth/user-auth.module";
import { MyAccountModule } from "./my-account/my-account.module";
import { SharedModulesModule } from "./shared-modules/shared-modules.module";
/* import { CKEditorModule } from '@ckeditor/ckeditor5-angular'; */

@NgModule({
  declarations: [
    AppComponent,
    TestSportsComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    BlogsComponent,
    BlogDetailsComponent,
    SpLoaderComponent,
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
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    UserAuthModule,
    MyAccountModule,
    SharedModulesModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
