async function fetchPosts() {
  const response = await fetch('/api/posts');
  const data = await response.json();
  displayPosts(data.posts, data.comments);
}

function displayPosts(posts, comments) {
  const postContainer = document.getElementById('postContainer');
  postContainer.innerHTML = '';
  
  posts.forEach(post => {
      const postDiv = document.createElement('div');
      postDiv.classList.add('post');
      postDiv.innerHTML = `
          <p><strong>${post.username}:</strong> ${post.content}</p>
          <div class="comments">
              ${comments.filter(c => c.post_id === post.id).map(comment => `
                  <p><strong>${comment.username}:</strong> ${comment.content}</p>
              `).join('')}
              <textarea placeholder="Escreva um comentário..."></textarea>
              <button onclick="addComment(${post.id})">Comentar</button>
          </div>
      `;
      postContainer.appendChild(postDiv);
  });
}

async function addPost() {
  const content = document.getElementById('postContent').value;
  const userId = 1; // Supondo que o ID do usuário esteja disponível aqui
  await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, content })
  });
  document.getElementById('postContent').value = '';
  fetchPosts(); // Atualizar posts
}

async function addComment(postId) {
  const content = event.target.previousElementSibling.value;
  const userId = 1; // Supondo que o ID do usuário esteja disponível aqui
  await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, postId, content })
  });
  fetchPosts(); // Atualizar posts e comentários
}

fetchPosts(); // Chama ao carregar a página
