// Função para enviar uma nova postagem
// async function sendPost() {
//   const message = document.getElementById("postMessage").value;
//   if (message) {
//       await fetch('/posts', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ message })
//       });
//       document.getElementById("postMessage").value = '';
//       loadPosts();
//   }
// }

async function sendPost() {
  const message = document.getElementById("postMessage").value;
  if (message) {
      try {
          const response = await fetch('http://localhost:3020/posts', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ message })
          });
          if (!response.ok) throw new Error('Erro ao enviar post');
          document.getElementById("postMessage").value = '';
          loadPosts();
      } catch (error) {
          console.error('Erro:', error);
      }
  }
}


// Carregar as postagens e comentários
async function loadPosts() {
  const res = await fetch('/posts');
  const posts = await res.json();
  const container = document.getElementById("postsContainer");
  container.innerHTML = '';

  posts.forEach(post => {
      const postDiv = document.createElement('div');
      postDiv.classList.add('post');
      postDiv.innerHTML = `
          <p>${post.message}</p>
          <button onclick="deletePost(${post.id})">Excluir</button>
          <textarea placeholder="Comente aqui..."></textarea>
          <button onclick="sendComment(${post.id}, this.previousElementSibling.value)">Enviar</button>
          <div class="comments"></div>
      `;
      post.comments.forEach(comment => {
          const commentDiv = document.createElement('div');
          commentDiv.classList.add('comment');
          commentDiv.innerHTML = `
              <p>${comment.text}</p>
              <button onclick="deleteComment(${comment.id})">Excluir</button>
          `;
          postDiv.querySelector('.comments').appendChild(commentDiv);
      });
      container.appendChild(postDiv);
  });
}

// Funções para excluir postagens e comentários
async function deletePost(id) {
  await fetch(`/posts/${id}`, { method: 'DELETE' });
  loadPosts();
}

async function sendComment(postId, text) {
  if (text) {
      await fetch(`/comments`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ postId, text })
      });
      loadPosts();
  }
}

async function deleteComment(id) {
  await fetch(`/comments/${id}`, { method: 'DELETE' });
  loadPosts();
}

// Carregar postagens ao iniciar
window.onload = loadPosts;
