import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  assetPath: string | undefined;

  constructor() { }

  ngOnInit(): void {
    this.assetPath = `${document.baseURI}assets/logo.png`;

  }

}
