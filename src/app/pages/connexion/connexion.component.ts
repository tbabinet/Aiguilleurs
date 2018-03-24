import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent {

  submitting: boolean = false;

  constructor(private auth: AuthService, private router: Router) { }

  submit(username, password) {
    this.auth.login(username, password).subscribe(res => {
      if (res) {
        this.router.navigate(['/admin']);
      }
    }, err => {
      alert(err);
    });
  }

}
