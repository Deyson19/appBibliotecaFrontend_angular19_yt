# Notas de la aplicación

## Tipos de errores en una solicitud http:

### Error 400:

Realizamos mal la solicitud desde el cliente o el servidor no responde.

### Error 500:

El servidor no pudo procesar la solicitud

### ActivatedRoute:

Acceder a las propiedades de la ruta actual que visita el usuario en la aplicación. Ej: parámetros que se reciben por la url

### Router

Manejar la navegación del usuario desde la lógica del TypeScript

### @defer : Vistas diferidas en angular

Permite manejar mejor los recursos del navegador mientras se carga el contenido.
Esto puede ser controlado mediante algunos operadores/opciones como:

- on viewport ("cuando se carga"),
- on interaction(myButton) ("Cuando se interactúa con un elemento del DOM"),
- on timer(2000) para que se cargue luego de un rato.
  Siempre debe llevar el complemento @placeholder ("Contenido a mostrar mientras se carga el elemento")

### ViewChild

Acceder a un elemento del DOM desde el componente de TypeScript.
Ejemplo

```
<button #myButton class="btn btn-sm btn-danger">
MyButton
</button>
OP1: @ViewChild("myButton") myButton: ElementRef;
OP2: @ViewChild("myButton") myButton: ElementRef<HTMLButtonElement>;
```
