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

  students: Array<User[]>;
  nome: String;
  total: Number;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuarioService.getStudentList().subscribe(data => {
      this.students = data.content;
      this.total = data.totalElements;
    });
  }

  deleteUsuario(id: Number, index) {

    if (confirm('Deseja remover?')) {
      this.usuarioService.deletarUsuario(id).subscribe(data => {
        // console.log('Retorno do metodo delete' + data);

        /* Para remover da tela */
        this.students.splice(index, 1);

        // this.usuarioService.getStudentList().subscribe(data => {
        //   this.students = data;
        // });

      });
    }
  }

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

  carregarPagina(pagina) {
    // console.info('pagina= ' + pagina);
    /* menos 1 pq a paginacao no back-end no banco comeca em zero */
    this.usuarioService.getStudentListPage(pagina - 1).subscribe(data => {
      this.students = data.content;
      this.total = data.totalElements;
    });
  }

}
