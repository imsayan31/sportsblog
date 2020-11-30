import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {

  constructor(private http: HttpClient) {

  }

  fetchCategories() {
    return this.http.get<{ status: number, message: string, categories: any }>
      ('http://localhost:3000/api/sports-category/get-categories');
  }

  addCategory(categoryData) {
    return this.http.post<{ status: number, message: string }>
      ('http://localhost:3000/api/sports-category/add-category', categoryData);
  }

  deleteCategory(categoryId) {
    return this.http.delete<{status: 200, message: string}>
      ('http://localhost:3000/api/sports-category/delete-category/' + categoryId);
  }

  getCategoryDetails(catId) {
    return this.http.get<{ status: number, message: string, catDetails: any}>
      ('http://localhost:3000/api/sports-category/get-category-details?catId=' + catId);
  }

  updateCategory(updatedData) {
    return this.http.put<{status: number, message: string}>
      ('http://localhost:3000/api/sports-category/update-category', updatedData);
  }

}
