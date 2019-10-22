import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Mensaje } from '../interface/mensaje';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Mensaje>;
  public chats: Mensaje[] = [];
  public usuario:any = {};

  constructor(private afs: AngularFirestore,
              public afAuth: AngularFireAuth) { 

      this.afAuth.authState.subscribe( user =>{

        console.log('Estado del usuario: ', user);
        
        if( !user ){
          return;
        }

        this.usuario.nombre = user.displayName;
        this.usuario.uid = user.uid;

      })
  
  }


  login( proveedor: string) {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logout() {
    this.usuario = {},
    this.afAuth.auth.signOut();
  }

  cargarMensajes(){
    this.itemsCollection = this.afs.collection<Mensaje>('chats', referencia =>
                                                                 referencia.orderBy('fecha', 'desc').limit(5));//ordenamos por fecha los mensajes, y solo nos mostrara 5

    //Estamos pendientes de todo lo que suceda en este nodo de chats
    return this.itemsCollection.valueChanges()
                                .pipe(
                                  map( (mensajes: Mensaje[]) =>{
                                    console.log( mensajes);
                                    this.chats = [];
                                    for(let mensaje of mensajes){
                                      this.chats.unshift(mensaje);//INserta en la primera posicion siempre
                                    }
                                    return this.chats;
                                  }
                                ));
                               
  }

  // TODO falta el UID
  agregarMensajes(texto:string){
    let mensaje: Mensaje ={
      nombre: this.usuario.nombre,
      mensaje: texto,
      fecha: new Date().getTime(),
      uid: this.usuario.uid
    }
   return this.itemsCollection.add(mensaje);
  }
}
