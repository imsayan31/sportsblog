import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  getCurrentDate = new Date();
  showYear;
  constructor() { }

  ngOnInit() {
    this.showYear = this.getCurrentDate.getFullYear();
  }

}
