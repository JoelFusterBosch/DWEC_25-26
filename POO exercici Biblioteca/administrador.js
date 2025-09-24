import { Persona } from "./persona.js";

export class Administrador extends Persona{
    constructor(nom,dni,carrec){
        super(nom,dni);
        this.carrec = carrec;
    }

    static llista = [];

    afegirAdministrador(){
        Administrador.llista.push(this);
        console.log(`Administrador afegit Nom: ${this.nom}, DNI: ${this.dni}, Carrec: ${this.carrec}`);
    }

    static llistaAdmin(){
        if (Administrador.llista.length === 0){
            console.log("No n'hi han elements en la llista");
            return;
        }
        console.log("Llista de Administradors:");
        Administrador.llista.forEach((a,i) =>{
            console.log(`${i+1}. ${a.nom} - ${a.dni} - ${a.carrec}`);
        });
    }
}