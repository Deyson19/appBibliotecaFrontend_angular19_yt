//*Angular CORE => Dependencias Básicas
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
//*Angular router
import { ActivatedRoute, Router } from '@angular/router';

import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
//*Angular Forms
import {
  ReactiveFormsModule,
  FormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

//*Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
//*Interfaces
import { ITipoUsuario } from './../../interfaces/ITipoUsuario';
import {
  ICrearPrestamo,
  IActualizarPrestamo,
} from './../../interfaces/ICrearPrestamo';
//*Servicios
import { PrestamoService } from '../../services/prestamo.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatSelectModule,
    MatIcon,
    MatButton,
  ],
  templateUrl: './upsert.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpsertComponent implements OnInit {
  //*Servicios
  private readonly _prestamoService = inject(PrestamoService);
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _toastr = inject(ToastrService);
  private readonly _router = inject(Router);
  private readonly _snackbar = inject(MatSnackBar);
  //*Propiedades
  public errorMessage = signal<string>('El campo no es correcto');
  private crearPrestamo!: ICrearPrestamo;
  private actualizarPrestamo!: IActualizarPrestamo;

  public tituloFormulario;
  public textoBoton;

  //*Formulario reactivo
  private fb = inject(FormBuilder);
  public form!: FormGroup;
  //*listado para tipos de usuarios
  public tiposUsuario = signal<ITipoUsuario[]>([
    { id: 1, name: 'Usuario Afiliado' },
    { id: 2, name: 'Usuario Estudiante' },
    { id: 3, name: 'Usuario Invitado' },
  ]);
  private idPrestamo = signal<number>(0);

  constructor() {
    this.tituloFormulario = 'Crear Prestamo';
    this.textoBoton = 'Crear';
    this.form = this.fb.group({
      isbn: [
        '',
        [Validators.required, Validators.maxLength(6), Validators.minLength(5)],
      ],
      identificacionUsuario: [
        '',
        [Validators.required, Validators.maxLength(10)],
      ],
      tipoUsuarioId: [1, [Validators.required, Validators.maxLength(1)]],
    });
  }
  ngOnInit(): void {
    const id = this._activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this._prestamoService.getPrestamo(parseInt(id)).subscribe({
        next: (resp) => {
          if (resp) {
            this.idPrestamo.set(resp.id);
            this.form.patchValue(resp);
            this.textoBoton = 'Actualizar';
            this.tituloFormulario = 'Actualizar un prestamo';
          }
        },
        error: (err: HttpErrorResponse) => {
          this.showSnackbar(err.error, true);
        },
      });
    }
    this.showSnackbar(`Bienvenido, vas a ${this.tituloFormulario}`);
  }
  onSubmit() {
    if (this.form.valid && this.textoBoton === 'Actualizar') {
      this.modificarPrestamo();
    } else {
      this.nuevoPrestamo();
    }
  }
  private nuevoPrestamo() {
    if (this.form.valid) {
      this.crearPrestamo = this.form.value;
      this._prestamoService.postPrestamo(this.crearPrestamo).subscribe({
        next: (resp) => {
          if (resp.isSuccess) {
            this.form.reset();
            this._toastr.success(resp.message);
            this.showSnackbar(resp.message, true);
          }
        },
        error: (err: HttpErrorResponse) => {
          console.log('Error: ', err);

          this.showSnackbar(err.error, true);
        },
      });
    } else {
      this.showSnackbar('Los campos no son correctos');
      this.form.reset();
    }
  }
  private modificarPrestamo() {
    if (this.form.valid) {
      this.actualizarPrestamo = this.form.value;
      this.actualizarPrestamo.id = this.idPrestamo();
      this._prestamoService
        .putPrestamo(this.actualizarPrestamo.id, this.actualizarPrestamo)
        .subscribe({
          next: (resp) => {
            if (resp.isSuccess) {
              this.form.reset();
              this._toastr.success(resp.message);
              this.showSnackbar(resp.message, true);
            }
          },
          error: (err: HttpErrorResponse) => {
            console.log('Error: ', err);

            this.showSnackbar(err.error, true);
          },
        });
    } else {
      this.showSnackbar('Los campos no son correctos');
      this.form.reset();
    }
  }

  private showSnackbar(mensaje: string, onBack: boolean = false) {
    this._snackbar.open(mensaje, 'Ok', { duration: 3500 });
    if (onBack) {
      setTimeout(() => {
        this._router.navigate(['./']);
      }, 3800);
    }
  }
}
