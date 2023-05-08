import {Component} from '@angular/core';
import {AuthService} from '../../seguranca/auth.service';
import {LogoutService} from '../../seguranca/logout.service';
import {Router} from '@angular/router';
import {ErrorHandlerService} from '../ErrorHandlerService';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(
    private auth: AuthService,
    private logoutService: LogoutService,
    private errorHandler: ErrorHandlerService,
    private router: Router
  ) {
  }

  logout() {
    this.logoutService.logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
