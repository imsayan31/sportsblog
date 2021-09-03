import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class BlogService {
  apiURL = environment.apiEndpoint + "sports-blog";
  httpURL: string;
  constructor(private http: HttpClient) {}

  fetchBlogs(perPage: number, offset: number, filterVal: any) {
    this.httpURL = this.apiURL + "/get-blogs/" + perPage + "/" + offset + "/" + filterVal;
    return this.http.get<{ status: number; message: string; blogData: any, count: number }>(this.httpURL);
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
