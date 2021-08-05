import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatTableDataSource, PageEvent } from "@angular/material";
import { Event, Router } from "@angular/router";
import { SpLoaderService } from "src/app/sp-loader/sp-loader.service";

import { CategoryService } from "./category.service";

/* export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: "Hydrogen", weight: 1.0079, symbol: "H" },
  { position: 2, name: "Helium", weight: 4.0026, symbol: "He" },
  { position: 3, name: "Lithium", weight: 6.941, symbol: "Li" },
  { position: 4, name: "Beryllium", weight: 9.0122, symbol: "Be" },
  { position: 5, name: "Boron", weight: 10.811, symbol: "B" },
  { position: 6, name: "Carbon", weight: 12.0107, symbol: "C" },
  { position: 7, name: "Nitrogen", weight: 14.0067, symbol: "N" },
  { position: 8, name: "Oxygen", weight: 15.9994, symbol: "O" },
  { position: 9, name: "Fluorine", weight: 18.9984, symbol: "F" },
  { position: 10, name: "Neon", weight: 20.1797, symbol: "Ne" },
]; */

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.css"],
})
export class CategoryComponent implements OnInit, AfterViewInit {
  listCategories: any;
  displayedColumns: string[] = ["name", "description", "action"];
  dataSource: any = new MatTableDataSource();
  totalItems = 10;
  postsPerPage = 5;
  pageSizeOptions = [5, 10, 25, 50];
  offsetVal = 1;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  constructor(
    private categoryService: CategoryService,
    public route: Router,
    private spLoader: SpLoaderService
  ) {}

  ngOnInit() {
    this.spLoader.show();
    this.categoryService
      .fetchCategories(this.postsPerPage, this.offsetVal, "all")
      .subscribe((catResp) => {
        this.spLoader.hide();
        this.listCategories = catResp.categories;
        this.dataSource = catResp.categories;
        this.totalItems = catResp.count;
      });
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onCatDelete(catId) {
    console.log(catId);
    return;
    this.categoryService.deleteCategory(catId).subscribe((catDelResp) => {
      if (catDelResp.status === 200) {
        this.categoryService
          .fetchCategories(this.postsPerPage, 1, "all")
          .subscribe((catResp) => {
            this.dataSource = catResp.categories;
          });
      }
    });
  }

  onCatEdit(catId) {
    this.route.navigate(["/my-account/edit-category/" + catId]);
  }

  onChangedPage(pageData: PageEvent) {
    this.offsetVal = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.spLoader.show();
    this.categoryService
      .fetchCategories(this.postsPerPage, this.offsetVal, "all")
      .subscribe((catResp) => {
        this.spLoader.hide();
        this.listCategories = catResp.categories;
        this.dataSource = catResp.categories;
        this.totalItems = catResp.count;
      });
  }

  applyFilter(event: any) {
    const filterVal = (event.target as HTMLInputElement).value;
    if (filterVal && filterVal.length > 2) {
      this.spLoader.show();
      this.categoryService
        .fetchCategories(this.postsPerPage, this.offsetVal, filterVal)
        .subscribe((catResp) => {
          this.spLoader.hide();
          this.listCategories = catResp.categories;
          this.dataSource = catResp.categories;
          this.totalItems = catResp.count;
        });
    } else if (!filterVal) {
      this.categoryService
        .fetchCategories(this.postsPerPage, this.offsetVal, "all")
        .subscribe((catResp) => {
          this.spLoader.hide();
          this.listCategories = catResp.categories;
          this.dataSource = catResp.categories;
          this.totalItems = catResp.count;
        });
    }
  }
}
