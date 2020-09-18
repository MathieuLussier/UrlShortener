import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShortenerService {
  httpErrorEmitter: Subject<string> = new Subject<string>();

  constructor(private httpClient: HttpClient) { }

  public async createNewUrlShortener(originalLink: string) {
    return new Promise((resolve, reject) => {
      this.httpClient.post(`${environment.backendUrl}/shortener/create`, { originalLink }).subscribe((data) => {
        resolve(data);
      }, err => {
        reject(err);
      });
    });
  }

  public onHttpErrorEvent(event) {
    this.httpErrorEmitter.next(event);
  }
}
