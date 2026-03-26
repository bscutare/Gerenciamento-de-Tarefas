const app = require("./app");
//importa o arquivo app.js que está a configuração principal do servidor

require("./bancoDeDados/conexao");
//importa a conexão com o banco de dados que faz o banco conectar quando o servidor iniciar

const porta = 3001;
//cria uma variável com a porta que o servidor vai usar

app.listen(porta, function () {console.log("Servidor rodando na porta 3001")});
//inicia o servidor na porta definida e mostra uma mensagem no terminal para avisar que o servidor está funcionando

