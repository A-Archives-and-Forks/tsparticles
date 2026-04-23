import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  // explicitly mark as non-standalone to avoid runtime mismatch when declared in NgModule
  standalone: false,
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor() {}

}
