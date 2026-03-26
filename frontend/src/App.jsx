import { useEffect, useState } from "react";//importa useEffect e useState do React
import api from "./api";//importa o arquivo api.js para fazer conexão com o backend
import "./App.css";//importa o CSS da página

function App() {//cria o componente principal chamado App
 
//constantes-----------------------------------------------------------------------
  const [tarefas, setTarefas] = useState([]);//seta a lista de tarefas

  const [titulo, setTitulo] = useState("");//seta o valor do campo título

  const [descricao, setDescricao] = useState("");//seta o valor do campo descrição  

  const [status, setStatus] = useState("Pendente");//seta o status da tarefa e começa como pendente

  const [prioridade, setPrioridade] = useState("Média");//seta a prioridade da tarefa e começa como média

  const [busca, setBusca] = useState("");//seta o texto digitado no campo de busca

  const [filtroStatus, setFiltroStatus] = useState("");//seta o status escolhido no filtro

  const [idEditando, setIdEditando] = useState(null);//seta o id da tarefa que está sendo editada e se for null está cadastrando uma nova

//funções--------------------------------------------------------------------------
  function buscarTarefas() {//função para buscar as tarefas no backend
    
    let dadosFiltro = {};//cria um objeto vazio pra receber os filtros
    
    if (busca !== "") {//se campo de busca for diferente de vazio
      dadosFiltro.busca = busca;//adiciona a busca no objeto
    }

    dadosFiltro.status = filtroStatus;//nao precisa ver se o campo esta vazio por que nunca esta vazio
    
    api.get("/tarefas", { params: dadosFiltro })//busca no backend com o objeto dadosFiltro
      
      .then(function(resposta) {//quando a resposta chegar
        
        setTarefas(resposta.data);//guarda as tarefas no estado
      })
      .catch(function(erro) {// se der erro
        console.log("Erro ao buscar tarefas"); //mensagem de erro
        console.log(erro);
      });
  }


  useEffect(function () {//executa quando a pagina abre
    buscarTarefas();
  }, [busca, filtroStatus]);//e tambem quando busca ou filtroStatus mudam

  function limparCampos() {//limpa os campos do formulario para o usuario nao precisar
    
    setTitulo("");//limpa o título
    
    setDescricao("");//limpa a descrição
    
    setStatus("Pendente");//volta o status para Pendente
    
    setPrioridade("Média");//volta a prioridade para Média
    
    setIdEditando(null);//sai do modo de edição
  }

  function salvarTarefa(evento) {//função cadastrar ou atualizar tarefa

    let tarefa = {};//cria um objeto vazio da tarefa

    tarefa.titulo = titulo;//coloca o título digitado

    tarefa.descricao = descricao;//coloca a descrição digitada
    
    tarefa.prioridade = prioridade;//coloca a prioridade escolhida
    
    if (idEditando === null) {//se não estiver editando

      tarefa.status = "Pendente";//ao criar, o status sempre será Pendente

    } else {//caso estiver editando

      tarefa.status = status;//usa o status escolhido no formulario, podendo remover o pendente
    }

    if (idEditando === null) {//se não estiver editando, faz cadastro
      
      api.post("/tarefas", tarefa)//joga na pasta tarefas
        .then(function () {//se cadastrar com sucesso
          
          alert("Tarefa cadastrada com sucesso!");//mostra mensagem
       
          limparCampos();//limpa o formulario
          
          buscarTarefas();//atualiza a lista
        })
        .catch(function () {//caso de erro
          
          alert("Erro ao salvar tarefa");//mostra mensagem
        });

    } else {//se estiver editando, faz atualização
      
      api.put("/tarefas/" + idEditando, tarefa)//pasta tarefas
        .then(function () {//se atualizar com sucesso
          
          alert("Tarefa atualizada com sucesso!");// mostra mensagem

          limparCampos();//limpa o formulario

          buscarTarefas();//atualiza a lista
        })
        .catch(function () {//caso de erro

          alert("Erro ao salvar tarefa");//mostra mensagem
        });
    }
  }

  function editarTarefa(tarefa) {//coloca os dados da tarefa no formulario para editar
    
    setTitulo(tarefa.titulo);//coloca o título da tarefa no campo titulo
    
    setDescricao(tarefa.descricao);//coloca a descrição da tarefa no campo descrição
  
    setStatus(tarefa.status);//coloca o status da tarefa no campo status

    setPrioridade(tarefa.prioridade);//coloca a prioridade da tarefa no campo prioridade

    setIdEditando(tarefa.id);//guarda o id da tarefa para saber que esta editando
  }

  function mudarStatus(tarefa) {//função para mudar o status da tarefa

    let proxStatus = "";//variavel que vai guardar o próximo status

    if (tarefa.status === "Pendente") {
      proxStatus = "Em andamento";
    } else if (tarefa.status === "Em andamento") {
      proxStatus = "Concluída";
    } else{
      return;//se ja estiver concluido, nada acontece
    }

    api.patch("/tarefas/" + tarefa.id + "/status", {status: proxStatus})
      .then(function () {buscarTarefas()})
      .catch(function (){alert("Erro ao mudar status")});
  }

  function excluirTarefa(id) {// função para excluir uma tarefa
  
    let confirmar = window.confirm("Deseja excluir esta tarefa?");//pergunta se o usuario tem certeza

    if (confirmar === false) {//se o usuario clicar em cancelar
      
      return;//nada acontece
    }

    api.delete("/tarefas/" + id)//se usuario concordar em excluir
    
      .then(function() {//se excluir com sucesso
        
        buscarTarefas();//atualiza a lista
      })
      .catch(function() {//caso de erro
 
        alert("Erro ao excluir tarefa");//mostra mensagem
      });
  }

  return (
    <div className="container">
    
      <div className="topo">
     
        <div className="filtros">
      
          <h2>Filtros</h2>
       
          <input type="text" placeholder="Buscar pelo título" value={busca}
            onChange={function(texto) { setBusca(texto.target.value)}}/>
         
          <select value={filtroStatus}
            onChange={function(filtro) { setFiltroStatus(filtro.target.value)}}>

            <option value="">Todos os status</option>
            <option value="Pendente">Pendente</option>
            <option value="Em andamento">Em andamento</option>
            <option value="Concluída">Concluída</option>
          </select>
      
        </div>

        <div className="tarefas-area">
      
          <h2>Tarefas</h2>
       
          <div className="lista">
          
            {tarefas.length === 0 ? (<p>Nenhuma tarefa encontrada.</p>)// se não houver tarefas, mostra essa mensagem                 
             : (
              tarefas.map(function (tarefa) {//percorre todas as tarefas e cria um card para cada uma
                //cards serao assim 
                return (
                  <div className="card" key={tarefa.id}>             

                    <h3>{tarefa.titulo}</h3>

                    <p>{tarefa.descricao}</p>

                    <p>Status: {tarefa.status}</p>

                    <p>Prioridade: {tarefa.prioridade}</p>

                    <p>Data:{new Date(tarefa.data_criacao).toLocaleString("pt-BR")}</p>

                    <div className="botoes">
                      <button onClick={function () {mudarStatus(tarefa)}}>
                        Mudar status
                      </button>

                      <button onClick={function() { editarTarefa(tarefa)}}>
                        Editar
                      </button>

                      <button onClick={function() { excluirTarefa(tarefa.id)}}>
                        Excluir
                      </button>
                     
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      <div className="formulario-area">

        <h1>Gerenciador de Tarefas</h1>

        <form className="formulario" onSubmit={salvarTarefa}>

          <input type="text" placeholder="Digite o título" value={titulo}
            onChange={function(tit) {setTitulo(tit.target.value)}}
          />
      
          <textarea placeholder="Digite a descrição" value={descricao}
            onChange={function(desc) {setDescricao(desc.target.value)}}
          />
          
          {idEditando !== null && (<select value={status}
              onChange={function(stat) {setStatus(stat.target.value)}}
            >
              <option value="Pendente">Pendente</option>
              <option value="Em andamento">Em andamento</option>
              <option value="Concluída">Concluída</option>
            </select>
          )}
          
          <select value={prioridade} onChange={function(prior) {setPrioridade(prior.target.value)}}>

            <option value="Baixa">Baixa</option>
            <option value="Média">Média</option>
            <option value="Alta">Alta</option>

          </select>

          <button type="submit"> Enviar tarefa </button>
          
        </form>
      </div>
    </div>
  );
}

export default App;//exporta o componente App
