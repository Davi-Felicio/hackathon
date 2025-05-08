const API_URL = "http://localhost:3000";

// Cadastro de usuário
async function registrarUsuario({ firstName, lastName, email, password }) {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ firstName, lastName, email, password }),
  });
  return await res.json();
}

// Login
async function loginUsuario({ email, password }) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return await res.json();
}

// Enviar artigo
async function enviarArtigo(formData) {
  const res = await fetch(`${API_URL}/artigos`, {
    method: "POST",
    body: formData,
  });
  return await res.json();
}

// Avaliar artigo
async function enviarAvaliacao(avaliacao) {
  const res = await fetch(`${API_URL}/avaliacoes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(avaliacao),
  });
  return await res.json();
}

// Listar artigos do autor
async function listarArtigosAutor() {
  const res = await fetch(`${API_URL}/artigos/autor`);
  return await res.json();
}

// Listar publicações aprovadas
async function listarPublicacoes() {
  const res = await fetch(`${API_URL}/publicacoes`);
  return await res.json();
}
