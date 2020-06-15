import { Subject } from 'rxjs/Subject';
import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { trainingService } from '../training/training.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UiService } from './share/ui.service';
@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private user: User;
  private isAuthenticated = false;

  constructor(
    private router: Router,
    private afauth: AngularFireAuth,
    private trainingService: trainingService,
    private snackBar: MatSnackBar,
    private uiService: UiService
  ) {}
  initAuthValidation() {
    this.afauth.authState.subscribe((user) => {
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
      } else {
        this.trainingService.removeSubscription();
        this.user = null;
        this.authChange.next(false);
        this.router.navigate(['/login']);
        this.isAuthenticated = false;
      }
    });
  }
  registerUser(authData: AuthData) {
    this.uiService.loadingState.next(true);
    this.afauth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then((res) => {
        this.uiService.loadingState.next(false);
        console.log(res);
      })
      .catch((err) => {
        this.uiService.loadingState.next(false);
        this.uiService.showSnackBar(err.message, null, 3000);
      });
  }
  login(authData: AuthData) {
    this.uiService.loadingState.next(true);
    this.afauth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then((res) => {
        this.uiService.loadingState.next(false);
        console.log(res);
      })
      .catch((err) => {
        this.uiService.loadingState.next(false);
        this.uiService.showSnackBar(err.message, null, 3000);
      });
  }
  logout() {
    this.afauth.signOut();
  }
  getUser() {
    return { ...this.user };
  }
  isAuth() {
    return this.isAuthenticated;
  }
}
