import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpLoaderService {
  private overlayRef: OverlayRef = null;
  public setLoaderVal = new BehaviorSubject(false);
  constructor(private overlay: Overlay) { }

  public show() {
    this.setLoaderVal.next(true);
    return this.setLoaderVal;
  }

  public hide(){
    this.setLoaderVal.next(false);
    return this.setLoaderVal;
  }
}
