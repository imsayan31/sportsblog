import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../category/category.service';
import { SpLoaderService } from '../sp-loader/sp-loader.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styles: []
})
export class EditCategoryComponent implements OnInit {
  categoryEditForm: FormGroup;
  categoryId: string;
  categoryDetails: any;
  updatedCatData: any;
  constructor(
    private route: ActivatedRoute, 
    private categoryService: CategoryService, 
    private router: Router,
    private spLoader: SpLoaderService
    ) { }

  ngOnInit() {
    this.spLoader.show();
    this.categoryEditForm = new FormGroup({
      category_name: new FormControl(null, { validators: [Validators.required] }),
      category_desc: new FormControl(null, { validators: [Validators.required, Validators.maxLength(100)] }),
    });
    this.categoryId = this.route.snapshot.paramMap.get('id');
    this.categoryService.getCategoryDetails(this.categoryId).subscribe(catSuccess => {
      this.spLoader.hide();
      this.categoryDetails = catSuccess.catDetails;
      this.categoryEditForm.patchValue({
        category_name: catSuccess.catDetails.name,
        category_desc: catSuccess.catDetails.description
      });
    });
  }

  onEditCategorySubmit() {
    if (this.categoryEditForm.invalid) {
      return;
    }
    this.updatedCatData = {
      category_id: this.categoryId,
      category_name: this.categoryEditForm.value.category_name,
      category_desc: this.categoryEditForm.value.category_desc
    };
    this.spLoader.show();
    this.categoryService.updateCategory(this.updatedCatData).subscribe(categoryUpdateSucceded => {
      this.spLoader.hide();
      if (categoryUpdateSucceded.status === 200) {
        this.router.navigate(['/categories']);
      }
    });
  }

}
