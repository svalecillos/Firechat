export interface Mensaje {
    nombre:string;
    mensaje:string;
    fecha?:number; //Opcional
    uid?:string;//LLave de usuario que mando el mensaje
}