import axios from "axios";

// Criamos uma conexão padrão com o backend.
// Assim, não precisamos escrever http://localhost:3333 toda hora.
export const api = axios.create({
    baseURL: "http://localhost:3333"
});