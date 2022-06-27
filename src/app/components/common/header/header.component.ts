import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpServiceService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private httpService: HttpServiceService) { }

  ngOnInit(): void {
  }

  onLogout() {
    this.httpService.logout();
    this.router.navigate(['login']);
  }

}
