const banco = require("../bancoDeDados/conexao");//importa a conexão com o banco de dados

const statusValidos = ["Pendente", "Em andamento", "Concluída"];//cria uma lista com os status

const prioridadesValidas = ["Baixa", "Média", "Alta"];//cria uma lista com as prioridades

function listarTarefas(req, res) {//função para listar as tarefas

  const status = req.query.status;//pega o status enviado na busca

  const busca = req.query.busca;//pega o texto digitado na busca

  let sql = "SELECT * FROM tarefas WHERE 1=1";//começa a montar o comando SQL

  let valores = [];//cria uma lista vazia para guardar os valores dos filtros

  if (status) {//se tiver status no filtro
    sql += " AND status = ?";//adiciona filtro por status no SQL
    valores.push(status);//adiciona o valor do status na lista
  }

  if (busca) {//se tiver texto na busca
    sql = sql + " AND titulo LIKE ?";//adiciona filtro por título no SQL
    valores.push("%" + busca + "%");//adiciona o valor da busca na lista
  }

  sql += " ORDER BY id DESC";//ordena as tarefas da mais nova para a mais antiga

  banco.all(sql, valores, function(erro, tarefas){//executa o comando SQL para buscar várias tarefas

    if (erro) {//se der erro
      res.status(500).json({ erro: "Erro ao listar tarefas." });
      return;//para tudo e nada acontece
    }

    res.json(tarefas);//se der certo, devolve a lista de tarefas
  });
}

function criarTarefa(req, res) {//função para criar uma nova tarefa

  const titulo = req.body.titulo;//pega o título enviado pelo frontend

  const descricao = req.body.descricao;//pega a descrição enviada pelo frontend

  const status = req.body.status;//pega o status enviado pelo frontend

  const prioridade = req.body.prioridade;//pega a prioridade enviada pelo frontend

  if (!titulo || titulo.trim() === "") {//verifica se o título está vazio
    res.status(400).json({ erro: "O título é obrigatório." });
    return;//para tudo e nada acontece
  }

  const dataCriacao = new Date().toISOString();//cria a data atual no momento do cadastro

  const sql = `
    INSERT INTO tarefas (titulo, descricao, status, prioridade, data_criacao)
    VALUES (?, ?, ?, ?, ?)`;//comando SQL para inserir a tarefa no bacno

  const valores = [titulo, descricao, status, prioridade, dataCriacao];
  //lista com os valores que vão ser colocados no banco

  banco.run(sql, valores, function(erro) {//executa o comando para salvar no banco

    if (erro) {//se der erro
      res.status(500).json({ erro: "Erro ao criar tarefa." });
      return;//para tudo e nada acontece
    }

    res.status(201).json({//se der certo
      mensagem: "Tarefa criada com sucesso.",
      id: this.lastID//devolve mensagem e o id da tarefa 
    });
    
  });
}

function atualizarTarefa(req, res) {//função para atualizar uma tarefa existente

  const id = req.params.id;//pega o id da tarefa pela URL

  const titulo = req.body.titulo;//pega o título enviado pelo frontend

  const descricao = req.body.descricao;//pega a descrição enviada pelo frontend

  const status = req.body.status;//pega o status enviado pelo frontend

  const prioridade = req.body.prioridade;//pega a prioridade enviada pelo frontend

  if (!titulo || titulo.trim() === "") {//verifica se o título está vazio
    res.status(400).json({ erro: "O título é obrigatório." });
    return;//para tudo e nada acontece
  }

  const sql = `
    UPDATE tarefas
    SET titulo = ?, descricao = ?, status = ?, prioridade = ?
    WHERE id = ?`;//comando para atualizar a tarefa

  const valores = [titulo, descricao, status, prioridade, id];//lista com os novos valores

  banco.run(sql, valores, function (erro){//executa a atualização

    if (erro){//se der erro
      res.status(500).json({ erro: "Erro ao atualizar tarefa." });
      return;//para tudo e nada acontece
    }

    res.json({ mensagem: "Tarefa atualizada com sucesso." });// devolve mensagem de sucesso
  });
}

function alterarStatus(req, res) {//função para alterar o status da tarefa

  const id = req.params.id;//pega o id da tarefa pela URL

  const status = req.body.status;//pega o novo status enviado pelo frontend

  const sql = "UPDATE tarefas SET status = ? WHERE id = ?";//comando SQL para atualizar apenas o status

  const valores = [status, id];//valores que serão usados no comando SQL

  banco.run(sql, valores, function (erro) {//executa o comando no banco

    if (erro) {//se der erro
      res.status(500).json({ erro: "Erro ao alterar status." });
      return;//para tudo e nada acontece
    }

    res.json({ mensagem: "Status alterado com sucesso." });//devolve mensagem de sucesso
  });
}

function excluirTarefa(req, res) {//função para excluir uma tarefa

  const id = req.params.id;//pega o id da tarefa pela URL

  const sql = "DELETE FROM tarefas WHERE id = ?";//comando SQL para excluir a tarefa

  const valores = [id];//lista com o id da tarefa

  banco.run(sql, valores, function (erro){//executa a exclusão no banco

    if (erro){//se der erro
      res.status(500).json({ erro: "Erro ao excluir tarefa." });
      return;//para tudo e nada acontece
    }

    res.json({ mensagem: "Tarefa excluída com sucesso." });//devolve mensagem de sucesso
  });
}

module.exports = {
  listarTarefas: listarTarefas,
  criarTarefa: criarTarefa,
  atualizarTarefa: atualizarTarefa,
  alterarStatus: alterarStatus,
  excluirTarefa: excluirTarefa
};//exporta todas as funções para serem usadas nas rotas