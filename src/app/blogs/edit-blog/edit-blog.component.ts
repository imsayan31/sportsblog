import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent implements OnInit {
  addBlogForm: FormGroup;
  imagePreview: string;
  blogFormData: any;
  blogDetails: any;
  blogId: string;
  constructor(private blogService: BlogService, private router: Router, private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    this.blogId = this.activateRoute.snapshot.paramMap.get('id');
    this.addBlogForm = new FormGroup({
      blog_title: new FormControl(null, { validators: [Validators.required] }),
      blog_desc: new FormControl(null),
      blog_image: new FormControl(null, { validators: [Validators.required] })
    });
    this.blogService.getBlogData(this.blogId).subscribe(blogInfo => {
      this.blogDetails = blogInfo.blogDetails;
      this.addBlogForm.setValue({
        blog_title: this.blogDetails.blog_title,
        blog_desc: this.blogDetails.blog_description,
        blog_image: this.blogDetails.blog_image
      });
      this.imagePreview = this.blogDetails.blog_image;
    });
  }

  onUpdateBlogSubmit() {
    if (this.addBlogForm.invalid) {
      return;
    }

    if (typeof(this.addBlogForm.value.blog_image) === 'object') {
      const editBlogData = new FormData();
      editBlogData.append('blogId', this.blogId);
      editBlogData.append('blog_title', this.addBlogForm.value.blog_title);
      editBlogData.append('blog_desc', this.addBlogForm.value.blog_desc);
      editBlogData.append('blog_image', this.addBlogForm.value.blog_image);

      this.blogService.updateBlog(editBlogData).subscribe(updateBlogSucc => {
        if (updateBlogSucc.status === 200) {
          this.router.navigate(['/blogs']);
        }
      });

    } else {
      this.blogFormData = {
        blogId: this.blogId,
        blog_title: this.addBlogForm.value.blog_title,
        blog_desc: this.addBlogForm.value.blog_desc,
        blog_image: this.addBlogForm.value.blog_image
      };
      this.blogService.updateBlog(this.blogFormData).subscribe(updateBlogSucc => {
        if (updateBlogSucc.status === 200) {
          this.router.navigate(['/blogs']);
        }
      });
    }

  }

  onImageSelect(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.addBlogForm.patchValue({ blog_image: file });
    this.addBlogForm.get('blog_image').updateValueAndValidity();
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
  }

}
