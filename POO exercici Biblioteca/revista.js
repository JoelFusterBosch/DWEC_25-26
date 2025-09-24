import { Material } from "./material.js";
export class Revista extends Material{
    constructor(titol,exemplars,data){
        super(titol,exemplars);
        this.data = data;
    }
    static llista = [];
    afegirRevista(){
        Revista.llista.push(this);
        console.log(`Revista afegida: Titol: ${this.titol}, Exemplars: ${this.exemplars}, Data de llançament: ${this.data}`);
    }
}