import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SpLoaderService } from "../sp-loader/sp-loader.service";
import { BlogService } from "./blog.service";

@Component({
  selector: "app-blogs",
  templateUrl: "./blogs.component.html",
  styleUrls: ["./blogs.component.css"],
})
export class BlogsComponent implements OnInit {
  blogList: any;
  numberOfBlogs: number = 0;
  constructor(
    private blogService: BlogService,
    private router: Router,
    private spLoaderService: SpLoaderService
  ) {}

  ngOnInit() {
    this.spLoaderService.show();
    this.blogService.fetchBlogs(100, 1, 'all').subscribe((blogRes) => {
      this.spLoaderService.hide();
      this.blogList = blogRes.blogData;
      this.numberOfBlogs = this.blogList.length;
    });
  }

  editBlog(blogId) {
    this.router.navigate(["/edit-blog/" + blogId]);
  }

  deleteBlog(blogId) {
    this.spLoaderService.show();
    this.blogService.deleteBlog(blogId).subscribe(
      (blogDeleted) => {
        this.blogService.fetchBlogs(100, 1, 'all').subscribe((blogRes) => {
          this.spLoaderService.hide();
          this.blogList = blogRes.blogData;
          this.numberOfBlogs = this.blogList.length;
        });
      },
      (blogDeleteError) => {
        this.spLoaderService.hide();
      }
    );
  }
}
