import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  apiURL = environment.apiEndpoint + "sports-category";
  httpURL: string;
  constructor(private http: HttpClient) {}
  fetchCategories(perPage: number, offset: number, filterVal: any) {
    this.httpURL = this.apiURL + "/get-categories/" + perPage + "/" + offset + "/" + filterVal;
    
    return this.http.get<{
      status: number;
      message: string;
      categories: any;
      count: number;
    }>(this.httpURL);
  }

  addCategory(categoryData) {
    return this.http.post<{ status: number; message: string }>(
      "http://localhost/basic-backend-setup/wp-json/sportsblog/v1/sports-category/add-category/",
      categoryData
    );
  }

  deleteCategory(categoryId) {
    return this.http.delete<{ status: 200; message: string }>(
      "http://localhost/basic-backend-setup/wp-json/sportsblog/v1/sports-category/delete-category/" +
        categoryId
    );
  }

  getCategoryDetails(catId) {
    return this.http.get<{ status: number; message: string; catDetails: any }>(
      "http://localhost/basic-backend-setup/wp-json/sportsblog/v1/sports-category/get-category-details/" +
        catId
    );
  }

  updateCategory(updatedData) {
    return this.http.put<{ status: number; message: string }>(
      "http://localhost/basic-backend-setup/wp-json/sportsblog/v1/sports-category/update-category/",
      updatedData
    );
  }
}
