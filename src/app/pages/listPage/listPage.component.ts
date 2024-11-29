import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { PrestamoService } from '../../services/prestamo.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IRespuestaAPI, Prestamo } from '../../interfaces/IRespuestaApi';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { filter, switchMap } from 'rxjs';
import { ConfirmDialogComponent } from '../../components/confirmDialog/confirmDialog.component';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { TipoUsuarioPipe } from '../../pipes/tipoUsuario.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-page',
  imports: [MatDivider, MatIcon, MatIconButton, TipoUsuarioPipe, RouterLink],
  templateUrl: './listPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListPageComponent implements OnInit {
  private readonly _prestamoService = inject(PrestamoService);
  private readonly _snackBar = inject(MatSnackBar);
  private _prestamoActual?: Prestamo;
  private dialog = inject(MatDialog);

  //*Listar los registros
  public listadoPrestamos = signal<Prestamo[]>([]);

  ngOnInit(): void {
    this.cargarPrestamos();
  }
  private cargarPrestamos() {
    this._prestamoService.getPrestamos().subscribe(
      (resp) => {
        if (resp.isSuccess) {
          this.listadoPrestamos.set(resp.result);
          this.displaySnackbar(resp.message, 3500);
        }
      },
      (error: HttpErrorResponse) => {
        const myError = error.error as IRespuestaAPI<Prestamo>;

        this.displaySnackbar(myError.message, 4000);
      }
    );
  }

  private displaySnackbar(message: string, duration: number) {
    this._snackBar.open(message, 'Cerrar', {
      duration,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  public eliminar(id: number) {
    if (!id) {
      throw new Error('No se envió un id');
    }
    this._prestamoService.getPrestamo(id).subscribe(
      (data) => {
        if (data.isSuccess) {
          this._prestamoActual = data.result;
        } else {
          this.displaySnackbar(data.message, 4000);
        }
      },
      (error: HttpErrorResponse) => {
        const myError = error.error as IRespuestaAPI<Prestamo>;
        this.displaySnackbar(myError.message, 4000);
        console.log('Error:', myError);
      }
    );
    //*Mostrar => display dialog
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this._prestamoActual,
    });

    //*Escuchar respuesta del dialog
    dialogRef
      .afterClosed()
      .pipe(
        filter(
          //*escuchar valor boolean devuelto
          (confirm: boolean) => confirm
        ),
        switchMap(() =>
          //*hacer petición para eliminar
          //this._prestamoService.deletePrestamo(this._prestamoActual!.id)
          this._prestamoService.getPrestamo(id)
        ),
        filter((wasDelete: any) => {
          const prestamo = wasDelete as Prestamo;
          console.log('Prestamo: ', prestamo);

          return wasDelete;
        })
      )
      .subscribe((x) => {
        console.log('Value: ', x);

        this.displaySnackbar('Prestamo Eliminado', 3000);
        setTimeout(() => {
          this.cargarPrestamos();
        }, 3500);
      });
  }
}
