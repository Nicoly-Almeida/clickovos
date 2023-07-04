import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/shared/model/client';
import { UsersFirestoreService } from 'src/app/shared/services/users-firestore.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-creat-client',
  templateUrl: './creat-client.component.html',
  styleUrls: ['./creat-client.component.scss']
})
export class CreatClientComponent {
  client: Client;
  router: Router;

  constructor(router: Router, private usersService: UsersFirestoreService, private route: ActivatedRoute) {
    this.router = router;
    this.client = new Client('', {});
  }

  inserirUsuario(){
    this.usersService.inserir(this.client).subscribe(
      pets => {
        Swal.fire({
        icon: 'success',
        title: 'Usuário cadastrado com sucesso!',
        showConfirmButton: false,
        timer: 3000
      })
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 3000);
      this.client = new Client('', {});
    },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Erro ao cadastrar usuário!',
        })
      }
      );
  }


}
