import readline from "node:readline";
import { Llibre } from "./llibre.js";
import { Pelicula } from "./pelicula.js";
import { Revista } from "./revista.js";
import { Soci } from "./soci.js";
import { Administrador } from "./administrador.js";

const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function preguntar(pregunta) {
    return new Promise(resolve => r1.question(pregunta + ' ', r => resolve(r.trim())));
}

/*
Funció Menu amb totes les opcions disponibles
*/
async function menu() {
    let eixir = false;
    while (!eixir) {
        console.log(`
             1. Afegir Llibre
             2. Afegir Pel·lícula
             3. Afegir Revista
             4. Afegir Soci
             5. Afegir Administrador
             6. Prestar un recurs a un Soci
             7. Tornar un recurs
             8. Llista de recursos
             9. Llista de Socis
            10. Llista Administradors
            11. Llista de recursos prestats
            12. Eixir
        `);
        let opcio = await preguntar("Quina opció tries?");
        switch (parseInt(opcio)) {
            case 1: {
                let titol = await preguntar("Quin és el títol del llibre?");
                let exemplars = parseInt(await preguntar("Quants exemplars hi ha?"));
                let autor = await preguntar("Nom de l’autor?");
                let llibre = new Llibre(titol, exemplars, autor);
                llibre.afegirLlibre();
                break;
            }
            case 2: {
                let titol = await preguntar("Títol de la pel·lícula?");
                let exemplars = parseInt(await preguntar("Quants exemplars hi ha?"));
                let director = await preguntar("Qui és el director?");
                let genere = await preguntar("Quin és el gènere?");
                let pelicula = new Pelicula(titol, exemplars, director, genere);
                pelicula.afegirPelicula();
                break;
            }
            case 3: {
                let titol = await preguntar("Títol de la revista?");
                let exemplars = parseInt(await preguntar("Quants exemplars hi ha?"));
                let data = await preguntar("Data de publicació (YYYY-MM-DD)?");
                let revista = new Revista(titol, exemplars, data);
                revista.afegirRevista();
                break;
            }
            case 4: {
                let nom = await preguntar("Nom del soci?");
                let dni = await preguntar("DNI del soci?");
                let soci = new Soci(nom, dni);
                soci.afegirSoci();
                break;
            }
            case 5: {
                let nom = await preguntar("Nom de l’administrador?");
                let dni = await preguntar("DNI de l’administrador?");
                let carrec;
                do {
                    carrec = await preguntar("Càrrec (Ajudant/Administrador)?");
                } while (carrec !== "Ajudant" && carrec !== "Administrador");
                let administrador = new Administrador(nom, dni, carrec);
                administrador.afegirAdministrador();
                break;
            }
            case 6:
                await prestar();
                break;
            case 7:
                await retornar();
                break;
            case 8:
                await llistarRecursos();
                break;
            case 9:
                Soci.llistaSocis();
                break;
            case 10:
                Administrador.llistaAdmin();
                break;
            case 11:
                Soci.llistaMaterial();
                break;
            case 12:
                eixir = true;
                break;
            default:
                console.log("Opció incorrecta, tria de l’1 al 12");
        }
    }
    r1.close();
}

async function prestar() {
    if (Soci.llista.length === 0) {
        console.log("No hi ha socis registrats!");
        return;
    }
    Soci.llistaSocis();
    let Nsoci = parseInt(await preguntar("Número del soci?")) - 1;

    if (Nsoci < 0 || Nsoci >= Soci.llista.length) {
        console.log("Soci no vàlid.");
        return;
    }

    let soci = Soci.llista[Nsoci];
    if (soci.llistaMaterial.length >= 3) {
        console.log("Aquest soci ja té 3 recursos prestats.");
        return;
    }

    let tipus = await preguntar("Vols un Llibre (L), Revista (R) o Pel·lícula (P)?");
    switch (tipus) {
        case "L":
            Llibre.llistarDisponibles();
            await soci.prestarRecurs(await preguntar("Títol del llibre?"), Llibre.llista);
            break;
        case "R":
            Revista.llistarDisponibles();
            await soci.prestarRecurs(await preguntar("Títol de la revista?"), Revista.llista);
            break;
        case "P":
            Pelicula.llistarDisponibles();
            await soci.prestarRecurs(await preguntar("Títol de la pel·lícula?"), Pelicula.llista);
            break;
        default:
            console.log("Opció no vàlida.");
    }
}

async function retornar() {
    if (Soci.llista.length === 0) {
        console.log("No hi ha socis registrats!");
        return;
    }
    Soci.llistaSocis();
    let Nsoci = parseInt(await preguntar("Número del soci?")) - 1;

    if (Nsoci < 0 || Nsoci >= Soci.llista.length) {
        console.log("Soci no vàlid.");
        return;
    }

    let soci = Soci.llista[Nsoci];
    if (soci.llistaMaterial.length === 0) {
        console.log("Aquest soci no té cap material prestat.");
        return;
    }

    soci.mostrarRecursos();
    let Nretornar = parseInt(await preguntar("Quin recurs vols retornar? (número)")) - 1;

    if (Nretornar < 0 || Nretornar >= soci.llistaMaterial.length) {
        console.log("Número incorrecte.");
        return;
    }

    soci.retornarRecurs(Nretornar);
    console.log("Material retornat correctament!");
}

async function llistarRecursos() {
    let tipus = await preguntar("Vols veure: Tots (T), Llibres (L), Revistes (R), Pel·lícules (P)?");
    switch (tipus) {
        case "T":
            Llibre.llistarDisponibles();
            Revista.llistarDisponibles();
            Pelicula.llistarDisponibles();
            break;
        case "L":
            Llibre.llistarDisponibles();
            break;
        case "R":
            let any = await preguntar("Vols filtrar per any de publicació? (Intro per ometre)");
            Revista.llistarDisponibles(any);
            break;
        case "P":
            let genere = await preguntar("Vols filtrar per gènere? (Intro per ometre)");
            Pelicula.llistarDisponibles(genere);
            break;
        default:
            console.log("Opció no vàlida.");
    }
}

menu();
