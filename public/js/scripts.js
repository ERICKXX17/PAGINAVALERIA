document.querySelector('form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita que se recargue la página

    const name = document.querySelector('#name').value;
    const phone = document.querySelector('#phone').value;
    const date = document.querySelector('#date').value;
    const time = document.querySelector('#time').value;

    // Enviar datos al servidor
    try {
        const response = await fetch('http://localhost:3000/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, phone, date, time })
        });

        if (response.ok) {
            alert('Solicitud enviada correctamente. Recibirá una confirmación.');
        } else {
            alert('Hubo un problema al enviar la solicitud.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al conectar con el servidor.');
    }
});
