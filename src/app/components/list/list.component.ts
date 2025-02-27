import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PessoaService } from '../../services/pessoa.service';
import { Pessoa } from '../../interfaces/pessoa';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  pessoas: Pessoa[] = [];
  carregando = true;
  erro = false;

  constructor(
    private pessoaService: PessoaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.carregarPessoas();
  }

  carregarPessoas(): void {
    this.carregando = true;
    this.erro = false;
    
    this.pessoaService.listarPessoas().subscribe({
      next: (data) => {
        this.pessoas = data;
        this.carregando = false;
      },
      error: (error) => {
        console.error('Erro ao carregar pessoas:', error);
        this.erro = true;
        this.carregando = false;
      }
    });
  }

  editarPessoa(id: number): void {
    this.router.navigate(['/edit', id]);
  }

  confirmarExclusao(pessoa: any): void {
    if (confirm(`Deseja realmente excluir ${pessoa.nome}?`)) {
      this.excluirPessoa(pessoa.id);
    }
  }
  
  excluirPessoa(id: number): void {
    this.pessoaService.excluirPessoa(id).subscribe({
      next: () => {
       
        this.pessoas = this.pessoas.filter(p => p.id !== id);
        alert('Pessoa excluída com sucesso!');
      },
      error: (erro) => {
        console.error('Erro ao excluir pessoa:', erro);
        alert('Erro ao excluir pessoa. Verifique o console para mais detalhes.');
      }
    });
  }
  
}