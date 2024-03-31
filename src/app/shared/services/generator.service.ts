import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GeneratorService {

  constructor(private readonly http: HttpClient) {}

  public generateVideo(data: any): Observable<any> {
    return this.http.post(`http://localhost:3030/gum/new`, data);
  }

  public getMusicList(): Observable<any> {
    return this.http.get(`http://localhost:3030/music/background`);
  }

  public getFontList(): Observable<any> {
    return this.http.get(`http://localhost:3030/fonts`);
  }
}
