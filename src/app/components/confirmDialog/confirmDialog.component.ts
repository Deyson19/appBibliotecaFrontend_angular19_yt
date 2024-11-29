import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { Prestamo } from '../../interfaces/IRespuestaApi';
import { MatDialogActions } from '@angular/material/dialog';
@Component({
  selector: 'app-confirm-dialog',
  imports: [MatDialogActions, MatDialogTitle],
  templateUrl: './confirmDialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Prestamo
  ) {}

  //*Método cuando se de click en eliminar
  onConfirm() {
    console.log('Quiere eliminar un registro');
    this.dialogRef.close(true);
  }

  //*Método cuando no de click
  onNoConfirm() {
    console.log('No se hace nada');
    this.dialogRef.close(false);
  }
}
