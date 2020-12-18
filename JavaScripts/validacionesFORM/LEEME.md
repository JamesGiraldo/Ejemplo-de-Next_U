# Solución

La validación de formularios es algo muy común en la web.

## Creación de los contenedores span para mostrar los errores 

Se crea un `span` para cada caso y se coloca en el lugar que corresponda en el HTML

```html
<!DOCTYPE html>
<html lang="en">
...
  <form action="" >
    <p>
      <label>Nombre</label>
      <input type="text" name="nombre" id="nombre">
      <span id="errorNombre" class="error"></span>
    </p>
    ...

    ...<span id="errorEmail" class="error"></span>
    
    ...<span id="errorContrasena" class="error"></span>
    
    ...<span id="errorConfirmacion" class="error"></span>
    
    ...<span id="errorGenero" class="error"></span>

    ...<span id="errorPais" class="error"></span>
    
    ...<span id="errorTerminos" class="error"></span>
...
</html>
```

## Limpiar los errores

Esta función recorre cada uno de los elementos para asignar la cadena vacía y los errores se reinicien en cada verificación

```javascript
function limpiarErrores(){
  var errores = document.getElementsByClassName("error");
  for(var i = 0; i < errores.length; i++){
    errores[i].innerHTML = "";
  }
}
```

Recuerda llamar a esta función al inicio de `validar(formulario)`

## Validaciones

Es importante hacer foco en el campo que está inválido para facilitar la interacción al usuario. Excepción: Los elementos del tipo `radio button` no pueden ser enfocados

### Nombre

```javascript
if (formulario.nombre.value.trim().length == 0) {
  document.getElementById("errorNombre").innerText = "Campo obligatorio";
  formulario.nombre.focus();
  return false;
}

if (formulario.nombre.value.trim().length < 3) {
  document.getElementById("errorNombre").innerText = "Campo inválido";
  formulario.nombre.focus();
  return false;
}
```

### Email

```javascript
var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
if (!re.test(formulario.email.value)) {
  document.getElementById("errorEmail").innerText = "Campo inválido";
  formulario.email.focus();
  return false;
}
```

### Contraseña

```javascript
if (formulario.contrasena.value.trim().length == 0) {
  document.getElementById("errorContrasena").innerText = "Campo obligatorio";
  formulario.contrasena.focus();
  return false;
}

if (formulario.contrasena.value.trim().length < 6) {
  document.getElementById("errorContrasena").innerText = "Campo inválido (Mínimo 6 caracteres)";
  formulario.contrasena.focus();
  return false;
}
```

### Contraseña (Confirmación)

```javascript
if (formulario.contrasena.value != formulario.confirmacion.value) {
  document.getElementById("errorConfirmacion").innerText = "Confirmación no coincide";
  formulario.confirmacion.focus();
  return false;
}
```

### Género 

```javascript
if (formulario.genero.value == "") {
  document.getElementById("errorGenero").innerText = "Campo obligatorio";
  return false;
}
```

### Pais

```javascript
if (formulario.pais.value == "") {
  document.getElementById("errorPais").innerText = "Campo obligatorio";
  formulario.pais.focus();
  return false;
}
```

### Terminos

```javascript
if (!formulario.terminos.checked) {
  document.getElementById("errorTerminos").innerText = "Debe aceptar los términos y condiciones";
  formulario.terminos.focus();
  return false;
}
```
