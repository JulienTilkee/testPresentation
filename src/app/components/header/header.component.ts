import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  color = {
     white: 'rgba(255, 255, 255, 1)',
     black: 'rgba(0, 0, 0, 1)',
     temp: ''
  };

  title = 'Tilkee tests présentation';

  invertColors() {
    this.color.temp = this.color.white;
    this.color.white = this.color.black;
    this.color.black = this.color.temp;
  }
}
