import {Component, Input, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ShortenerService} from './shortener.service';
import {UrlShortener} from './url-shortener';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  windowLocation = window.location.href;
  title = 'UrlShortener';
  shortLinks: UrlShortener[] = [];
  errorMessage = '';

  constructor(private shortenerService: ShortenerService) {}

  ngOnInit(): void {
    this.shortenerService.httpErrorEmitter.subscribe((event) => {
      this.errorMessage = event;
      setTimeout(() => {
        this.errorMessage = '';
      }, 5000);
    });
  }

  async onSubmit(form: NgForm) {
    const res: any = await this.shortenerService.createNewUrlShortener(form.value.originalLink);
    if (typeof res === 'object' && 'originalLink' in res && '_id' in res) {
      this.shortLinks.push(res);
    }
    form.reset();
  }
}
