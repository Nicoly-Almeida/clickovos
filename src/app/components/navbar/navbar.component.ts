import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  items: MenuItem[] = [];

  constructor(private authService: AuthService){

  }

  ngOnInit() {
    this.items = [
        {
            label: 'File',
    }]
  }

  logout(){
    this.authService.logout()
  }

}
