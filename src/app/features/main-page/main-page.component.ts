import {Component, ViewEncapsulation} from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class MainPageComponent {

}
