import { Prestamo } from './../../interfaces/IRespuestaApi';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { PrestamoService } from '../../services/prestamo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { TipoUsuarioPipe } from '../../pipes/tipoUsuario.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-prestamo',
  imports: [MatCardModule, MatButton, MatIcon, TipoUsuarioPipe, CommonModule],
  templateUrl: './prestamo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrestamoComponent implements OnInit {
  //* ViewChild del html
  @ViewChild('showImage') btnShowImage!: ElementRef<HTMLButtonElement>;
  private readonly _prestamoService = inject(PrestamoService);
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _toastr = inject(ToastrService);
  private readonly _router = inject(Router);
  public prestamo = signal<Prestamo | null>(null);
  //*IMAGEN DEL LIBRO
  public imagenLibro =
    'https://redonline.cdnds.net/main/thumbs/25788/stack_of_books.jpg';
  ngOnInit(): void {
    setTimeout(() => {
      this.btnShowImage.nativeElement.click();
      this.btnShowImage.nativeElement.classList.remove();
      this.btnShowImage.nativeElement.hidden = true;
    }, 2500);

    //*Obtener el id de la url
    const id = this._activatedRoute.snapshot.paramMap.get('id');
    if (!id) {
      this.regresar('No hay un Id');
      return;
    }
    //*realizar la petición al backend
    this._prestamoService.getPrestamo(Number.parseInt(id)).subscribe({
      next: (response) => {
        if (response) {
          this.prestamo.set(response);
        } else {
          this._router.navigate(['./']);
        }
      },
      error: (error: HttpErrorResponse) => {
        this.regresar(error.statusText);
      },
    });
  }

  public regresar(mensaje?: string) {
    if (mensaje) {
      this._toastr.error(mensaje);
    }
    setTimeout(() => {
      this._router.navigate(['./']);
    }, 2500);
  }
}
