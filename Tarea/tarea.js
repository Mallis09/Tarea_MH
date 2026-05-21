const formulario = document.getElementById("usuario");
const input = document.getElementById("inputTarea");
const lista = document.getElementById("contLista");
const estadistica = document.getElementById("estadistica");

let pendientes = 0;
let completadas = 0;
let id = 1;

// Solo necesitamos UN evento submit
formulario.addEventListener("submit", function(e) {
    e.preventDefault();
    const texto = input.value.trim();

    if (texto === "") {
        // Un alert un poco más amigable
        alert("¡No olvides escribir tu tarea! ✨");
        return;
    }

    crearTarea(texto);
    input.value = "";
});

function crearTarea(texto) {
    id++;
    const article = document.createElement("article");
    article.classList.add("tareas");
    article.setAttribute("id", id);

    // Usamos InnerHTML para simplificar la creación
    article.innerHTML = `
        <label style="display: flex; align-items: center;">
            <input type="checkbox" class="check-tarea">
            <span>${texto}</span>
        </label>
        <i class="fa-solid fa-trash borrar"></i>
    `;

    lista.appendChild(article);
    pendientes++;
    actualizarEstadistica();

    const checkbox = article.querySelector(".check-tarea");
    const textoSpan = article.querySelector("span");
    const icono = article.querySelector(".borrar");

    // Evento completar
    checkbox.addEventListener("change", function() {
        if (checkbox.checked) {
            completadas++;
            pendientes--;
            textoSpan.style.textDecoration = "line-through";
            textoSpan.style.opacity = "0.5";
        } else {
            completadas--;
            pendientes++;
            textoSpan.style.textDecoration = "none";
            textoSpan.style.opacity = "1";
        }
        actualizarEstadistica();
    });

    // Evento eliminar
    icono.addEventListener("click", function() {
        if (checkbox.checked) {
            completadas--;
        } else {
            pendientes--;
        }
        article.style.transform = "translateX(20px)";
        article.style.opacity = "0";
        setTimeout(() => {
            lista.removeChild(article);
            actualizarEstadistica();
        }, 300);
    });
}

function actualizarEstadistica() {
    estadistica.innerHTML = `
        <span>📝 Pendientes: <b>${pendientes}</b></span> | 
        <span>✅ Completadas: <b>${completadas}</b></span>
    `;
}