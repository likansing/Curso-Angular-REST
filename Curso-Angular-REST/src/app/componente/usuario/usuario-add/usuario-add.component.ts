import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; /*necessario pagar pegar a passagem de parametro do editar*/
import { User } from 'src/app/model/user';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Telefone } from 'src/app/model/telefone';

@Component({
  selector: 'app-root',
  templateUrl: './usuario-add.component.html',
  styles: ['./usuario-add.component.css']
})
export class UsuarioAddComponent implements OnInit {

  usuario = new User();
  telefone = new Telefone();

  constructor(private routeActive: ActivatedRoute, private userService: UsuarioService) { }

  ngOnInit() {
    let id = this.routeActive.snapshot.paramMap.get('id');

    if (id != null) {
      /*console.log('Valor sendo editado: ' + id)*/
      this.userService.getStudent(id).subscribe(data => {
        this.usuario = data;
      });
    }
  }

  salvarUser() {
    if (this.usuario.id != null && this.usuario.id.toString().trim() != null) { /* atualizando ou editando */
      this.userService.updateUsuario(this.usuario).subscribe(data => {
        this.novo();
        console.info('Atualizou user: ' + data);
      });
    } else { /* novo registro */
      this.userService.salvarUsuario(this.usuario).subscribe(data => {
        this.novo();
        console.info('Gravou user! ' + data);
      });
    }
  }

  deletarTelefone(id, i) {
    if (id === null) {
      this.usuario.telefones.splice(i, 1);
      return;
    }
    if (id !== null && confirm('Deseja Deletar?')) {
      this.userService.removerTelefone(id).subscribe(data => {
        this.usuario.telefones.splice(i, 1);
      });
    }
  }

  addFone() {
    if (this.usuario.telefones === undefined) {
      this.usuario.telefones = new Array<Telefone>();
    }

    this.usuario.telefones.push(this.telefone);
    this.telefone = new Telefone();
  }

  novo() {
    this.usuario = new User();
    this.telefone = new Telefone();
  }

}
