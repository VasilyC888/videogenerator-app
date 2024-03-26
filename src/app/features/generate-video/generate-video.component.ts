import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-generate-video',
  standalone: true,
  imports: [FormsModule, DropdownModule, CommonModule],
  templateUrl: './generate-video.component.html',
  styleUrl: './generate-video.component.scss'
})
export class GenerateVideoComponent {
  public topic: string = '';
  public selectedFont: string = '';
  public sourceVideo: string = '';

  fontOptions = [
    { label: 'Arial', value: 'Arial' },
    { label: 'Verdana', value: 'Verdana' },
    { label: 'Times New Roman', value: 'Times New Roman' },
    // Add more font options as needed
  ];
}
