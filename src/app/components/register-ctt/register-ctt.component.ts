import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register-ctt',
  templateUrl: './register-ctt.component.html',
  styleUrls: ['./register-ctt.component.css']
})
export class RegisterCttComponent implements OnInit {
  contatoForm!: FormGroup;
  pessoaId!: number;
  carregando = true;
  salvando = false;
  erro = false;
  mensagemErro = '';


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.inicializarFormulario();
    this.route.params.subscribe(params => {
      this.pessoaId = +params['id'];
    });
  }

  inicializarFormulario() {
    this.contatoForm = this.formBuilder.group({
      tipoContato: ['', Validators.required],
      contato: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.contatoForm.valid) {
      const contato = {
        tipoContato: this.contatoForm.get('tipoContato')?.value.toUpperCase(),
        contato: this.contatoForm.get('contato')?.value
      };
  
      console.log('Dados enviados:', contato);
  
      this.http.post(`http://localhost:8080/api/contatos/${this.pessoaId}`, contato).subscribe({
        next: () => {
          alert('Contato adicionado com sucesso!');
          this.router.navigate(['/pessoas']);
        },
        error: (error) => {
          console.error('Erro ao adicionar contato:', error);
          this.erro = true;
          this.mensagemErro = 'Erro ao adicionar contato';
        }
      });
    } else {
      alert('Por favor, preencha todos os campos obrigatórios.');
    }
  }
}
