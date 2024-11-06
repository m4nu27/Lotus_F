// forum.js
document.addEventListener("DOMContentLoaded", () => {
  const messageForm = document.getElementById("messageForm");
  const messagesContainer = document.getElementById("messagesContainer");

  // Carrega todas as mensagens
  async function loadMessages() {
    const response = await fetch('/api/messages');
    const messages = await response.json();
    messagesContainer.innerHTML = ''; // Limpa antes de renderizar
    messages.forEach(renderMessage);
  }

  // Função para renderizar uma mensagem e seus comentários
  function renderMessage(message) {
    const messageDiv = document.createElement("div");
    messageDiv.className = "message";
    messageDiv.innerHTML = `
      <h4>${message.username}</h4>
      <p>${message.content}</p>
      <div class="comments"></div>
      <form class="commentForm" data-id="${message.id}">
        <input type="text" placeholder="Escreva um comentário..." required />
        <button type="submit">Comentar</button>
      </form>
    `;
    messagesContainer.appendChild(messageDiv);
  }

  // Envia nova mensagem
  messageForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const content = e.target.content.value;
    await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, content })
    });
    loadMessages();
    messageForm.reset();
  });

  // Envia novo comentário
  messagesContainer.addEventListener("submit", async (e) => {
    if (e.target.classList.contains("commentForm")) {
      e.preventDefault();
      const commentForm = e.target;
      const messageId = commentForm.getAttribute("data-id");
      const comment = commentForm.querySelector("input").value;
      await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messageId, username: "User", comment })
      });
      loadMessages();
    }
  });

  loadMessages(); // Carrega as mensagens ao iniciar
});
