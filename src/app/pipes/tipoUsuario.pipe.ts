import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'tipoUsuario',
})
export class TipoUsuarioPipe implements PipeTransform {
  //*Pipe personalizado - devolver un string con el tipo de usuario
  //*De acuerdo al id recibido: 1=> Afiliado

  private tipoUsuario!: string;
  transform(value: number): string {
    switch (value) {
      case 1:
        this.tipoUsuario = 'Usuario Afiliado';
        break;
      case 2:
        this.tipoUsuario = 'Usuario Estudiante';
        break;
      case 3:
        this.tipoUsuario = 'Usuario Invitado';
        break;
      default:
        this.tipoUsuario = 'Usuario Desconocido';
        break;
    }
    return this.tipoUsuario;
  }
}
