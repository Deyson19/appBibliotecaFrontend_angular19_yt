export interface IRespuestaAPI<T> {
  result: T;
  isSuccess: boolean;
  message: string;
}
export interface ListadoPrestamos {
  isSuccess: boolean;
  result: Prestamo[];
  message: string;
}

export interface Prestamo {
  id: number;
  isbn: string;
  identificacionUsuario: string;
  fechaPrestamo: Date;
  fechaMaximaDevolucion: Date;
  tipoUsuarioId: number;
  tipoUsuario: null;
}
