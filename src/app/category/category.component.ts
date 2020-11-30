import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from './category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  listCategories: any;
  constructor(private categoryService: CategoryService, public route: Router) { }

  ngOnInit() {
    this.categoryService.fetchCategories().subscribe(catResp => {
      this.listCategories = catResp.categories;
    });
  }

  onCatDelete(catId) {
    this.categoryService.deleteCategory(catId).subscribe(catDelResp => {
      if (catDelResp.status === 200) {
        this.categoryService.fetchCategories().subscribe(catResp => {
          this.listCategories = catResp.categories;
        });
      }
    });
  }

  onCatEdit(catId) {
    this.route.navigate(['/edit-category/' + catId]);
  }

}
