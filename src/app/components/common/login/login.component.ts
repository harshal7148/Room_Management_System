import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

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

  constructor(private router: Router, private httpService: AuthService) { }

  ngOnInit(): void {
  }

  onLogin() {
    const payload = {
      name: this.loginForm.value.email,
      password: this.loginForm.value.password
    }

    this.httpService.login(payload).subscribe(res => {
      localStorage.setItem('token', res.token);
      this.router.navigate(['outstandings']);
    }, (error) => {
      alert(error.error);
    });
  }

}
