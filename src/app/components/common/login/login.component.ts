import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpServiceService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private router: Router, private httpService: HttpServiceService) { }

  ngOnInit(): void {
  }

  onLogin() {
    const payload = {
      name: this.loginForm.value.email,
      password: this.loginForm.value.password
    }

    this.httpService.login(payload).subscribe(res => {
      localStorage.setItem('ownerId', res.data);
      this.router.navigate(['outstandings']);
    }, (error) => {
      alert(error.error);
    });
  }

}
