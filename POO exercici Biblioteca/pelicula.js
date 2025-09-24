import { Material } from "./material.js";
export class Pelicula extends Material{
    constructor(titol,exemplars,director,genere){
        super(titol,exemplars);
        this.director = director;
        this.genere = genere;
    }
    static llista = [];
    afegirPelicula(){
        Pelicula.llista.push(this);
        console.log(`Pel·licula afegida Titol: ${this.titol}, Exemplars: ${this.exemplars}, Genere: ${this.genere}, Director: ${this.director}`);
    }
}