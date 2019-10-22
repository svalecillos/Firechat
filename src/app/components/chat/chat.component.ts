import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/providers/chat.service';
import { Mensaje } from 'src/app/interface/mensaje';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent implements OnInit{

  mensaje: string ="";
  elemento: any;

  constructor(private _chatService:ChatService) { 
    this._chatService.cargarMensajes()
                     .subscribe( ()=>{
                       //Se ejecuta el timeout porque la instruccion de scroll se ejecuta muy rapido
                       setTimeout( ()=>{

                       },20)
                      this.elemento.scrollTop = this.elemento.scrollHeight;
                     });
  }

  ngOnInit(){
    this.elemento = document.getElementById('app-mensajes');
  }

  enviar_mensaje(){
    console.log( this.mensaje );

    if(this.mensaje.length === 0){
      return;
    }

    this._chatService.agregarMensajes(this.mensaje)
                     .then( ()=>this.mensaje = "")
                     .catch( (err)=>console.error('Error al enviar', err) );
  }

}
