import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from '../app-constants';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  getStudentList(): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrl);
  }

  deletarUsuario(id: Number): Observable<any> {
    // responseType eh text pq metodo deletar na API retorna somente texto OK e naum Json
    return this.http.delete(AppConstants.baseUrl + id, { responseType: 'text' });
  }

  //  http://localhost:8080/cursospringrestapi/usuario/usuarioporNome/nome
  consultarUser(nome: String): Observable<any> {
    return this.http.get(AppConstants.baseUrl + 'usuarioPorNome/' + nome);
  }

  getStudent(id): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrl + id);
  }

  salvarUsuario(user): Observable<any> {
    return this.http.post<any>(AppConstants.baseUrl, user);
  }

  updateUsuario(user): Observable<any> {
    return this.http.put<any>(AppConstants.baseUrl, user);
  }

  removerTelefone(id): Observable<any> {
    return this.http.delete(AppConstants.baseUrl + "removerTelefone/" + id, { responseType: 'text' });
  }

  userAutenticado() {
    if (localStorage.getItem('token') != null && localStorage.getItem('token').toString().trim() != null) {
      return true;
    } else {
      return false;
    }
  }

  getStudentListPage(pagina): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrl + 'page/' + pagina);
  }


}
