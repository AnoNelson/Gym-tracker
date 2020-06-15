import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable()
export class UiService {
  constructor(private snack: MatSnackBar) {}
  loadingState = new Subject<boolean>();

  showSnackBar(message, action, duration) {
    this.snack.open(message, action, {
      duration: duration,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
