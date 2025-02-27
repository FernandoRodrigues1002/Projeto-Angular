import { Contato } from './contato';

export interface Pessoa {
    id: number;
    ativo: boolean;
    nome: string;
    endereco: string;
    cep: string;
    uf: string;
    cidade: string;
    matricula: number;
    contatos: Contato[];
}
