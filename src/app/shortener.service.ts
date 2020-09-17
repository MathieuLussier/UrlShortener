import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShortenerService {

  constructor(private httpClient: HttpClient) { }

  public async createNewUrlShortener(originalLink: string) {
    return new Promise((resolve, reject) => {
      this.httpClient.post(`${environment.backendUrl}/index/shortener/create`, { originalLink }).subscribe((data) => {
        resolve(data);
      }, err => {
        reject(err);
      });
    });
  }
}
