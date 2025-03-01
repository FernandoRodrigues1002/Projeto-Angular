import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PessoaService } from '../../services/pessoa.service';
import { Pessoa } from '../../interfaces/pessoa';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  pessoaForm!: FormGroup;
  pessoaId!: number;
  carregando = true;
  salvando = false;
  erro = false;
  mensagemErro = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private pessoaService: PessoaService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.inicializarFormulario();
    
    // Obtém o ID da pessoa na rota
    this.route.params.subscribe(params => {
      this.pessoaId = +params['id']; 
      this.carregarPessoa();
    });
  }

  inicializarFormulario(): void {
    this.pessoaForm = this.formBuilder.group({
      nome: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      endereco: ['', [Validators.required]],
      cep: ['', [Validators.required, Validators.pattern(/^\d{5}-\d{3}$|^\d{8}$/)]],
      uf: ['', [Validators.required, Validators.maxLength(2)]],
      ativo: [true],
      matricula: ['', [Validators.required]],
    });
  }

  carregarPessoa(): void {
    this.carregando = true;
    
    this.pessoaService.obterPessoaPorId(this.pessoaId).subscribe({
      next: (pessoa) => {
        this.preencherFormulario(pessoa);
        this.carregando = false;
      },
      error: (error) => {
        console.error('Erro ao carregar pessoa:', error);
        this.erro = true;
        this.mensagemErro = 'Não foi possível carregar os dados da pessoa.';
        this.carregando = false;
      }
    });
  }

  preencherFormulario(pessoa: Pessoa): void {
    this.pessoaForm.patchValue({
      nome: pessoa.nome,
      endereco: pessoa.endereco,
      cep: pessoa.cep,
      uf: pessoa.uf,
      ativo: pessoa.ativo,
      matricula: pessoa.matricula,
      cidade: pessoa.cidade
    });
  }

  buscarEndereco(): void {
    const cep = this.pessoaForm.get('cep')?.value.replace(/\D/g, '');
    if (cep && cep.length === 8) {
      this.http.get(`https://viacep.com.br/ws/${cep}/json/`).subscribe((data: any) => {
        if (!data.erro) {
          this.pessoaForm.patchValue({
            endereco: data.logradouro,
            cidade: data.localidade,
            uf: data.uf,
          });
        } else {
          alert('CEP não encontrado.');
        }
      });
    }
  }

  salvar(): void {
    if (this.pessoaForm.invalid) {
      this.marcarCamposComoTocados();
      return;
    }

    this.salvando = true;
    const pessoaAtualizada: Pessoa = {
      id: this.pessoaId,
      ...this.pessoaForm.value
    };

    this.pessoaService.atualizarPessoa(pessoaAtualizada).subscribe({
      next: () => {
        this.salvando = false;
        this.router.navigate(['/list']);
      },
      error: (error) => {
        console.error('Erro ao salvar pessoa:', error);
        this.erro = true;
        this.mensagemErro = 'Erro ao salvar as alterações.';
        this.salvando = false;
      }
    });
  }

  marcarCamposComoTocados(): void {
    Object.keys(this.pessoaForm.controls).forEach(campo => {
      const controle = this.pessoaForm.get(campo);
      controle?.markAsTouched();
    });
  }

  cancelar(): void {
    this.router.navigate(['/list']);
  }

  // Validação de campos
  exibirErro(campo: string): boolean {
    const controle = this.pessoaForm.get(campo);
    return controle ? controle.invalid && controle.touched : false;
  }
}
