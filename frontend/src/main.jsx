import React from 'react' //sintaxe do React no projeto
import ReactDOM from 'react-dom/client' //serve pra mostrar o app na tela do navegador
import App from './App.jsx' //importa o arquivo App.jsx

ReactDOM.createRoot(document.getElementById('root')).render(
// procura no index.html o elemento com id="root" e cria nele onde o react vai aparecer
  <App />//mostra o app aqui
)