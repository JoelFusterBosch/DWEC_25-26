function mostrarCampsPersona(){
    document.getElementById('soci').classList.add('ocult');
    document.getElementById('administrador').classList.add('ocult');

    const opcioSeleccionada = document.getElementById('classePersona').value;

    if(opcioSeleccionada === 'administrador'){
        document.getElementById('administrador').classList.remove('ocult')
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