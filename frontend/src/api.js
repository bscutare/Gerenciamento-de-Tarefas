import axios from "axios"; //serve para fazer requisições http

const api = axios.create({//cria uma configuração personalizada do axios.

  baseURL: "http://localhost:3001"//define a URL da API.
});

export default api;//exporta essa constante para usar em outros arquivos.
