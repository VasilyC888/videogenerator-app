import {Component, ElementRef, ViewChild} from '@angular/core';
import {CommonModule} from "@angular/common";
import {NgxColorsModule} from "ngx-colors";
import {FormsModule} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";

@Component({
  selector: 'app-captions-add',
  standalone: true,
  imports: [FormsModule, CommonModule, NgxColorsModule, DropdownModule],
  templateUrl: './captions-add.component.html',
  styleUrl: './captions-add.component.scss'
})
export class CaptionsAddComponent {
  @ViewChild('videoPlayer') videoPlayer!: ElementRef;
  @ViewChild('textInput') textInput!: ElementRef;

  videoUrl: string = '';
  textOverlay: string = '';
  fontColorOverlay: string = '#ffffff';
  backgroundColorOverlay: string = '';
  previewImage: string = '';
  textPlacement: string = '';

  public textPlacementOptions = [
    {
      label: 'Bottom',
      value: 'bottom',
    },
    {
      label: 'Center',
      value: 'center',
    },
  ]

  constructor() { }

  onVideoSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.videoUrl = reader.result as string;
      this.generatePreviewImage();
    };
    reader.readAsDataURL(file);
  }

  onTextInputChange() {
    this.textOverlay = this.textInput?.nativeElement?.value;
    this.generatePreviewImage();
  }

  onFontColorChange() {
    this.generatePreviewImage();
  }

  onBackgroundColorChange() {
    this.generatePreviewImage();
  }

  onTextPlacementChange() {
    this.generatePreviewImage();
  }

  generatePreviewImage() {
    const video = this.videoPlayer?.nativeElement;
    const canvas = document.createElement('canvas');

    canvas.width = video?.videoWidth;
    canvas.height = video?.videoHeight;

    const ctx = canvas.getContext('2d');

    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      ctx.font = '30px Arial';
      ctx.fillText(this.textOverlay, 20, 50);

      const textWidth = ctx?.measureText(this.textOverlay).width;

      let textX = 20; // Default position for left-aligned text
      let textY = 50; // Default position for top-aligned text

      // Calculate text position based on placement option
      if (this.textPlacement === 'center') {
        textX = (canvas.width - textWidth) / 2; // Center the text horizontally
        textY = canvas.height / 2; // Center the text vertically
      } else if (this.textPlacement === 'bottom') {
        textX = (canvas.width - textWidth) / 2; // Center the text horizontally
        textY = canvas.height - 20; // Position the text at the bottom with some padding
      }

      ctx.fillStyle = this.backgroundColorOverlay; // Set background color
      ctx.fillRect(textX - 10, textY - 30, textWidth + 20, 40); // Adjust background rectangle position and size based on text position

      // Then draw the text
      ctx.fillStyle = this.fontColorOverlay; // Set font color
      ctx.fillText(this.textOverlay, textX, textY);
    }

    this.previewImage = canvas.toDataURL();
  }

  createVideo(): void {

  }
}
