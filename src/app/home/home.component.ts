import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
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
    this.blogService.fetchBlogs(6, 1, "all").subscribe((blogRes) => {
      this.spLoaderService.hide();
      this.blogList = blogRes.blogData;
      this.numberOfBlogs = this.blogList.length;
    });
  }
}
