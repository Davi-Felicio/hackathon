document.addEventListener("DOMContentLoaded", () => {
    const page = document.body.getAttribute("data-page");
  
    switch (page) {
      case "register":
        initCadastro();
        break;
      case "login":
        initLogin();
        break;
      case "enviar-artigo":
        initEnvioArtigo();
        break;
      case "avaliar-artigos":
        initAvaliacao();
        break;
      case "em-aprovacao":
        initListagemArtigos();
        break;
      case "publicacoes":
        initPublicacoes();
        break;
    }
  });
  
  function initCadastro() {
    const form = document.querySelector("form.user");
    if (!form) return;
  
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const payload = {
        firstName: document.getElementById("exampleFirstName").value,
        lastName: document.getElementById("exampleLastName").value,
        email: document.getElementById("exampleInputEmail").value,
        password: document.getElementById("exampleInputPassword").value,
      };
      const r = await registrarUsuario(payload);
      alert("Conta criada com sucesso!");
      window.location.href = "login.html";
    });
  }
  
  function initLogin() {
    const form = document.querySelector("form.user");
    if (!form) return;
  
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const payload = {
        email: document.getElementById("exampleInputEmail").value,
        password: document.getElementById("exampleInputPassword").value,
      };
      const r = await loginUsuario(payload);
      if (r.token) {
        localStorage.setItem("token", r.token);
        window.location.href = "index.html";
      } else {
        alert("Erro ao logar");
      }
    });
  }
  
  function initEnvioArtigo() {
    const form = document.getElementById("article-form");
    if (!form) return;
  
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const r = await enviarArtigo(formData);
      document.getElementById("message").style.display = "block";
    });
  }
  
  function initAvaliacao() {
    const form = document.getElementById("review-form");
    if (!form) return;
  
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const dados = {
        artigoId: form.dataset.artigoId || "123", // você pode ajustar isso dinamicamente
        nota: parseFloat(document.getElementById("score").value),
        comentariosAutor: document.getElementById("commentsAuthor").value,
        comentariosCoordenador: document.getElementById("commentsCoordinator").value,
        decisao: document.getElementById("finalDecision").value,
      };
      await enviarAvaliacao(dados);
      document.getElementById("reviewMessage").style.display = "block";
    });
  }
  
  function initListagemArtigos() {
    // Implementar listagem de artigos em aprovação
    // Exemplo:
    // listarArtigosAutor().then(data => { ... });
  }
  
  function initPublicacoes() {
    // Implementar listagem de artigos publicados
    // Exemplo:
    // listarPublicacoes().then(data => { ... });
  }
  