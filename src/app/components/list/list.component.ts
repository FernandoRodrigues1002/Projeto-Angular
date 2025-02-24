import { Component, OnInit } from '@angular/core';
import { PessoasService } from 'src/app/services/pessoas.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  pessoas: any[] = [];

  constructor(private pessoaService: PessoasService) {}

  ngOnInit(): void {
    this.carregarPessoas();
  }

  carregarPessoas(): void {
    this.pessoaService.listarPessoas().subscribe((data) => {
      this.pessoas = data;
    });
  }
}
