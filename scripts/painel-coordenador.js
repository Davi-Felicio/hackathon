document.addEventListener("DOMContentLoaded", () => {
    async function carregarSubmissoes() {
      try {
        const resposta = await fetch("http://localhost:3000/artigos/aproved");
        const artigos = await resposta.json();
  
        const tbody = document.getElementById("submissoes-recebidas");
        tbody.innerHTML = ""; // Limpa conteúdo estático
  
        artigos.forEach((artigo, index) => {
          const idAvaliacao = `avaliacoes${index}`;
  
          const linhaArtigo = document.createElement("tr");
          linhaArtigo.innerHTML = `
            <td>${artigo.titulo}</td>
            <td>${artigo.autores}</td>
            <td>${artigo.area_tematica}</td>
            <td><span class="badge ${statusBadge(artigo.status)}">${artigo.status}</span></td>
            <td><a href="${artigo.pdf}" class="btn btn-outline-primary btn-sm" target="_blank">Abrir</a></td>
            <td>
              <button class="btn btn-info btn-sm" data-toggle="collapse" data-target="#${idAvaliacao}">Ver</button>
            </td>
          `;
  
          const linhaAvaliacao = document.createElement("tr");
          linhaAvaliacao.className = "collapse";
          linhaAvaliacao.id = idAvaliacao;
  
          linhaAvaliacao.innerHTML = `
            <td colspan="6">
              <div class="card card-body">
                ${artigo.avaliacoes?.map((a, i) => `
                  <p><strong>Avaliador ${i + 1}:</strong></p>
                  <p><strong>Nota:</strong> ${a.nota}</p>
                  <p><strong>Para os autores:</strong> ${a.para_autores}</p>
                  <p><strong>Comentário interno:</strong> ${a.comentario_interno}</p>
                  ${i < artigo.avaliacoes.length - 1 ? "<hr>" : ""}
                `).join("") || "<p>Sem avaliações disponíveis.</p>"}
              </div>
            </td>
          `;
  
          tbody.appendChild(linhaArtigo);
          tbody.appendChild(linhaAvaliacao);
        });
      } catch (erro) {
        console.error("Erro ao carregar submissões:", erro);
      }
    }
  
    function statusBadge(status) {
      switch (status) {
        case "Aprovado":
          return "badge-success";
        case "Reprovado":
          return "badge-danger";
        case "Em Avaliação":
        default:
          return "badge-warning";
      }
    }
  
    carregarSubmissoes();
  });
  