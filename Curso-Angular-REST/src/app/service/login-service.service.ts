import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from '../app-constants';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: HttpClient, private router: Router) { }

  login(usuario) {
    // console.info(JSON.stringify(usuario)); /* Para acertar o json */
    return this.http.post(AppConstants.baseLogin, JSON.stringify(usuario)).subscribe(data => {

      /* retorno HTTP */
      // console.info(JSON.parse(JSON.stringify(data)).Authorization); /* para pegar o token com o bearer no inicio */
      // console.info(JSON.parse(JSON.stringify(data)).Authorization.split(' ')[1]); /* para pegar apenas o token sem o bearer -teste- */

      var token = JSON.parse(JSON.stringify(data)).Authorization.split(' ')[1];

      localStorage.setItem('token', token);
      console.info('Token: ' + localStorage.getItem('token'));

      this.router.navigate(['home']);

    },
      () => {
        console.error('Erro ao fazer login!');
        alert('Acesso Negado!');
      }
    );
  }

}
