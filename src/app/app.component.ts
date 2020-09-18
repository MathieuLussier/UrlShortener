import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ShortenerService} from './shortener.service';
import {UrlShortener} from './url-shortener';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  windowLocation = window.location.href;
  title = 'UrlShortener';
  shortLinks: UrlShortener[] = [];

  constructor(private shortenerService: ShortenerService) {}

  async onSubmit(form: NgForm) {
    const res: any = await this.shortenerService.createNewUrlShortener(form.value.originalLink);
    if (typeof res === 'object' && 'originalLink' in res && '_id' in res) {
      this.shortLinks.push(res);
    }
    form.reset();
  }
}
