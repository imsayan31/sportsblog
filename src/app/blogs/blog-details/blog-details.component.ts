import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { concatMap, map, mergeMap, tap, toArray } from "rxjs/operators";

import { BlogService } from "../blog.service";
import { Comments } from "src/app/modules/comments";
import { from } from "rxjs";

@Component({
  selector: "app-blog-details",
  templateUrl: "./blog-details.component.html",
  styleUrls: ["./blog-details.component.css"],
})
export class BlogDetailsComponent implements OnInit {
  blogTitle: string;
  blogId: number;
  blogImage: string;
  blogDescription: string;
  blogCategory: string;
  blogPostedOn: string;
  commentForm: FormGroup;
  showCommentForm: boolean = false;
  commentData: any;
  listOfComments: any;
  parentCommentLength: number;
  listOfChildComments: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private blogService: BlogService,
    private toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.blogId = +this.activatedRoute.snapshot.paramMap.get("id");

    /* Fetching Blog Details */
    this.blogService.getBlogData(this.blogId).subscribe((blogDetails) => {
      this.blogTitle = blogDetails.blogDetails.title;
      this.blogImage = blogDetails.blogDetails.image;
      this.blogDescription = blogDetails.blogDetails.content;
      this.blogCategory = blogDetails.blogDetails.category;
      this.blogPostedOn = blogDetails.blogDetails.posted_on;
    });

    /* Fetching Blog Comments */
    this.fetchComments();

    /* Fetching Blog Child Comments */
    /* this.blogService
      .fetchChildComments(this.blogId)
      .subscribe((commentData) => {
        this.listOfChildComments = commentData.commentList;
      }); */

    /* Comment Form Preparing */
    this.commentForm = new FormGroup({
      parent_id: new FormControl(null),
      comment_name: new FormControl(null, {
        validators: [Validators.required, Validators.pattern("^[a-zA-Z ]+$")],
      }),
      comment_email: new FormControl(null, {
        validators: [Validators.required, Validators.email],
      }),
      comment_box: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
  }

  onBlogLike() {}

  onCommentSubmit() {
    if (this.commentForm.invalid) {
      return;
    }
    this.commentData = {
      blog_id: this.blogId,
      parent_id: this.commentForm.value.parent_id,
      comment_name: this.commentForm.value.comment_name,
      comment_email: this.commentForm.value.comment_email,
      comment_box: this.commentForm.value.comment_box,
    };
    this.blogService.addComment(this.commentData).subscribe((res) => {
      if (res.status === 200) {
        this.toastrService.success(res.message, "Success!!!");
      }
      /* Fetching Blog Comments */
      this.fetchComments();

      /* Fetching Blog Child Comments */
      this.blogService
        .fetchChildComments(this.blogId)
        .subscribe((commentData) => {
          this.listOfChildComments = commentData.commentList;
        });
    });
    this.commentForm.reset();
    this.commentForm.markAsPristine();
    this.commentForm.markAsUntouched();
    this.commentForm.updateValueAndValidity();
  }

  onReplyComment(commentId) {
    this.commentForm.patchValue({
      parent_id: commentId,
    });
    this.showCommentForm = true;
  }

  onBlogComment() {
    this.showCommentForm = !this.showCommentForm;
  }

  fetchComments() {
    var commentsData: Comments[] = [];
    this.blogService
      .fetchComments(this.blogId)
      .pipe(
        mergeMap((commentRes: any) => {
          from(commentRes).subscribe((eachComment: any) => {
            let newComment = {
              ID: eachComment.comment_ID,
              parent: eachComment.comment_parent,
              name: eachComment.comment_author,
              email: eachComment.comment_author_email,
              description: eachComment.comment_content,
              date: eachComment.comment_date,
            };
            commentsData.push(newComment);
          });
          return commentsData;
        }),
        toArray()
      )
      .subscribe((commentDataResp) => {
        this.listOfComments = commentDataResp;
        this.parentCommentLength = this.listOfComments.length;
      });
  }
}
