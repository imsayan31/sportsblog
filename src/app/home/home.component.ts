import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  editorsPick = '../../assets/images/editors-pick.svg';
  constructor() { }

  ngOnInit() {
  }

}
