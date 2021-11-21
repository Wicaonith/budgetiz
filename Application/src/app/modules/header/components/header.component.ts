import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/authentication/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['../../../app.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService) {
    let user = localStorage.getItem('userUID');
    this.displayLogOut = user !== null;
  }


  displayLogOut: boolean = false;

  async ngOnInit(): Promise<void> {

  }

  logout() {
    this.authService.logout();
  }
}
