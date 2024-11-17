
const quadro_postando = document.getElementById('quadro_postando');
const botao_criar_post = document.querySelector('.botao');
const quadro_formulario = document.getElementById('quadro_formulario')

//Mostrar o quadro de postagem//
//Rolar a página até o final//
//Efeito de deixar o quadro mais para frente//
botao_criar_post.onclick = function(){
  quadro_postando.style.display = 'flex';
  window.scrollTo(0, document.body.scrollHeight);
  var fundo = document.getElementById('fundo')
  fundo.style.display = 'block'
};

// Adicionar evento para fechar o quadro roxo ao clicar no fundo
fundo.onclick = function () {
  quadro_postando.style.display = 'none';
  fundo.style.display = 'none';
};

quadro_formulario.addEventListener('click', function() {
  const novo_post = document.getElementById('novo_post');
  novo_post.style.position = 'absolute';
  novo_post.style.bottom = '0';
});

//Pegar os valores do quadro//
//Criar um objeto com os dados do formulário//
//Enviar os dados para o servidor//
async function enviar() {
  let titulo = document.getElementById("titulo").value;
  let legenda = document.getElementById("legenda").value;

    // Validação no frontend
    if (!titulo || !legenda) {
      alert("Por favor, preencha todos os campos!");
      return;
    }

  let dados = { titulo, legenda };
  console.log(dados);

  const response = await fetch('http://localhost:3020/api/store/forum', { 
      method: "POST",
      headers: { "Content-type": "application/json;charset=UTF-8" },
      body: JSON.stringify(dados)
  });

  console.log("Dados enviados para a API:", dados);

  if (!response.ok) {
    throw new Error(`Erro HTTP! status: ${response.status}`);
}
const content = await response.json();
  console.log(content);

  if (content.success) {
      getPosts();
      alert("Sua postagem foi realizada com sucesso!");
      quadro_postando.style.display = 'none';
      fundo.style.display = 'none';
  } else {
      alert("Não foi possível realizar sua postagem!");
      console.log(content.sql);
  }
};

//Selecionar o elemento 'sair' do quadro//
//Adicionar o evento 'clique'//
const sair = document.getElementById('sair');

sair.onclick = function(){
  quadro_postando.style.display = 'none';
  fundo.style.display = 'none';
};

//Esperar a página carregar//
//Buscar ports do servidor//
//Ler a resposta do servidor//
//Mostrar os dados no console//
// document.addEventListener('DOMContentLoaded', async () => {
  async function getPosts() {
    const response = await fetch('http://localhost:3020/api/getposts');
    const result = await response.json();
    console.log("Resposta do servidor:", result);



    if (result.success) {
        const postagem_final = document.getElementById('post-container');
        postagem_final.innerHTML = ""; // Limpar o contêiner antes de adicionar novos posts

        result.data.forEach(post => {
            const divCabecalho = document.createElement('div');
            const ulCabecalho = document.createElement('ul');
            const pPerfil = document.createElement('p');
            const imgPerfil = document.createElement('img');

            ulCabecalho.id = 'usuario';
            imgPerfil.src = "../../img/icone usuario.svg";
            imgPerfil.className = "icone_usuario";
            pPerfil.className = "perfil";
            pPerfil.innerText = post.nome;

            ulCabecalho.appendChild(imgPerfil);
            ulCabecalho.appendChild(pPerfil);

            divCabecalho.appendChild(ulCabecalho);

            postagem_final.appendChild(divCabecalho);

            const divPost = document.createElement('div');
            divPost.className = "post";
            const divTextos = document.createElement('div');
            divTextos.className = "textos";
            const h2titulo = document.createElement('h2');
            h2titulo.className = "titulo";
            h2titulo.innerText = post.titulo;
            const pLegenda = document.createElement('p');
            pLegenda.className = "legenda";
            pLegenda.innerText = post.legenda;

            divTextos.appendChild(h2titulo);
            divTextos.appendChild(pLegenda);

            divPost.appendChild(divTextos);

            postagem_final.appendChild(divPost);
        });
    }
};

getPosts();