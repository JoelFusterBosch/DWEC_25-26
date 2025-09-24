import { Material } from "./material.js";
export class Llibre extends Material{
    constructor(titol,exemplars,autor){
        super(titol,exemplars);
        this.autor = autor;
    }
    static llista = [];
    afegirLlibre(){
        Llibre.llista.push(this);
        console.log(`Llibre afegit: Titol: ${this.titol}, Número d'exemplars: ${this.exemplars}, Autor: ${this.autor}`);
    }
}
