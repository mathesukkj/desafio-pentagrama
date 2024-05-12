# Desafio Pentagrama
### O desafio proposto foi:
Criar uma aplicação web full-stack, para cadastro de cidades, bairros e
ruas
Esta aplicação deve conter:
- Tela de login/cadastro de usuário.
- Tela de cadastro de cidade (nome da cidade, estado e data de
fundação);
- Tela de cadastro de bairro (nome do bairro, associação a uma cidade)
- Tela de cadastro de ruas (nome da rua, associação a um bairro)
Obs: Fazer um campo para CEP que fará um autocomplete nos
campos de nome e bairro integrando com a api do ViaCep
https://viacep.com.br/
- Relatório de cidades, bairros e ruas (filtrar por nome da cidade, bairro
e rua, data da fundação (período inicial e final). Exibir relacionamentos
entre os registros, permitir edição e deleção de elementos.

## Como iniciar o projeto?
Após clonar a repo:

### Backend (usando Sail)

```sh
cd backend

cp .env.example .env

composer install

./vendor/bin/sail up -d

```

A API irá iniciar em localhost:80

### Frontend (Node 20)

```sh
cd frontend

(bun/npm/pnpm/yarn) install

(bun/npm/pnpm/yarn) run dev
```

O frontend irá iniciar em localhost:3000


#### Obs:
Fazer tudo em 24h é bem puxado kkkkk Faltaram algumas coisas, como:
- Testes
- Edicão e delecão de ruas e bairros (Apenas as cidades possuem essa funcão)
- Update nas tabelas ao fazer submit de algum formulário
- Boas práticas no frontend
- Etc.

Mas é isso, dei meu máximo e me virei pra aprender Laravel do zero nessa semana kkkkkk me diverti demais. 