function mostrarCampsPersona() {
    const administradorDiv = document.getElementById('administrador');
    const sociDiv = document.getElementById('soci');
    const radios = administradorDiv.querySelectorAll('input[type="radio"]');
    const opcioSeleccionada = document.getElementById('classePersona').value;

    // Amaga tots els camps
    administradorDiv.classList.add('ocult');
    sociDiv.classList.add('ocult');

    // Desactiva el required dels radios
    radios.forEach(r => r.required = false);

    if (opcioSeleccionada === 'soci') {
        // Soci: no mostrem res, ni required extra
    } else if (opcioSeleccionada === 'administrador') {
        administradorDiv.classList.remove('ocult');
        radios.forEach(r => r.required = true);
    }
}

function mostrarCampsRecurs(){
    document.getElementById('llibre').classList.add('ocult');
    document.getElementById('revista').classList.add('ocult');
    document.getElementById('pelicula').classList.add('ocult');

    const opcioSeleccionada = document.getElementById('classeRecurs').value;

    if(opcioSeleccionada === 'llibre'){
        document.getElementById('llibre').classList.remove('ocult');
    } else if(opcioSeleccionada === 'revista'){
        document.getElementById('revista').classList.remove('ocult')
    } else if(opcioSeleccionada === 'pelicula'){
        document.getElementById('pelicula').classList.remove('ocult')
    }
}
window.addEventListener('DOMContentLoaded', () => {
    const formPersona = document.forms['persona'];
    const formRecurs = document.forms['recurs'];

    formPersona.addEventListener('reset', () => {
        document.getElementById('soci').classList.add('ocult');
        document.getElementById('administrador').classList.add('ocult');
        document.getElementById('classePersona').selectedIndex = 0;
    });

    formRecurs.addEventListener('reset', () => {
        document.getElementById('llibre').classList.add('ocult');
        document.getElementById('revista').classList.add('ocult');
        document.getElementById('pelicula').classList.add('ocult');
        document.getElementById('classeRecurs').selectedIndex = 0;
    });
});
function enviarPersona(){
    const nom = document.getElementById("nom").value;
    const dni = document.getElementById("dni").value;
    const classePersona = document.getElementById('classePersona').value;
    const JSON = {
        nom: nom,
        dni: dni,
        Tipus: classePersona
    }
    fetch('http://localhost:3001/addPersona', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body:JSON.stringify(JSON)
    }).then(response => response.json()).then(data => {
        console.log('Data: ', data);
        alert('Dades enviades correctament!');
    }).catch(error =>{
        console.log('Error: ', error)
        alert('Error al enviar les dades.');
})
}
function enviarRecurs(){
    const titol = document.getElementById("titol").value;
    const NumExemplars = document.getElementById("num_exemplars").value;
    const classeRecurs = document.getElementById('classeRecurs').value;
    const JSON = {
        titol: titol,
        NumExemplars: NumExemplars,
        Tipus: classeRecurs
    }
    fetch('http://localhost:3001/addRecurs', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body:JSON.stringify(JSON)
    }).then(response => response.json()).then(data => {
        console.log('Data: ', data);
        alert('Dades enviades correctament!');
    }).catch(error =>{
        console.log('Error: ', error)
        alert('Error al enviar les dades.');
})
}
