import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  students: Observable<User[]>;
  nome: String;
  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuarioService.getStudentList().subscribe(data => {
      this.students = data;
    });
  }

  deleteUsuario(id: Number) {

    if (confirm('Deseja remover?')) {
      this.usuarioService.deletarUsuario(id).subscribe(data => {
        console.log('Retorno do metodo delete' + data);
        this.usuarioService.getStudentList().subscribe(data => {
          this.students = data;
        });
      });
    }
  }

  // consultarUser() {
  //   this.usuarioService.consultarUser(this.nome).subscribe(data => {
  //     this.students = data;
  //   });
  // }

  consultarUser() {
    console.log(this.nome);
    if (this.nome !== undefined && this.nome !== '') {
      this.usuarioService.consultarUser(this.nome).subscribe(data => {
        this.students = data;
      });
    } else {
      this.usuarioService.getStudentList().subscribe(data => {
        this.students = data;
      });
    }
  }

}
