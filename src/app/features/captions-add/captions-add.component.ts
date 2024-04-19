import {Component, ElementRef, ViewChild} from '@angular/core';
import {CommonModule} from "@angular/common";
import {NgxColorsModule} from "ngx-colors";
import {FormsModule} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";
import {GeneratorService} from "../../shared/services/generator.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {LogicalFileSystem} from "@angular/compiler-cli";
import {log} from "node:util";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-captions-add',
  standalone: true,
  imports: [FormsModule, CommonModule, NgxColorsModule, DropdownModule, HttpClientModule, ProgressSpinnerModule],
  providers: [GeneratorService, HttpClient],
  templateUrl: './captions-add.component.html',
  styleUrl: './captions-add.component.scss'
})
export class CaptionsAddComponent {
  @ViewChild('videoPlayer') videoPlayer!: ElementRef;
  @ViewChild('textInput') textInput!: ElementRef;

  videoUrl: string = '';
  videoWithCaptions!: string;
  textOverlay: string = 'Your nice test captions';
  fontColorOverlay: string = '#ffffff';
  backgroundColorOverlay: string = '';
  previewImage: string = '';
  textPlacement: string = '';
  fontFamily: string = 'Arial';

  videoGeneringInProgress$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  file!: File;

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

  fontList = [ {label:'Roboto', value: 'Roboto'}, {label: 'Platypi', value: 'Platypi'}, {label: 'Jersey 10', value: 'Jersey 10'}, {label: 'Anton', value: 'Jersey 10'}];

  constructor(public generatorService: GeneratorService) { }

  onVideoSelected(event: any) {
    const file = event.target.files[0];

    this.file = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.videoUrl = reader.result as string;
      this.generatePreviewImage();
    };
    reader.readAsDataURL(file);
  }

  generatePreviewImage() {
    const video = this.videoPlayer?.nativeElement;

    // Check if video element exists
    if (!video) {
      console.error("Video element is not available.");
      return;
    }

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      console.error("Canvas context is not available.");
      return;
    }

    // Draw video onto canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    ctx.font = `30px ${this.fontFamily}`;

    const textWidth = ctx.measureText(this.textOverlay).width;

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

    // Set background color
    ctx.fillStyle = this.backgroundColorOverlay;
    // Draw background rectangle
    ctx.fillRect(textX - 10, textY - 30, textWidth + 20, 40);
    // Set font color
    ctx.fillStyle = this.fontColorOverlay;
    // Draw text
    ctx.fillText(this.textOverlay, textX, textY);

    // Convert canvas to base64 image
    this.previewImage = canvas.toDataURL();
  }

  createVideo(): void {
    this.videoGeneringInProgress$.next(true);

    this.generatorService.uploadVideoWithSubtitles(this.file).subscribe((video) => {
      if (video) {
        this.videoWithCaptions = video.downloadLink

        this.videoGeneringInProgress$.next(false);
      }
    });
  }

   chooseFile(): void {
     const fileInput = document.getElementById('fileInput');

     if (fileInput) {
       fileInput.click();
     }
  }
}
