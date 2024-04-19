import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {log} from "node:util";

@Injectable({
  providedIn: 'root'
})
export class GeneratorService {

  constructor(private readonly http: HttpClient) {}

  public generateVideo(data: any): Observable<any> {
    const authToken = 'ZFKrGXa9quayeIFsfxLd924SE3hEd1';

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    });

    const options = { headers: headers };

    return this.http.post(`https://gum-generator.onrender.com/gum/new`, data, options);
  }

  // public getMusicList(): Observable<any> {
  //   return this.http.get(`https://gum-generator.onrender.com/music/background`);
  // }

  public getFontList(): Observable<any> {
    return this.http.get(`https://gum-generator.onrender.com/fonts`);
  }

  public uploadVideoWithSubtitles(videoFile: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', videoFile);

    return this.http.post<any>('https://gum-generator.onrender.com/video/add/subtitles', formData, {
      headers: {
        Authorization: 'ZFKrGXa9quayeIFsfxLd924SE3hEd1'
      }
    });
  }
}
