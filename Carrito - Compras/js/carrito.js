const listaCarrito = document.getElementById('lista-carrito');
const totalItems = document.getElementById('total-items');
const totalPrecio = document.getElementById('total-precio');

let contador = 0;
let total = 0;

function actualizarResumen() {
  totalItems.textContent = contador;
  totalPrecio.textContent = total;
}

function agregarProducto(nombreProducto, precio) {
  if (listaCarrito.children.length === 1 &&
      listaCarrito.children[0].textContent === 'No hay productos') {
    listaCarrito.innerHTML = '';
  }

  const li = document.createElement('li');
  li.className = 'list-group-item agregado d-flex justify-content-between align-items-center';
  li.textContent = nombreProducto;

  const spanPrecio = document.createElement('span');
  spanPrecio.textContent = `$${precio}`;
  li.appendChild(spanPrecio);

  listaCarrito.appendChild(li);

  contador++;
  total += precio;
  actualizarResumen();

  setTimeout(() => li.classList.remove('agregado'), 1000);
}

function eliminarProducto() {
  const items = listaCarrito.getElementsByTagName('li');
  if (items.length > 0 && !(items.length === 1 && items[0].textContent === 'No hay productos')) {
    const ultimo = items[items.length - 1];
    const precioTexto = ultimo.querySelector('span').textContent.replace('$','');
    total -= parseFloat(precioTexto);
    contador--;

    ultimo.classList.add('eliminado');
    setTimeout(() => {
      ultimo.remove();
      if (listaCarrito.children.length === 0) {
        const liVacio = document.createElement('li');
        liVacio.className = 'list-group-item text-muted text-center';
        liVacio.textContent = 'No hay productos';
        listaCarrito.appendChild(liVacio);
      }
      actualizarResumen();
    }, 500);
  }
}

function vaciarCarrito() {
  listaCarrito.innerHTML = '<li class="list-group-item text-muted text-center">No hay productos</li>';
  contador = 0;
  total = 0;
  actualizarResumen();
}