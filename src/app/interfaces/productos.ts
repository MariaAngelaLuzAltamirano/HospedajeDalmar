import { FormGroup } from "@angular/forms";

export interface ProductoHTML {
    form?: FormGroup,
    producto: any,
}

//crear una interface de productos

export interface Producto {
    id?: string;
    nombre: string;
    capacidad: string;
    descripcion: string;
    imgs: Object[];
    valorPorNoche: string;
    servicios: string[];
    estado: boolean
}
