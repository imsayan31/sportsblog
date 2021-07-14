import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/category/category.service';
import { SpLoaderService } from 'src/app/sp-loader/sp-loader.service';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent implements OnInit {
  addBlogForm: FormGroup;
  imagePreview: string;
  blogFormData: any;
  getCategories: any;
  constructor(
    private blogService: BlogService, 
    private router: Router, 
    private categoryService: CategoryService,
    private spLoaderService: SpLoaderService
    ) { }

  ngOnInit() {
    this.spLoaderService.show();
    this.addBlogForm = new FormGroup({
      blog_title: new FormControl(null, { validators: [Validators.required ]}),
      blog_category: new FormControl(null, { validators: [Validators.required ]}),
      blog_desc: new FormControl(null, { validators: [Validators.required ]}),
      blog_image: new FormControl(null, { validators: [Validators.required ] })
    });
    this.categoryService.fetchCategories().subscribe(catResp => {
      this.spLoaderService.hide();
      this.getCategories = catResp.categories;
    });
  }

  onAddBlogSubmit() {
    if (this.addBlogForm.invalid) {
      return;
    }
    const blogData = new FormData();
    blogData.append('title', this.addBlogForm.value.blog_title);
    blogData.append('category', this.addBlogForm.value.blog_category);
    blogData.append('desc', this.addBlogForm.value.blog_desc);
    blogData.append('blog_image', this.addBlogForm.value.blog_image, this.addBlogForm.value.blog_image.name);


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
    this.blogService.addBlog(blogData).subscribe(addedBlog => {
      this.spLoaderService.hide();
      if (addedBlog.status === 200) {
        this.router.navigate(['/blogs']);
      }
    }, addBlogError => {
      this.spLoaderService.hide();
      console.log(addBlogError);
    });

  }

  onImageSelect(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.addBlogForm.patchValue({ blog_image: file});
    this.addBlogForm.get('blog_image').updateValueAndValidity();
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
  }

}
