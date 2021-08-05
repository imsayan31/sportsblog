import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { BlogService } from "src/app/blogs/blog.service";
import { SpLoaderService } from "src/app/sp-loader/sp-loader.service";
import { CategoryService } from "../category/category.service";

@Component({
  selector: "app-add-blog",
  templateUrl: "./add-blog.component.html",
  styleUrls: ["./add-blog.component.css"],
})
export class AddBlogComponent implements OnInit {
  addBlogForm: FormGroup;
  imagePreview: string = "../../assets/images/blog-default.png";
  blogFormData: any;
  getCategories: any;
  imagePreviewChecking: boolean = false;
  constructor(
    private blogService: BlogService,
    private router: Router,
    private categoryService: CategoryService,
    private spLoaderService: SpLoaderService
  ) {}

  ngOnInit() {
    this.spLoaderService.show();
    this.addBlogForm = new FormGroup({
      blog_title: new FormControl(null, { validators: [Validators.required] }),
      blog_category: new FormControl(null, {
        validators: [Validators.required],
      }),
      blog_desc: new FormControl(null, { validators: [Validators.required] }),
      blog_image: new FormControl(null, { validators: [Validators.required] }),
    });
    this.categoryService.fetchCategories(50, 0, "all").subscribe((catResp) => {
      this.spLoaderService.hide();
      this.getCategories = catResp.categories;
    });
  }

  onAddBlogSubmit() {
    this.imagePreviewChecking = true;
    if (this.addBlogForm.invalid) {
      return;
    }
    const blogData = new FormData();
    blogData.append("title", this.addBlogForm.value.blog_title);
    blogData.append("category", this.addBlogForm.value.blog_category);
    blogData.append("desc", this.addBlogForm.value.blog_desc);
    blogData.append(
      "blog_image",
      this.addBlogForm.value.blog_image,
      this.addBlogForm.value.blog_image.name
    );

    /* this.blogFormData = {
      title: this.addBlogForm.value.blog_title,
      desc: this.addBlogForm.value.blog_desc,
      blog_image: this.addBlogForm.value.blog_image
    }; */

    /* if (typeof (this.addBlogForm.value.blog_image)) {

    } else {
      this.blogFormData = {
        title: this.addBlogForm.value.blog_title,
        desc: this.addBlogForm.value.blog_desc,
        blog_image: this.addBlogForm.value.blog_image
      };
    } */
    this.spLoaderService.show();
    this.blogService.addBlog(blogData).subscribe(
      (addedBlog) => {
        this.spLoaderService.hide();
        if (addedBlog.status === 200) {
          this.router.navigate(["/blogs"]);
        }
      },
      (addBlogError) => {
        this.spLoaderService.hide();
        console.log(addBlogError);
      }
    );
  }

  onImageSelect(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.addBlogForm.patchValue({ blog_image: file });
    this.addBlogForm.get("blog_image").updateValueAndValidity();
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
  }
}
