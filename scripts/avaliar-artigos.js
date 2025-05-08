const conteinerArtigos = document.querySelector('#artigos')
const containerArtigoById = document.querySelector('.containerById')

// async function persistencia(event) {
//     event.preventDefault();
  
//     const idArtigo = containerArtigoById.querySelector('.card').dataset.id;
//     const nota = Number(document.getElementById('score').value);
//     const comentario_autor = document.getElementById('commentsAuthor').value;
//     const comentario_coordenador = document.getElementById('commentsCoordinator').value;
//     const decisao_final = document.getElementById('finalDecision').value;
  
//     const payload = {
//       nota,
//       decisao_final: decisao_final.toUpperCase(),
//       comentario_autor,
//       comentario_coordenador,
//       id_artigo: Number(idArtigo),
//       id_avaliador: 2
//     };
  
//     try {
//       const response = await fetch('http://localhost:3000/artigos', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(payload)
//       });
  
//       if (!response.ok) {
//         throw new Error(`Erro ao enviar avaliação: ${response.status}`);
//       }
  
//       document.getElementById('reviewMessage').style.display = 'block';
//       document.getElementById('review-form').reset();
//       console.log("Avaliação enviada com sucesso!");
//     } catch (error) {
//       console.error("Erro ao enviar avaliação:", error);
//       alert("Erro ao enviar avaliação. Verifique o console.");
//     }
//   }
  
async function fetchId(id) {
    const response = await fetch(`http://localhost:3000/artigos/byid/${id}`);
    const data = await response.json();
  
    const div = document.createElement('div');
  
    div.innerHTML = `
      <div class="row">
        <div class="col-lg-10">
          <div class="card mb-4" data-id="${data.id}">
            <div class="card-header">Avaliação de Artigos Atribuídos</div>
            <div class="card-body">
              <div class="mb-4">
                <h5><strong>Título do Artigo:</strong> ${data.titulo}</h5>
                <p><strong>Área Temática:</strong> ${data.area_tematica}</p>
                <p><strong>Resumo:</strong> ${data.resumo}</p>
                <a href="docs/artigo123.pdf" target="_blank" class="btn btn-outline-primary btn-sm">
                  Ver PDF do Artigo
                </a>
              </div>
  
              <form id="review-form">
                <div class="form-group">
                  <label for="score">Nota (0 a 10)</label>
                  <input type="number" min="0" max="10" step="0.1" class="form-control" id="score" required>
                </div>
  
                <div class="form-group">
                  <label for="commentsAuthor">Comentários para os Autores</label>
                  <textarea class="form-control" id="commentsAuthor" rows="3" required></textarea>
                </div>
  
                <div class="form-group">
                  <label for="commentsCoordinator">Comentários para o Coordenador</label>
                  <textarea class="form-control" id="commentsCoordinator" rows="2" required></textarea>
                </div>
  
                <div class="form-group">
                  <label for="finalDecision">Decisão Final</label>
                  <select class="form-control" id="finalDecision" required>
                    <option value="">Selecione...</option>
                    <option value="aprovado">Aprovar</option>
                    <option value="revisao">Solicitar Revisão</option>
                    <option value="rejeitado">Rejeitar</option>
                  </select>
                </div>
  
                <button id="btn" type="submit" class="btn btn-success">Enviar Avaliação</button>
                <p id="reviewMessage" class="mt-3 text-success" style="display: none;">Avaliação enviada com sucesso!</p>
              </form>
            </div>
          </div>
        </div>
      </div>
    `;

  
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
    
async function fetchArtigos(){

    const response = await fetch('http://localhost:3000/artigos/all')

    const data = await response.json()

    data.forEach(element => {
        const div = document.createElement('div');
        div.id = element.id;
        div.style.cssText = `
          width: 250px;
          height: 250px;
          box-shadow: 5px 6px 23px -8px rgba(0,0,0,0.66);
          -webkit-box-shadow: 5px 6px 23px -8px rgba(0,0,0,0.30);
          -moz-box-shadow: 5px 6px 23px -8px rgba(0,0,0,0.30);
          cursor: pointer;
          padding: 10px;
        `;
    
        div.innerHTML = `
          <p style="text-align: center;">${element.titulo}</p>
          <p style="text-align: center;">${element.resumo}</p>
        `;
    
        div.addEventListener('click', () => fetchId(element.id));
        conteinerArtigos.appendChild(div);    });
}

fetchArtigos()