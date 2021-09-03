import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, PageEvent } from "@angular/material";

import { SpLoaderService } from "src/app/sp-loader/sp-loader.service";
import { CategoryService } from '../category/category.service';
import { BlogService } from '../../blogs/blog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-blogs',
  templateUrl: './my-blogs.component.html',
  styleUrls: ['./my-blogs.component.css']
})
export class MyBlogsComponent implements OnInit {
  listCategories: any;
  displayedColumns: string[] = ["image", "name", "description", "action"];
  dataSource: any = new MatTableDataSource();
  totalItems = 10;
  postsPerPage = 5;
  pageSizeOptions = [5, 10, 25, 50];
  offsetVal = 1;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  constructor(private spLoader: SpLoaderService, private blogService: BlogService, private route: Router) { }

  ngOnInit() {
    this.spLoader.show();
    this.blogService
      .fetchBlogs(this.postsPerPage, this.offsetVal, "all")
      .subscribe((catResp) => {
        this.spLoader.hide();
        this.listCategories = catResp.blogData;
        this.dataSource = catResp.blogData;
        this.totalItems = catResp.count;
      });
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onChangedPage(pageData: PageEvent) {
    this.offsetVal = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.spLoader.show();
    this.blogService
      .fetchBlogs(this.postsPerPage, this.offsetVal, "all")
      .subscribe((catResp) => {
        this.spLoader.hide();
        this.listCategories = catResp.blogData;
        this.dataSource = catResp.blogData;
        this.totalItems = catResp.count;
      });
  }

  applyFilter(event: any) {
    const filterVal = (event.target as HTMLInputElement).value;
    if (filterVal && filterVal.length > 2) {
      this.spLoader.show();
      this.blogService
        .fetchBlogs(this.postsPerPage, this.offsetVal, filterVal)
        .subscribe((catResp) => {
          this.spLoader.hide();
          this.listCategories = catResp.blogData;
        this.dataSource = catResp.blogData;
        this.totalItems = catResp.count;
        });
    } else if (!filterVal) {
      this.blogService
        .fetchBlogs(this.postsPerPage, this.offsetVal, "all")
        .subscribe((catResp) => {
          this.spLoader.hide();
          this.listCategories = catResp.blogData;
        this.dataSource = catResp.blogData;
        this.totalItems = catResp.count;
        });
    }
  }

  onBlogDelete(blogId) {
    this.blogService.deleteBlog(blogId).subscribe((catDelResp) => {
      if (catDelResp.status === 200) {
        this.blogService
          .fetchBlogs(this.postsPerPage, 1, "all")
          .subscribe((catResp) => {
            this.dataSource = catResp.blogData;
          });
      }
    });
  }

  onBlogEdit(blogId) {
    this.route.navigate(["/my-account/edit-blog/" + blogId]);
  }

}
