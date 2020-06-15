import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { UiService } from '../share/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  isLoading = false;
  private loadingSub: Subscription;
  constructor(private authService: AuthService, private uiService: UiService) {}

  ngOnInit(): void {
    this.loadingSub = this.uiService.loadingState.subscribe((au) => {
      this.isLoading = au;
    });
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
      }),
      pass: new FormControl('', { validators: [Validators.required] }),
    });
  }
  ngOnDestroy() {
    this.loadingSub.unsubscribe();
  }
  handleLogin() {
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.pass,
    });
  }
}
