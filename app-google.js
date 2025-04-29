document.addEventListener('DOMContentLoaded', function () {
  const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTPBjarbjJkPXg0xh3sMKzleZAhohscGE5MOPo2CnwQUzArIBVZo8aWccs9yPLKIFKg_MXBNeVh21Tx/pubhtml?gid=0&single=true";

  fetch(url)
    .then(res => res.text())
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      const tablaHTML = doc.querySelector('table');
      const fila = tablaHTML.querySelectorAll('tr')[1]; // Segunda fila: la de datos
      const celdas = fila.querySelectorAll('td');

      const equipo = {
        'NOMBRE DEL EQUIPO': celdas[0].innerText.trim(),
        'CATEGORIA': celdas[1].innerText.trim(),
        'MARCA': celdas[2].innerText.trim(),
        'MODELO': celdas[3].innerText.trim(),
        'NUMERO DE SERIE': celdas[4].innerText.trim(),
        'UBICACIÓN ACTUAL': celdas[5].innerText.trim(),
        'FECHA DE ADQUISICIÓN': celdas[6].innerText.trim()
      };

      mostrarFicha(equipo);
    })
    .catch(err => {
      console.error('Error al procesar el HTML de Google Sheets:', err);
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
