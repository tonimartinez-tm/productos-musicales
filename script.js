const contenedor = document.getElementById("productos");
const filtro = document.getElementById("filtro");
const verFavoritosBtn = document.getElementById("verFavoritos");
const modoOscuroBtn = document.getElementById("modoOscuro");

let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
let mostrandoFavoritos = false;

function mostrarProductos(lista) {
  contenedor.innerHTML = "";

  if (lista.length === 0) {
    contenedor.innerHTML = "<p>No hay productos para mostrar.</p>";
    return;
  }

  lista.forEach((prod) => {
    const div = document.createElement("div");
    div.classList.add("producto");

    div.innerHTML = `
      <img src="${prod.imagen}" alt="${prod.nombre}" class="img-producto"/>
      <h3>${prod.nombre}</h3>
      <p>Tipo: ${prod.tipo}</p>
      <button data-id="${prod.id}">
        ${favoritos.includes(prod.id) ? "💛 Quitar de Favoritos" : "🤍 Agregar a Favoritos"}
      </button>
    `;

    div.querySelector("button").addEventListener("click", (e) => {
      const id = parseInt(e.target.dataset.id);
      if (favoritos.includes(id)) {
        favoritos = favoritos.filter(fav => fav !== id);
      } else {
        favoritos.push(id);
      }
      localStorage.setItem("favoritos", JSON.stringify(favoritos));
      mostrarProductos(mostrandoFavoritos ? obtenerFavoritos() : filtrarProductos());
    });

    contenedor.appendChild(div);
  });
}

function filtrarProductos() {
  const seleccion = filtro.value;
  if (seleccion === "todos") return productos;
  return productos.filter(p => p.tipo === seleccion);
}

function obtenerFavoritos() {
  return productos.filter(p => favoritos.includes(p.id));
}

filtro.addEventListener("change", () => {
  mostrandoFavoritos = false;
  mostrarProductos(filtrarProductos());
});

verFavoritosBtn.addEventListener("click", () => {
  mostrandoFavoritos = true;
  mostrarProductos(obtenerFavoritos());
});

modoOscuroBtn.addEventListener("click", () => {
  document.body.classList.toggle("oscuro");
  modoOscuroBtn.textContent = document.body.classList.contains("oscuro")
    ? "☀️ Modo Claro"
    : "🌙 Modo Oscuro";
});

mostrarProductos(productos);