import { Component, OnInit } from '@angular/core';

import { TitlebarService } from './services/titlebar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title: string = '';

  constructor(private titlebarSvc: TitlebarService) {
  }

  ngOnInit() {

    this.titlebarSvc.title.subscribe(title => {

      window.setTimeout(() => {
        this.title = title;
        document.title = title;
      }, 10);
    });
  }
}
