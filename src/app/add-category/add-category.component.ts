import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from '../category/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  categoryAddForm: FormGroup;
  catFormData: any;
  constructor(public categoryService: CategoryService, public router: Router) { }

  ngOnInit() {
    this.categoryAddForm = new FormGroup({
      category_name: new FormControl(null, {validators: [Validators.required]}),
      category_desc: new FormControl(null, {validators: [Validators.required, Validators.maxLength(100)]})
    });
  }

  onAddCategorySubmit() {
    if (this.categoryAddForm.invalid) {
      return;
    }
    this.catFormData = {
      category_name: this.categoryAddForm.value.category_name,
      category_desc: this.categoryAddForm.value.category_desc
    };
    this.categoryService.addCategory(this.catFormData).subscribe(addCatResp => {
      if (addCatResp.status === 200) {
        this.categoryAddForm.reset();
        this.categoryAddForm.controls['category_name'].setErrors(null);
        this.categoryAddForm.controls['category_desc'].setErrors(null);
        this.router.navigate(['/categories']);
      }
    });

  }

}
