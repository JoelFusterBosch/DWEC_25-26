import { Persona } from "./persona.js";

export class Soci extends Persona {
    constructor(nom, dni) {
        super(nom, dni); 
        this.llistaMaterial = []; 
    }

    static llista = [];

    afegirSoci() {
        Soci.llista.push(this); 
        console.log(`Soci afegit: Nom: ${this.nom} DNI: ${this.dni}`);
    }

    static llistaSocis() {
        if (Soci.llista.length === 0) {
            console.log("No n'hi han elements en la llista.");
            return;
        }
        console.log("Llista dels socis:");
        Soci.llista.forEach((s, i) => {
            console.log(`${i + 1}. ${s.nom} - ${s.dni}`);
        });
    }
    static llistaMaterial() {
        if (Soci.llista.length === 0) {
            console.log("No n'hi han elements en la llista.");
            return;
        }
        console.log("Llista dels socis amb material:");
        Soci.llista.forEach((s, i) => {
            if(s.llistaMaterial.length > 0){
                console.log(`${i + 1}. ${s.nom} - ${s.dni} ${s.llistaMaterial}`);
            } 
        });
    }
}