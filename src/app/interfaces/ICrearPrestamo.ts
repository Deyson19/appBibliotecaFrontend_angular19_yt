export interface ICrearPrestamo {
  isbn: string;
  identificacionUsuario: string;
  tipoUsuarioId: number;
}
export interface IActualizarPrestamo extends ICrearPrestamo {
  id: number;
}
