document.addEventListener('DOMContentLoaded', function () {
    const topics = [];
    const discussion = {};

    const addTopicBtn = document.getElementById('add-topic-btn');
    const topicsList = document.getElementById('topics');
    const newTopicTitle = document.getElementById('new-topic-title');
    const newTopicContent = document.getElementById('new-topic-content');
    const discussionSection = document.querySelector('.discussion');
    const discussionTitle = document.getElementById('discussion-title');
    const discussionMessages = document.getElementById('discussion-messages');
    const newMessage = document.getElementById('new-message');
    const sendMessageBtn = document.getElementById('send-message-btn');
    const backToTopicsBtn = document.getElementById('back-to-topics-btn');

    // Adicionar novo tópico
    addTopicBtn.addEventListener('click', function () {
        const title = newTopicTitle.value.trim();
        const content = newTopicContent.value.trim();

        if (title && content) {
            const topic = {
                id: topics.length + 1,
                title: title,
                content: content,
                messages: []
            };
            topics.push(topic);
            renderTopics();
            newTopicTitle.value = '';
            newTopicContent.value = '';
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    });

    // Renderizar lista de tópicos
    function renderTopics() {
        topicsList.innerHTML = '';
        topics.forEach(topic => {
            const li = document.createElement('li');
            li.textContent = topic.title;
            li.dataset.id = topic.id;
            li.addEventListener('click', function () {
                openDiscussion(topic.id);
            });
            topicsList.appendChild(li);
        });
    }

    // Abrir discussão de um tópico
    function openDiscussion(topicId) {
        const topic = topics.find(t => t.id == topicId);
        discussionSection.style.display = 'block';
        document.querySelector('.topics-list').style.display = 'none';
        document.querySelector('.new-topic').style.display = 'none';
        discussionTitle.textContent = topic.title;
        discussion.messages = topic.messages;
        renderMessages();
    }

    // Renderizar as mensagens da discussão
    function renderMessages() {
        discussionMessages.innerHTML = '';
        discussion.messages.forEach(message => {
            const li = document.createElement('li');
            li.textContent = message;
            discussionMessages.appendChild(li);
        });
    }

    // Enviar nova mensagem
    sendMessageBtn.addEventListener('click', function () {
        const message = newMessage.value.trim();
        if (message) {
            discussion.messages.push(message);
            newMessage.value = '';
            renderMessages();
        } else {
            alert('Por favor, escreva uma mensagem.');
        }
    });

    // Voltar para a lista de tópicos
    backToTopicsBtn.addEventListener('click', function () {
        discussionSection.style.display = 'none';
        document.querySelector('.topics-list').style.display = 'block';
        document.querySelector('.new-topic').style.display = 'block';
    });
});
