import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Product } from '../model/product';
import { Observable, from, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsFirestoreService {

  colecaoProducts: AngularFirestoreCollection<Product>;
  NOME_COLECAO = 'products';

 constructor(private afs: AngularFirestore) {
   this.colecaoProducts = afs.collection(this.NOME_COLECAO);
 }

 listar(): Observable<Product[]> {
   // usando options para idField para mapear o id gerado pelo firestore para o campo id de usuário
   return this.colecaoProducts.valueChanges({idField: 'id'});
 }

 inserir(product: Product): Observable<object> {
   // removendo id pois ele está undefined, já que um novo usuário
   delete product.id;
   
   // Object.assign({}, usuario) é usado para passar um objeto json puro. Não se aceita passar um objeto customizado
   // o from transforma uma promise num Observable, para mantermos a assinatura similar ao do outro service
   return from(this.colecaoProducts.add(Object.assign({}, product)));
 }

 deletar(id: string): Observable<void> {
   return from(this.colecaoProducts.doc(id).delete());
 }

 obterPorId(id: string): Observable<Product> {
   // como o objeto retornado pelo get é um DocumentData, e não um usuário, transformamos a partir de um pipe e mapeamos de um document
   //  para o tipo usuário
   return this.colecaoProducts.doc(id).get().pipe(map(document => new Product(document.id, document.data())));
 }

 editar(product: Product): Observable<void> {
   // removendo id pois não vamos guardar nos dados do documento, mas sim usar apenas como id para recuperar o documento
   delete product.id;
   return from(this.colecaoProducts.doc(product.id).update(Object.assign({}, product)));
 }
}
