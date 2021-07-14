import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { SpLoaderService } from '../sp-loader/sp-loader.service';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  siteTitle = 'SportsBlog';
  bannerImage = '../../assets/images/Sports-Banner.jpg';
  headerLogo = '../../assets/images/logo.png';
  showBanner: boolean;
  showLoader: any;
  constructor(public router: Router, public location: Location, private spLoader: SpLoaderService) { }

  ngOnInit() {
    this.spLoader.hide().subscribe((loaderResp) => {
      this.showLoader = loaderResp;
    });
    /* this.showBanner = (this.router.url === '/categories') ? true : false; */

    /* Show banner only if it's homepage */
    this.router.events.subscribe(val => {
      if (this.location.path() !== '') {
        this.showBanner = false;
      } else {
        this.showBanner = true;
      }
    });

  }

}
