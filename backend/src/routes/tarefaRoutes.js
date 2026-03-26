const express = require("express");//importa o express para poder criar as rotas

const rotas = express.Router();//cria um agrupamento de rotas que vai guardar as rotas das tarefas

const controladorTarefas = require("../controller/tarefaController");//importa o arquivo controller das tarefas

rotas.get("/tarefas", controladorTarefas.listarTarefas);//rota para listar todas as tarefas

rotas.post("/tarefas", controladorTarefas.criarTarefa);//rota para cadastrar uma nova tarefa

rotas.put("/tarefas/:id", controladorTarefas.atualizarTarefa);//rota para atualizar uma tarefa pelo id

rotas.patch("/tarefas/:id/status", controladorTarefas.alterarStatus);//rota para alterar somente o status de uma tarefa pelo id

rotas.delete("/tarefas/:id", controladorTarefas.excluirTarefa);//rota para excluir uma tarefa pelo id

module.exports = rotas;//exporta as rotas para serem usadas no app.js