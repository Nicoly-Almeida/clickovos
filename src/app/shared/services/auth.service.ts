import { Injectable } from '@angular/core';
import { UsersFirestoreService } from './users-firestore.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private usuarioService: UsersFirestoreService, private router: Router) { }

  login(email:string, senha:string) : boolean{
    this.usuarioService.listar().subscribe(item => {
      const account = item.find(x => x.email == email && x.password == senha);
      if(account){
        window.localStorage.setItem('user', JSON.stringify(account));
        this.router.navigate(['/']);
        return true;
      } else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Email ou senha inválidos!',
        })
        return false;
      }

    })
    return false;
  }

  getUser(): string{
    return window.localStorage.getItem('user') || '';
  }

  logout(){
    window.localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
