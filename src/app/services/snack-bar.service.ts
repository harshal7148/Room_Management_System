import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private _snackBar: MatSnackBar) { }

  triggerSnackBar(message: any) {
    return this._snackBar.open(message, 'X', {
      duration: 3000,
      verticalPosition: 'top', horizontalPosition: 'end'
    }
    );
  }
}
