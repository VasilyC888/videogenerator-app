import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";

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

  public getMusicList(): Observable<any> {
    return this.http.get(`https://gum-generator.onrender.com/music/background`);
  }

  public getFontList(): Observable<any> {
    return this.http.get(`https://gum-generator.onrender.com/fonts`);
  }
}
