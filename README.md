# Task-Manager-JE-Frontend

# Gerenciador de Tarefas Fullstack

[App Screenshot](./src/assets/login.png) 

Este é um projeto de Gerenciador de Tarefas Fullstack desenvolvido como parte de um desafio técnico. A aplicação permite que os usuários se cadastrem, façam login e gerenciem suas tarefas. A aplicação é composta de um frontend em React e um backend em Node.js com Express. A autenticação é feita com JWT (JSON Web Token), e os dados são armazenados em um banco de dados SQLite (ou MySQL, se preferido).

Link Site: [https://taskmanagerfelipe.netlify.app/]


## Índice

- [Visão Geral](#visão-geral)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação](#instalação)
  - [Pré-requisitos](#pré-requisitos)
  - [Instruções para rodar o backend](#instruções-para-rodar-o-backend)
  - [Instruções para rodar o frontend](#instruções-para-rodar-o-frontend)
- [API](#api)
  - [Rotas de Autenticação](#rotas-de-autenticação)
  - [Rotas de Tarefas](#rotas-de-tarefas)
  - [Exemplos de JSON](#exemplos-de-json)
- [Funcionalidades](#funcionalidades)
- [Screenshots](#screenshots)
- [Decisões Técnicas](#decisões-técnicas)
- [To-Do](#to-do)
- [Contato](#contato)

## Visão Geral

A aplicação de Gerenciamento de Tarefas permite que usuários autenticados:

- Cadastrem novas tarefas.
- Visualizem todas as suas tarefas.
- Atualizem as tarefas existentes.
- Marquem tarefas como concluídas.
- Excluam tarefas.

## Tecnologias Utilizadas

### Backend
- **Node.js**
- **Express.js**
- **SQLite** ou **MySQL**
- **JWT** para autenticação

### Frontend
- **React**
- **React Router**
- **Context API** para gerenciamento de estado
- **Axios** para requisições HTTP

### Pré-requisitos

Antes de começar, você precisará ter o seguinte instalado no seu sistema:

- **Node.js** (versão 14+)
- **NPM** ou **Yarn**
- **SQLite** ou **MySQL** (se optar por MySQL, ajuste as configurações no arquivo `.env`)



#### Backend
Autenticação JWT: O sistema utiliza tokens JWT para autenticar os usuários e proteger as rotas de tarefas.
CRUD de Tarefas: Os usuários podem criar, visualizar, atualizar e excluir suas próprias tarefas.
Interface Responsiva: A interface é projetada para ser intuitiva e acessível em diferentes tamanhos de tela.
Screenshots
Página de Login
Página de Lista de Tarefas
Decisões Técnicas
Express.js: Escolhido pela simplicidade e eficiência no desenvolvimento de APIs RESTful.
JWT para Autenticação: Permite a autenticação segura sem a necessidade de manter sessões no servidor.
SQLite: Usado como banco de dados padrão pela simplicidade, mas o projeto é configurável para MySQL.
React com Context API: Gerenciamento de estado global simples e eficiente, sem a necessidade de bibliotecas externas.
To-Do
Melhorar a validação de entradas de usuário (front e backend).
Adicionar testes unitários e de integração.
Implementar filtros e busca de tarefas.
Implementar a opção de prioridades para as tarefas.
Contato
Autor: Felipe Oliveira Carvalho
E-mail: [felipeoliveiracarv@gmail.com]
LinkedIn: [linkedin.com/in/felipe-oliveira-carvalho-9b6b52285/]

[App Screenshot](./src/assets/cadastrar.png) 
[App Screenshot](./src/assets/dashboard.png) 


### Instruções para rodar o backend

1. Clone este repositório:

   Frontend:
   ```bash
   git clone https://github.com/LippeOli/Task-Manager-JE-Frontend

    Backend:
  git clone https://github.com/LippeOli/Task-Manager-Jack-Expert-  



Configure o banco de dados e variáveis de ambiente. Crie um arquivo .env com as seguintes variáveis:

   ```bash
    PORT=5432
    DB_TYPE=pg 
    JWT_SECRET=sua_chave_secreta
   ``` 


#### API

Rotas de Autenticação
POST /api/auth/register: Cadastra um novo usuário.
POST /api/auth/login: Faz login de um usuário e retorna um token JWT.
POST /api/auth/logout: Faz logout do usuário autenticado.

Rotas de Tarefas
GET /api/tasks: Retorna todas as tarefas do usuário autenticado.
POST /api/tasks: Cria uma nova tarefa.
PUT /api/tasks/:id: Atualiza uma tarefa existente.
PATCH /api/tasks/:id/complete: Marca uma tarefa como concluída.
DELETE /api/tasks/:id: Exclui uma tarefa.

Exemplos de JSON

Cadastro de Usuário (POST /api/auth/register)
```bash json
{
  "email": "usuario@exemplo.com",
  "password": "senha123"
}
```
Login (POST /api/sessions)
```bash json
{
  "email": "usuario@exemplo.com",
  "password": "senha123"
}
```
Criação de Tarefa (POST /api/tasks)
```bash json
{
  "title": "Estudar React",
  "description": "Estudar hooks e gerenciar estado com Context API"
}
```
Atualização de Tarefa (PUT /api/tasks/)
```bash json

{
  "title": "Estudar React e Node.js",
  "description": "Atualizar o conhecimento em Fullstack"
}
```
Marcar Tarefa como Concluída (/api/tasks)
```bash json

{
  "check": true
}

