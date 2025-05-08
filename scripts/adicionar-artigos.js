async function handleSubmit(event) {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const authors = document.getElementById("authors").value;
  const abstract = document.getElementById("abstract").value;
  const keywords = document.getElementById("keywords").value;
  const theme = document.getElementById("theme").value;

  console.log(theme)

  const obj = {
    titulo: title,
    autores: authors,
    resumo: abstract,
    palavra_chave: keywords,
    area_tematica: theme,
    arquivo_pdf: 'teste',
    status: 'EM_AVALIACAO',
    id_autor: 1,
    id_evento: 1
  };

  async function requisicao(obj) {
    try {
      const response = await fetch('http://localhost:3000/artigos', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
      });

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      const data = response
      console.log("Artigo enviado com sucesso:", data);
      return data;
    } catch (error) {
      console.error("Erro ao enviar artigo:", error);
      alert("Erro ao enviar artigo. Verifique o console.");
      throw error;
    }
  }

  try {
    await requisicao(obj);

    const container = document.getElementById("artigos-container");

    const card = document.createElement("div");
    card.className = "col-12 mb-4 d-flex align-items-stretch";

    card.innerHTML = `
      <div class="card shadow h-100 w-100">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${title}</h5>
          <p><strong>Autores:</strong> ${authors}</p>
          <p><strong>Área:</strong> ${theme}</p>
          <p>${abstract}</p>
          <a href="#" class="btn btn-primary mt-auto">Ver PDF →</a>
        </div>
      </div>
    `;

    container.appendChild(card);
    document.getElementById("article-form").reset();
    document.getElementById("message").style.display = "block";
  } catch (err) {
    // erro já tratado na função requisicao
  }
}

const container = document.querySelector('#article-form');

container.addEventListener('submit', handleSubmit);
