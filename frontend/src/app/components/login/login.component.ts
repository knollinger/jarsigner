import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ILoginRequest, LoginRequest } from '../../models/login.request';
import { SessionService } from '../../services/session.service';

/**
 * 
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  private redirUrl: string = '/';

  /**
   * 
   * @param sessionSvc
   */
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sessionSvc: SessionService,
    formBuilder: FormBuilder) {

    this.loginForm = formBuilder.group({
      user: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
    this.loginForm.markAllAsTouched();
  }

  /**
   * 
   */
  ngOnInit(): void {

    this.route.queryParamMap.subscribe(params => {
      this.redirUrl = params.get('redirUrl') || '';
    });
  }

  /**
   * 
   */
  onSubmit() {

    const req = LoginRequest.fromJSON(this.loginForm.value);
    this.sessionSvc.login(req).subscribe(x => {
      console.log(x);
      this.router.navigateByUrl(this.redirUrl);
    })
  }
}
