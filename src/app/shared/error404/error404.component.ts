import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  imports: [],
  templateUrl: './error404.component.html',
  styleUrl: './error404.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Error404Component implements OnInit {
  private readonly _router = inject(Router);
  ngOnInit(): void {
    console.log('Ruta no encontrada');

    setTimeout(() => {
      this._router.navigate(['./']);
    }, 5500);
  }
}
