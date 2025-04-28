# teste-coderlab

Este é o projeto **Teste CoderLab**, uma aplicação desenvolvida para gerenciamento de produtos e categorias.

## Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- [Node.js](https://nodejs.org/) (versão 16 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/) 

## Configuração do Projeto

1. Clone o repositório para sua máquina local:
   ```bash
   git clone https://github.com/seu-usuario/teste-coderlab.git
   cd teste-coderlab
   ```

2. Instale as dependências do frontend e backend:
   ```bash
   cd frontend
   yarn install
   cd ../backend
   yarn install
   ```

3. Configure as variáveis de ambiente:
   - Crie um arquivo `.env` na pasta `backend` com o seguinte conteúdo:
     ```
     DATABASE_URL=postgresql://<usuario>:<senha>@localhost:5432/<nome_do_banco>
     POSTGRES_USER=<usuario>
     POSTGRES_PASSWORD=<senha>
     POSTGRES_DB=<nome_do_banco>
     ```

## Rodando o Projeto

### Usando Docker Compose (Recomendado)

1. Certifique-se de que o Docker e o Docker Compose estão instalados.
2. Na raiz do projeto, execute