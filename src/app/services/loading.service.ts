import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  public loadingFlag: boolean;

  constructor() { }

  public activateLoading() {
    this.loadingFlag = false;
  }

  public desactivateLoading() {
    this.loadingFlag = true;
  }
}
