document.addEventListener("DOMContentLoaded", () => {
    async function rest(){
    async function requisicao(){
        const artigosDinamicos = await fetch('http://localhost:3000/artigos/aproved')

        return await artigosDinamicos.json()
    }

    const artigosDinamicos  = await requisicao()

    console.log(artigosDinamicos)


    const destaqueContainer = document.getElementById("artigo-destaque");
    const listaContainer = document.getElementById("lista-artigos");

    artigosDinamicos.forEach(artigo => {
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
    }

    rest()
});

function criarCard(artigo) {
    const imgs = [
        'https://img.freepik.com/fotos-gratis/mulher-usando-simulador-de-realidade-virtual_23-2148910254.jpg?t=st=1746735300~exp=1746738900~hmac=d117908ececeaa7bcb79e29229735643d344a8cad907922a07e20718dbb32d58&w=740',
        'https://img.freepik.com/fotos-gratis/tecnologia-de-inteligencia-de-chip-ai-aprendizagem-profunda_53876-143122.jpg?t=st=1746735349~exp=1746738949~hmac=31c711b25b6ed5987c7d19f852978ec37378b5154ad1db7f3325c888269af603&w=740',
        'https://img.freepik.com/vetores-gratis/tecnologia-futurista-de-vetor-de-fundo-de-circuito-de-circulo-digital_53876-117800.jpg?t=st=1746735391~exp=1746738991~hmac=4d79752fb561ce3427c25b5612d0e7a75b0543167e65bbbc7a92a913e615b9fc&w=740',
        'https://img.freepik.com/vetores-gratis/conceito-de-ecologia-tecnologica_23-2148420634.jpg?t=st=1746735423~exp=1746739023~hmac=adb5121a77bfc72c59a1b867dc9ec6bcd9c01d7523916a2a5833be908d92f6b5&w=740',
        'https://img.freepik.com/fotos-gratis/3d-crustal-forma-das-particulas-wallpaper_1017-2740.jpg?t=st=1746735459~exp=1746739059~hmac=2da87fbe498f8e435c4c5472b3edef0011f89811af2c75df488528f3f59fd72c&w=740',
        'https://img.freepik.com/fotos-gratis/abstratos-geoma-ricas-fundo-futurista-desenho_1048-5529.jpg?t=st=1746735489~exp=1746739089~hmac=bd9dff7e02fcfe78ea50018f93686ae06e0ca15aa78e95f62c182b45beb00462&w=740',
        'https://img.freepik.com/fotos-gratis/close-de-folhas-verdes-crescendo-em-uma-superficie-musgosa_181624-8675.jpg?t=st=1746735525~exp=1746739125~hmac=ad6dc22d491d6ea6b84aed5b6c3bf7177a303d446593bddc7c07f77e41b2acc8&w=740'
    ]

    let aux = 0;

    const div = document.createElement("div");
    div.className = "card mb-4 shadow h-100"; 


    div.innerHTML = `
        <a href="${artigo.pdf}" target="_blank">
            <img class="card-img-top" src='${aux === 7 ? imgs[aux = 0] : imgs[aux + 1]}'>
        </a>
        <div class="card-body">
            <h2 class="card-title h4">${artigo.titulo}</h2>
            <p class="card-text"><strong>Autores:</strong> ${artigo.autores}<br><strong>Área:</strong> ${artigo.area_tematica}</p>
            <p class="card-text">${artigo.resumo}</p>
            <a class="btn btn-primary" href="${artigo.pdf}" target="_blank">Ver PDF →</a>
        </div>
    `;

    return div;
}
const col = document.createElement("div");
col.className = "col-lg-6 d-flex align-items-stretch"; 
col.appendChild(card);

