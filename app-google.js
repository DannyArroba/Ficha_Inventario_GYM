document.addEventListener('DOMContentLoaded', function () {
  Tabletop.init({
    key: '1DXSsg9cRiNvmbC9QBSU4aGEPj4BQrtXU6lFKr1wtYdc',
    callback: function (data, tabletop) {
      mostrarFicha(data[0]); // Lee solo la primera fila
    },
    simpleSheet: true
  });
});

function mostrarFicha(equipo) {
  const tabla = document.getElementById('tabla-especificaciones');

  agregarFila(tabla, 'NOMBRE DEL EQUIPO', equipo['NOMBRE DEL EQUIPO']);
  agregarFila(tabla, 'CATEGORIA', equipo['CATEGORIA']);
  agregarFila(tabla, 'MARCA', equipo['MARCA']);
  agregarFila(tabla, 'MODELO', equipo['MODELO']);
  agregarFila(tabla, 'NUMERO DE SERIE', equipo['NUMERO DE SERIE']);
  agregarFila(tabla, 'UBICACIÓN ACTUAL', equipo['UBICACIÓN ACTUAL']);
  agregarFila(tabla, 'FECHA DE ADQUISICIÓN', equipo['FECHA DE ADQUISICIÓN']);
}

function agregarFila(tabla, campo, valor) {
  const fila = document.createElement('tr');

  const th = document.createElement('th');
  th.textContent = campo;

  const td = document.createElement('td');
  td.textContent = valor;

  fila.appendChild(th);
  fila.appendChild(td);
  tabla.appendChild(fila);
}
