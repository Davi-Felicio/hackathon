
  function handleSubmit(event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const authors = document.getElementById("authors").value;
    const abstract = document.getElementById("abstract").value;
    const keywords = document.getElementById("keywords").value;
    const theme = document.getElementById("theme").value;

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
  }

