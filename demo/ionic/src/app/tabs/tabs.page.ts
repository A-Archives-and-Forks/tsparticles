import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  // explicitly mark as non-standalone to avoid runtime metadata mismatches
  standalone: false,
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor() {}

}
