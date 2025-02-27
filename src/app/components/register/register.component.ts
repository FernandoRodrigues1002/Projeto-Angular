// register.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Pessoa } from '../../interfaces/pessoa';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.registerForm = this.fb.group({
      nome: ['', Validators.required],
      cep: ['', [Validators.required, Validators.pattern(/^\d{5}-?\d{3}$/)]],
      endereco: ['', Validators.required],
      cidade: ['', Validators.required],
      uf: ['', Validators.required],
      matricula: ['', Validators.required],
    });
  }

  buscarEndereco() {
    const cep = this.registerForm.get('cep')?.value.replace(/\D/g, '');
    if (cep && cep.length === 8) {
      this.http.get(`https://viacep.com.br/ws/${cep}/json/`).subscribe((data: any) => {
        if (!data.erro) {
          this.registerForm.patchValue({
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

  onSubmit() {
    if (this.registerForm.valid) {
      const pessoa: Pessoa = this.registerForm.value;
      this.http.post('http://localhost:8080/api/pessoas', pessoa).subscribe({
        next: () => alert('Pessoa cadastrada com sucesso!'),
        error: () => alert('Erro ao cadastrar pessoa.'),
      });
    } else {
      alert('Por favor, preencha todos os campos obrigatórios.');
    }
  }
}
