Sistema de Gerenciamento de Tarefas

Este projeto foi desenvolvido como uma aplicação web fullstack para gerenciamento de tarefas. 
A ideia do sistema é permitir que o usuário consiga organizar suas tarefas de forma simples, podendo cadastrar, visualizar, editar, excluir, buscar e filtrar tarefas.
O frontend foi feito em React, o backend em Node.js com Express, e o banco de dados utilizado foi o SQLite.

A aplicação permite:

- cadastrar tarefas
- listar tarefas
- editar tarefas
- excluir tarefas
- alterar status
- filtrar por status
- buscar por título

Tecnologias utilizadas

Frontend
- React
- Axios
- CSS

Backend
- Node.js
- Express
- CORS (como são portas diferentes, o navegador entende como origens diferentes, o cors libera essa comunicação.)
- SQLite3

Banco de dados
- SQLite

Estrutura do projeto

O projeto está dividido em duas partes principais:

frontend = parte visual do sistema
backend = parte responsável pelas rotas, regras e banco de dados


Instruções para execução do frontend

1-  Abra o terminal na pasta ‘frontend’
2-  Instale as dependências com o comando:

npm install

3- Depois execute o frontend com:

npm run dev

4- Após isso, o terminal vai mostrar o link local da aplicação, algo parecido com:

http://localhost:5173/

5- Abra esse endereço no navegador. É aí que está a aplicação

Instruções para execução do backend

1- Abra outro terminal na pasta ‘backend’
2- Instale as dependências com o comando:

npm install

3- Depois execute o backend com:

node src/server.js

4- Se estiver tudo certo, aparecerá uma mensagem informando que o servidor está rodando na porta 3001. Assim:

Servidor rodando na porta 3001

Instruções para utilização do banco de dados

O banco de dados utilizado no projeto é o SQLite. O arquivo do banco está junto do projeto e não precisa instalar nenhum servidor de banco separado. 
Ao iniciar o backend, a conexão com o banco é feita automaticamente. A tabela de tarefas também é criada automaticamente caso ainda não exista. 
O arquivo do banco pode ser encontrado na pasta:

backend/bancoDeDados/

Para utilizar o banco, basta:

1- manter o arquivo .db dentro da pasta correta do projeto
2- iniciar o backend normalmente
3- o sistema irá acessar esse banco automaticamente

Funcionalidades do sistema

O sistema possui as seguintes funcionalidades:
-cadastro de tarefas
-listagem de tarefas
-edição de tarefas
-exclusão de tarefas
-filtro por status
-busca por título
-alteração de status

Regras aplicadas no sistema

-o título da tarefa é obrigatório
-ao criar uma nova tarefa, o status começa como Pendente
-foi criada uma opção de mudança rápida de status diretamente na listagem

Observações relevantes:

Durante o desenvolvimento, algumas decisões foram tomadas para deixar o projeto mais simples, mais organizado e mais fácil de entender.
Foi escolhida uma estrutura mais simples, com menos separações desnecessárias, para deixar o projeto mais fácil de compreender e manter.
Os nomes de variáveis, funções e arquivos foram deixados de forma mais clara e mais próxima da língua portuguesa, para facilitar a leitura. 
O SQLite foi escolhido porque é leve, simples de configurar e ideal para esse tipo de exercício, além de permitir entregar o arquivo do banco junto com o projeto.

Limitações conhecidas

-o sistema não possui autenticação de usuário
-o frontend foi feito de forma simples, focando mais no funcionamento do que no visual
-algumas validações foram mantidas de forma mais básica por se tratar de um exercício
-o projeto foi pensado para uso local, ou seja, rodando no computador do desenvolvedor


