import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class BlogService {
  constructor(private http: HttpClient) {}

  fetchBlogs() {
    return this.http.get<{ status: number; message: string; blogData: any }>(
      "http://localhost/basic-backend-setup/wp-json/sportsblog/v1/sports-blog/get-blogs/"
    );
  }

  addBlog(addBlogData) {
    return this.http.post<{ status: number; message: string }>(
      "http://localhost/basic-backend-setup/wp-json/sportsblog/v1/sports-blog/add-blog/",
      addBlogData
    );
  }

  updateBlog(blogData) {
    return this.http.put<{ status: number; message: string }>(
      "http://localhost/basic-backend-setup/wp-json/sportsblog/v1/sports-blog/update-blog/",
      blogData
    );
  }

  getBlogData(blogId) {
    return this.http.get<{ status: number; message: string; blogDetails: any }>(
      "http://localhost/basic-backend-setup/wp-json/sportsblog/v1/sports-blog/get-blog-details/" +
        blogId
    );
  }

  deleteBlog(blogId) {
    return this.http.delete<{
      status: number;
      message: string;
      blogDetails: any;
    }>(
      "http://localhost/basic-backend-setup/wp-json/sportsblog/v1/sports-blog/delete-blog/" +
        blogId
    );
  }

  addComment(addCommentData) {
    return this.http.post<{ status: number; message: string }>(
      "http://localhost:3000/api/sports-comment/add-comment/",
      addCommentData
    );
  }

  fetchComments(blogId) {
    return this.http.get<{ status: number; message: string; commentList: any }>(
      "http://localhost:3000/api/sports-comment/get-comments/?blogId=" + blogId
    );
  }

  fetchChildComments(blogId) {
    return this.http.get<{ status: number; message: string; commentList: any }>(
      "http://localhost:3000/api/sports-comment/get-child-comments?blogId=" +
        blogId
    );
  }
}
