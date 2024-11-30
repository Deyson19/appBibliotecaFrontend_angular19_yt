import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { IRespuestaAPI, Prestamo } from '../interfaces/IRespuestaApi';
import { ICrearPrestamo } from '../interfaces/ICrearPrestamo';

@Injectable({
  providedIn: 'root',
})
export class PrestamoService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = signal<string>(environment.apiUrl);
  constructor() {}

  getPrestamos(): Observable<IRespuestaAPI<Prestamo[]>> {
    return this.http.get<IRespuestaAPI<Prestamo[]>>(
      `${this.baseUrl()}/api/Prestamo`
    );
  }
  getPrestamo(id: number): Observable<Prestamo> {
    return this.http.get<Prestamo>(`${this.baseUrl()}/api/Prestamo/${id}`);
  }

  postPrestamo(model: ICrearPrestamo): Observable<IRespuestaAPI<Prestamo>> {
    return this.http.post<IRespuestaAPI<Prestamo>>(
      `${this.baseUrl()}/api/Prestamo`,
      model
    );
  }
  putPrestamo(
    id: number,
    model: ICrearPrestamo
  ): Observable<IRespuestaAPI<Prestamo>> {
    return this.http.put<IRespuestaAPI<Prestamo>>(
      `${this.baseUrl()}/api/Prestamo/${id}`,
      model
    );
  }
  deletePrestamo(id: number): Observable<IRespuestaAPI<Prestamo>> {
    return this.http.delete<IRespuestaAPI<Prestamo>>(
      `${this.baseUrl()}/api/Prestamo/${id}`
    );
  }
}
