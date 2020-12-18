# Asociando la empresa

Luego de crear la tabla empresa e ingresar algunos registros en la base de datos, vamos a crear la relación y modificar la vista para reflejar la empresa.

Crea la relación desde el cerrajero a la empresa `N-1`

```Javascript
    empresa: {
      model: 'empresa',
      columnName: 'empresa_id'
    }
```

Haz populate de la empresa

```Javascript
const  cerrajeros = await Cerrajero.find().populate('empresa')
```

Agrega la cabecera de la empresa

```HTML
<th>Empresa</th>
```

Agrega el cuerpo de la empresa

```HTML
<td><%=cerrajero.empresa.nombre%></td>
```
