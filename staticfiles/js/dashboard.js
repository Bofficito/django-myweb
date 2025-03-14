document.addEventListener('DOMContentLoaded', function () {
    // Obtener el enlace con el id 'add-certificate-link'
    const addCertificateLink = document.getElementById('add-certificate-link');
    
    // Agregar un evento de clic
    addCertificateLink.addEventListener('click', function (event) {
        event.preventDefault();  // Evitar que se recargue la página

        // Obtener la URL desde el atributo data-url
        const url = addCertificateLink.getAttribute('data-url');
        
        // Llamar a la función loadContent con la URL obtenida
        loadContent(url);
    });
});

function loadContent(url) {
    // Realizar una solicitud AJAX para obtener el contenido
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            // Actualizar el contenido del dashboard con los nuevos datos
            document.getElementById('dashboard-content').innerHTML = data;
        })
        .catch(error => console.error('Error al cargar el contenido:', error));
}