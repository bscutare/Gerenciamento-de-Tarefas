const sqlite3 = require("sqlite3").verbose();//importa o sqlite3

const path = require("path");//importa o path para montar o caminho do arquivo do banco

const caminhoBanco = path.resolve(__dirname, "../../bancodados/tarefas.db");//monta o caminho completo do arquivo tarefas.db

const banco = new sqlite3.Database(caminhoBanco, function (erro) {//cria a conexão com o banco de dados

  if (erro) {//se acontecer erro ao conectar
    console.log("Erro ao conectar no banco");
    console.log(erro.message);
  } else {//se conectar com sucesso
    console.log("Banco conectado com sucesso");
  }
});

banco.serialize(function () {//executa os comandos

  banco.run(`CREATE TABLE IF NOT EXISTS tarefas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      descricao TEXT,
      status TEXT NOT NULL,
      prioridade TEXT NOT NULL,
      data_criacao TEXT NOT NULL)`
  );//cria a tabela tarefas se ela não existir
});

module.exports = banco;//exporta a conexão com o banco para usar em outros arquivos