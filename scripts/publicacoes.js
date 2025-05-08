document.addEventListener("DOMContentLoaded", () => {
    const artigos = [
        {
            titulo: "Inteligência Artificial na Educação",
            autores: "Maria Souza, João Lima",
            area: "Tecnologia",
            resumo: "Este artigo explora o uso de IA no processo educacional.",
            data: "1 de Maio de 2025",
            capa: "https://dummyimage.com/850x350/dee2e6/6c757d.jpg",
            pdf: "docs/artigo123.pdf",
            destaque: true
        },
        {
            titulo: "Gamificação na Aprendizagem",
            autores: "Lucas Andrade",
            area: "Educação",
            resumo: "Como jogos podem melhorar a aprendizagem.",
            data: "28 de Abril de 2025",
            capa: "https://dummyimage.com/700x350/dee2e6/6c757d.jpg",
            pdf: "docs/artigo124.pdf",
            destaque: false
        },
        {
            titulo: "Blockchain na Saúde Pública",
            autores: "Carla Menezes",
            area: "Saúde",
            resumo: "Aplicação da tecnologia blockchain na saúde pública.",
            data: "22 de Abril de 2025",
            capa: "https://dummyimage.com/700x350/dee2e6/6c757d.jpg",
            pdf: "docs/artigo125.pdf",
            destaque: false
        }
        // Adicione mais artigos aqui
    ];

    const destaqueContainer = document.getElementById("artigo-destaque");
    const listaContainer = document.getElementById("lista-artigos");

    artigos.forEach(artigo => {
        const card = criarCard(artigo);

        if (artigo.destaque) {
            destaqueContainer.innerHTML = "";
            destaqueContainer.appendChild(card);
        } else {
            const col = document.createElement("div");
            col.className = "col-lg-6";
            col.appendChild(card);
            listaContainer.appendChild(col);
        }
    });
});

function criarCard(artigo) {
    const div = document.createElement("div");
    div.className = "card mb-4 shadow h-100"; 


    div.innerHTML = `
        <a href="${artigo.pdf}" target="_blank">
            <img class="card-img-top" src="${artigo.capa}" alt="Capa do Artigo">
        </a>
        <div class="card-body">
            <div class="small text-muted">Publicado em: ${artigo.data}</div>
            <h2 class="card-title h4">${artigo.titulo}</h2>
            <p class="card-text"><strong>Autores:</strong> ${artigo.autores}<br><strong>Área:</strong> ${artigo.area}</p>
            <p class="card-text">${artigo.resumo}</p>
            <a class="btn btn-primary" href="${artigo.pdf}" target="_blank">Ver PDF →</a>
        </div>
    `;

    return div;
}
const col = document.createElement("div");
col.className = "col-lg-6 d-flex align-items-stretch"; 
col.appendChild(card);

