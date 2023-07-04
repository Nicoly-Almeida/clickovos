import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, from, map } from 'rxjs';
import { Client } from '../model/client';

@Injectable({
  providedIn: 'root'
})
export class UsersFirestoreService {

  colecaoClients: AngularFirestoreCollection<Client>;
  NOME_COLECAO = 'clients';

 constructor(private afs: AngularFirestore) {
   this.colecaoClients = afs.collection(this.NOME_COLECAO);
 }

 listar(): Observable<Client[]> {
   // usando options para idField para mapear o id gerado pelo firestore para o campo id de usuário
   return this.colecaoClients.valueChanges({idField: 'id'});
 }

 inserir(client: Client): Observable<object> {
   // removendo id pois ele está undefined, já que um novo usuário
   delete client.id;
   
   // Object.assign({}, usuario) é usado para passar um objeto json puro. Não se aceita passar um objeto customizado
   // o from transforma uma promise num Observable, para mantermos a assinatura similar ao do outro service
   return from(this.colecaoClients.add(Object.assign({}, client)));
 }

 deletar(id: string): Observable<void> {
   return from(this.colecaoClients.doc(id).delete());
 }

 obterPorId(id: string): Observable<Client> {
   // como o objeto retornado pelo get é um DocumentData, e não um usuário, transformamos a partir de um pipe e mapeamos de um document
   //  para o tipo usuário
   return this.colecaoClients.doc(id).get().pipe(map(document => new Client(document.id, document.data())));
 }

 editar(client: Client): Observable<void> {
   // removendo id pois não vamos guardar nos dados do documento, mas sim usar apenas como id para recuperar o documento
   delete client.id;
   return from(this.colecaoClients.doc(client.id).update(Object.assign({}, client)));
 }
}
