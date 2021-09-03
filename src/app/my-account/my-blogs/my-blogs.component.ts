import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, PageEvent } from "@angular/material";

import { SpLoaderService } from "src/app/sp-loader/sp-loader.service";
import { CategoryService } from '../category/category.service';
import { BlogService } from '../../blogs/blog.service';

@Component({
  selector: 'app-my-blogs',
  templateUrl: './my-blogs.component.html',
  styleUrls: ['./my-blogs.component.css']
})
export class MyBlogsComponent implements OnInit {
  listCategories: any;
  displayedColumns: string[] = ["name", "description", "action"];
  dataSource: any = new MatTableDataSource();
  totalItems = 10;
  postsPerPage = 5;
  pageSizeOptions = [5, 10, 25, 50];
  offsetVal = 1;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  constructor(private spLoader: SpLoaderService, private categoryService: CategoryService, private blogService: BlogService) { }

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
    this.categoryService
      .fetchCategories(this.postsPerPage, this.offsetVal, "all")
      .subscribe((catResp) => {
        this.spLoader.hide();
        this.listCategories = catResp.categories;
        this.dataSource = catResp.categories;
        this.totalItems = catResp.count;
      });
  }

}
