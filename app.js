const productos = [
    { codigo: "123456789", nombre: "Producto A", precio: "$20" },
    { codigo: "987654321", nombre: "Producto B", precio: "$15" },
    { codigo: "112233445", nombre: "Producto C", precio: "$10" }
];

// Inicializamos ZXing para escanear el código de barras
const codeReader = new ZXing.BrowserBarcodeReader();

// Función para mostrar la información del producto
function mostrarProducto(producto) {
    document.getElementById("nombre-producto").textContent = producto.nombre;
    document.getElementById("precio-producto").textContent = producto.precio;
    document.getElementById("producto-info").classList.remove("hidden");
}

// Función para manejar el escaneo
document.getElementById("scanner").addEventListener("click", function() {
    // Usamos la cámara del dispositivo para escanear
    codeReader.decodeFromInputVideoDevice(undefined, 'video').then(result => {
        const codigoEscaneado = result.text;
        console.log("Código escaneado:", codigoEscaneado);

        // Buscar el producto correspondiente en el array de productos
        const producto = productos.find(p => p.codigo === codigoEscaneado);
        if (producto) {
            // Mostrar la información del producto
            mostrarProducto(producto);
        } else {
            alert("Producto no encontrado.");
        }
    }).catch(err => {
        console.error("Error al escanear:", err);
        alert("No se pudo leer el código de barras.");
    });
});
