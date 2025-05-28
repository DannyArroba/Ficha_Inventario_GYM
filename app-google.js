function obtenerIdDesdeURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

document.addEventListener('DOMContentLoaded', function () {
  const idBuscado = obtenerIdDesdeURL();
  if (!idBuscado) {
    alert("No se encontró el parámetro 'id' en la URL.");
    return;
  }

  const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQMu0g74F_M54o8Vdh6zkiVfO5zApbJpDCy88v2ntYBrhI4e1CboFexLRixkBTnbglfHle_k5LfehwW/pubhtml?gid=0&single=true";

  fetch(url)
    .then(res => res.text())
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const filas = doc.querySelectorAll('table tr');

      let encontrado = false;

      for (let i = 2; i < filas.length; i++) {
        const celdas = filas[i].querySelectorAll('td');

        if (celdas.length >= 7 && celdas[0].innerText.trim() === idBuscado) {
          const equipo = {
            'NOMBRE DEL EQUIPO': celdas[1].innerText.trim(),
            'CATEGORIA': celdas[2].innerText.trim(),
            'MARCA': celdas[3].innerText.trim(),
            'MODELO': celdas[4].innerText.trim(),
            'NUMERO DE SERIE': celdas[5].innerText.trim(),
            'UBICACIÓN ACTUAL': celdas[6].innerText.trim(),
            'FECHA DE ADQUISICIÓN': celdas[7].innerText.trim()
          };

          mostrarFicha(equipo);
          encontrado = true;
          break;
        }
      }

      if (!encontrado) {
        alert("No se encontró la ficha con ID " + idBuscado);
      }
    })
    .catch(err => {
      console.error('Error al procesar los datos:', err);
      alert("Error al cargar la ficha desde Google Sheets.");
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

  // Actualiza también la ubicación en la parte superior de la ficha
  const ubicacionSpan = document.getElementById('ubicacion-dinamica');
  if (ubicacionSpan) {
    ubicacionSpan.textContent = equipo['UBICACIÓN ACTUAL'];
  }
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
