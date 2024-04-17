import { Routes } from '@angular/router';
import {GenerateVideoComponent} from "./features/generate-video/generate-video.component";
import {CaptionsAddComponent} from "./features/captions-add/captions-add.component";

export const routes: Routes = [
  {
    path: '',
    component: GenerateVideoComponent,

  },
  {
    path: 'captions',
    component: CaptionsAddComponent,
  },
];
