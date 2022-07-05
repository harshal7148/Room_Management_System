import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLoggedIn: boolean = false;
  title = 'Room_Syestem';

  ngOnInit() {
    this.isLoggedIn = localStorage.getItem('token') ? true : false;
  }
}
