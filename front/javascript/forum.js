const quadro_postando = document.getElementById('quadro_postando');
const botao_criar_post = document.querySelector('.botao');
const quadro_formulario = document.getElementById('quadro_formulario');

// Mostrar o quadro de postagem, rolar a página até o final e exibir o fundo com destaque.
// Ao clicar no botão de criar post, exibe o quadro de postagem e o fundo com efeito.
botao_criar_post.onclick = function() {
  quadro_postando.style.display = 'flex'; // Exibe o quadro de postagem.
  window.scrollTo(0, document.body.scrollHeight); // Rola a página até o final.
  var fundo = document.getElementById('fundo');
  fundo.style.display = 'block'; // Exibe o fundo com efeito de sobreposição.
};

// Adicionar evento para fechar o quadro de postagem ao clicar no fundo.
fundo.onclick = function () {
  quadro_postando.style.display = 'none'; // Oculta o quadro de postagem.
  fundo.style.display = 'none'; // Oculta o fundo.
};

// Adicionar um evento ao clicar no formulário, ajustando a posição do quadro.
quadro_formulario.addEventListener('click', function() {
  const novo_post = document.getElementById('novo_post');
  novo_post.style.position = 'absolute'; // Define a posição como absoluta.
  novo_post.style.bottom = '0'; // Posiciona o post no final da página.
});

// Função para enviar os dados do formulário ao servidor.
async function enviar() {
  let titulo = document.getElementById("titulo").value; // Obtém o título.
  let legenda = document.getElementById("legenda").value; // Obtém a legenda.

  // Validação simples no frontend para garantir que os campos não estejam vazios.
  if (!titulo || !legenda) {
    alert("Por favor, preencha todos os campos!");
    return; // Sai da função se a validação falhar.
  }

  let dados = { titulo, legenda }; // Cria um objeto com os dados do formulário.
  console.log(dados);

  // Envia os dados ao servidor via fetch.
  const response = await fetch('http://localhost:3020/api/store/forum', { 
    method: "POST",
    headers: { "Content-type": "application/json;charset=UTF-8" }, // Define o tipo de conteúdo.
    body: JSON.stringify(dados) // Converte o objeto em uma string JSON.
  });

  console.log("Dados enviados para a API:", dados);

  if (!response.ok) {
    throw new Error(`Erro HTTP! status: ${response.status}`);
  }

  const content = await response.json(); // Lê a resposta do servidor.
  console.log(content);

  if (content.success) {
    getPosts(); // Atualiza os posts exibidos.
    alert("Sua postagem foi realizada com sucesso!");
    quadro_postando.style.display = 'none'; // Oculta o quadro de postagem.
    fundo.style.display = 'none'; // Oculta o fundo.
  } else {
    alert("Não foi possível realizar sua postagem!");
    console.log(content.sql); // Exibe mensagens de erro relacionadas ao SQL no console.
  }
}

// Adiciona o evento para fechar o quadro de postagem ao clicar no botão "sair".
const sair = document.getElementById('sair');

sair.onclick = function() {
  quadro_postando.style.display = 'none'; // Oculta o quadro de postagem.
  fundo.style.display = 'none'; // Oculta o fundo.
};

// Função para buscar posts do servidor ao carregar a página.
async function getPosts() {
  const response = await fetch('http://localhost:3020/api/getposts'); // Faz a requisição à API.
  const result = await response.json(); // Lê a resposta em JSON.
  console.log("Resposta do servidor:", result);

  // Verifica se a resposta indica sucesso e exibe os posts.
  if (result.success) {
    const postagem_final = document.getElementById('post-container');
    postagem_final.innerHTML = ""; // Limpa o contêiner antes de adicionar novos posts.

    // Itera sobre cada post recebido do servidor e cria os elementos HTML dinamicamente.
    result.data.forEach(post => {
      const divCabecalho = document.createElement('div');
      const ulCabecalho = document.createElement('ul');
      const pPerfil = document.createElement('p');
      const imgPerfil = document.createElement('img');

      ulCabecalho.id = 'usuario';
      imgPerfil.src = "../../img/icone usuario.svg"; // Ícone de usuário.
      imgPerfil.className = "icone_usuario";
      pPerfil.className = "perfil";
      pPerfil.innerText = post.nome; // Nome do autor do post.

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
      h2titulo.innerText = post.titulo; // Título do post.
      const pLegenda = document.createElement('p');
      pLegenda.className = "legenda";
      pLegenda.innerText = post.legenda; // Legenda do post.

      divTextos.appendChild(h2titulo);
      divTextos.appendChild(pLegenda);
      divPost.appendChild(divTextos);
      postagem_final.appendChild(divPost);
    });
  }
}

getPosts(); // Chama a função para buscar e exibir os posts ao carregar o script.
