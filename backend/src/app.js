const express = require("express");//importa o express, ele vai ser usado para criar o servidor

const cors = require("cors");//importa o cors que permite que o frontend consiga conversar com o backend

const rotasTarefas = require("./routes/tarefaRoutes");//importa o arquivo de rotas das tarefas

const app = express();//cria o app 

app.use(cors());//permite acesso do frontend ao backend

app.use(express.json());//servidor entende dados em formato JSON

app.use(rotasTarefas);//manda o app usar as rotas das tarefas

module.exports = app;//exporta o app para ser usado no server.js