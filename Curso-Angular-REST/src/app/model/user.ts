import { Telefone } from './telefone';

export class User {
    // representando conforme back-end
    id: Number;
    login: String;
    nome: String;
    senha: String;
    dataNascimento: String;
    telefones: Array<Telefone>;

}
