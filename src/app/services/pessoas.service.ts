import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PessoasService {
  private apiUrl = 'http://localhost:8080/api/pessoas';

  constructor(private http: HttpClient) { }

  listarPessoas(): Observable<any> {
    return this.http.get(this.apiUrl); // Retorna todas as pessoas
  }

  criarPessoa(pessoa: any): Observable<any> {
    return this.http.post(this.apiUrl, pessoa);
  }

  editarPessoa(id: number, pessoa: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, pessoa);
  }

  excluirPessoa(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
