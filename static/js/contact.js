document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();  // Evita el envío tradicional del formulario

    let formData = new FormData(this);  // Obtiene los datos del formulario

    fetch(this.action, {
        method: "POST",
        body: formData,
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json();  // Espera una respuesta JSON
        } else {
            throw new Error("Error en el envío");
        }
    })
    .then(data => {
        document.getElementById("successMessage").style.display = "block"; // Muestra el mensaje de éxito
        setTimeout(() => location.reload(), 2000);  // Refresca la página después de 2 segundos
    })
    .catch(error => console.error("Error:", error));
});