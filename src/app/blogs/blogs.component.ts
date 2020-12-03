import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from './blog.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {
  blogList: any;
  numberOfBlogs: number = 0;
  constructor(private blogService: BlogService, private router: Router) { }

  ngOnInit() {
    this.blogService.fetchBlogs().subscribe(blogRes => {
      this.blogList = blogRes.blogData;
      this.numberOfBlogs = this.blogList.length;
      console.log(this.blogList.length);
    });
  }

  editBlog(blogId) {
    this.router.navigate(['/edit-blog/' + blogId]);
  }

}
