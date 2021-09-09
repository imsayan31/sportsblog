import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { concatMap, shareReplay, take, tap, toArray } from "rxjs/operators";

import { BlogService } from "../blogs/blog.service";
import { SpLoaderService } from "../sp-loader/sp-loader.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  editorsPick = "../../assets/images/editors-pick.svg";
  blogList: any;
  numberOfBlogs: number = 0;
  constructor(
    private blogService: BlogService,
    private router: Router,
    private spLoaderService: SpLoaderService
  ) {}

  ngOnInit() {
    this.spLoaderService.show();
    this.blogService
      .fetchBlogs(100, 1, "all")
      .pipe(
        concatMap((blogs) => {
          return blogs.blogData;
        }),
        take(6),
        toArray(),
        shareReplay(1)
      )
      .subscribe((blogRes) => {
        this.spLoaderService.hide();
        //console.log(blogRes);
        this.blogList = blogRes;
        this.numberOfBlogs = this.blogList.length;
      });
  }
}
