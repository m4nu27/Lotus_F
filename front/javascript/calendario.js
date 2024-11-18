// Seleciona elementos do DOM que serão manipulados no código
const daysTag = document.querySelector(".days"); // Contêiner dos dias do calendário
const currentDate = document.querySelector(".current-date"); // Exibe o mês e ano atuais
const prevNextIcon = document.querySelectorAll(".icons span"); // Ícones de navegação (anterior e próximo)
const registroEmoji = document.querySelector('.registroEmoji'); // Caixa de registro de emoções
const fundo = document.querySelector('.fundo'); // Fundo que aparece ao abrir o registro de emoções

// Configura o botão de voltar para navegar à página anterior
const backButton = document.getElementById('back-button');
backButton.addEventListener('click', function() {
    window.history.back(); // Retorna à página anterior no histórico
});

// Obtém a data atual e inicializa variáveis para o ano e mês
let date = new Date(),
    currYear = date.getFullYear(),
    currMonth = date.getMonth();

// Array com os nomes dos meses
const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho",
                "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

// Função para renderizar o calendário na tela
const renderCalendar = () => {
    // Calcula os dias relevantes para o calendário
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // Primeiro dia do mês
        lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // Última data do mês atual
        lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // Último dia do mês
        lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // Última data do mês anterior
    
    let liTag = "";

    // Adiciona os dias do mês anterior ao calendário
    for (let i = firstDayofMonth; i > 0; i--) {
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }

    // Adiciona os dias do mês atual ao calendário
    for (let i = 1; i <= lastDateofMonth; i++) {
        let isToday = i === date.getDate() && currMonth === new Date().getMonth()
                     && currYear === new Date().getFullYear() ? "active" : ""; // Marca o dia atual
        liTag += `<li class="${isToday}" onclick="abrirDia(${i}, ${currMonth + 1}, ${currYear})" data-dia="${i}">${i}</li>`;
    }

    // Adiciona os dias do próximo mês ao calendário
    for (let i = lastDayofMonth; i < 6; i++) { 
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
    }

    // Atualiza o mês/ano atual e insere os dias no calendário
    currentDate.innerText = `${months[currMonth]} ${currYear}`;
    daysTag.innerHTML = liTag;
};

// Chama a função para renderizar o calendário inicial
renderCalendar();

// Adiciona eventos de clique aos ícones de navegação do calendário
prevNextIcon.forEach(icon => { 
    icon.addEventListener("click", () => { 
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

        // Ajusta o ano ao mudar de dezembro para janeiro ou vice-versa
        if (currMonth < 0 || currMonth > 11) {
            date = new Date(currYear, currMonth, new Date().getDate());
            currYear = date.getFullYear(); 
            currMonth = date.getMonth(); 
        } else {
            date = new Date(); 
        }
        renderCalendar(); // Re-renderiza o calendário
    });
});

// Função para abrir o registro de um dia selecionado
async function abrirDia(dia, mes, ano) {
    const diaFormatado = dia.toString().padStart(2, '0'); // Formata o dia para dois dígitos
    const mesFormatado = mes.toString().padStart(2, '0'); // Formata o mês para dois dígitos
    const dataSelecionada = `${ano}-${mesFormatado}-${diaFormatado}`; // Formata a data no padrão AAAA-MM-DD

    // Exibe a caixa de registro e o fundo
    registroEmoji.style.display = 'block';
    fundo.style.display = 'block';

    // Mostra a data selecionada
    document.getElementById("dia").innerHTML = `Dia: ${dia}/${mes}/${ano}`;

    try {
        // Busca as emoções registradas para a data selecionada
        const response = await fetch(`http://127.0.0.1:3020/api/obter-emocoes${dataSelecionada}`);
        const emocoes = await response.json();

        // Se encontrar registros, exibe a emoção e observação
        if (emocoes.data.length > 0) {
            alert(`Registro encontrado: Emoção - ${emocoes.data[0].emocao}, Observação - ${emocoes.data[0].observacao}`);
            selectedEmotion.textContent = `Você registrou: ${emocoes.data[0].emocao}`;
            observations.value = emocoes.data[0].observacao;
        } else {
            selectedEmotion.textContent = ''; // Limpa os campos se não houver registro
            observations.value = '';
        }
    } catch (error) {
        console.error('Erro ao obter emoções:', error); // Loga erros na busca
    }

    // Permite fechar o registro ao clicar no fundo
    fundo.onclick = fecharRegistro;
}

// Função para fechar o registro de emoções
function fecharRegistro() {
    registroEmoji.style.display = 'none';
    fundo.style.display = 'none';
}

// Configura o registro de emoções
const emojis = document.querySelectorAll('.emoji'); // Emojis disponíveis
const selectedEmotion = document.getElementById('selected-emotion'); // Exibe a emoção selecionada
const observations = document.getElementById('observations'); // Campo de observações
const submitButton = document.getElementById('submit'); // Botão de envio
let currentEmotion = ''; // Armazena a emoção atual

// Remove a classe "selected" de todos os emojis
function removeSelectedClass() {
    emojis.forEach(emoji => {
        emoji.classList.remove('selected');
    });
}

// Adiciona evento de clique para selecionar uma emoção
emojis.forEach(emoji => {
    emoji.addEventListener('click', function() {
        removeSelectedClass(); // Remove seleção anterior
        currentEmotion = this.dataset.emotion; // Define a emoção selecionada
        selectedEmotion.textContent = `Você está se sentindo: ${currentEmotion}`; // Atualiza o texto
        this.classList.add('selected'); // Adiciona a classe "selected" ao emoji clicado
    });
});

// Evento de clique no botão de envio
submitButton.addEventListener('click', async function() {
    if (currentEmotion && observations.value) {
        const selectedDate = document.getElementById("dia").textContent.split(": ")[1];
        const data = {
            data: selectedDate,
            emocao: currentEmotion,
            observacao: observations.value
        };

        try {
            // Envia o registro de emoção para o servidor
            const response = await fetch('http://127.0.0.1:3020/api/registrar-emocao', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                alert('Emoção registrada com sucesso!'); // Sucesso
                removeSelectedClass(); // Limpa a seleção
                selectedEmotion.textContent = '';
                observations.value = '';
                fecharRegistro(); // Fecha o registro
            } else {
                alert('Ocorreu um erro ao registrar a emoção.'); // Erro
            }
        } catch (error) {
            console.error('Erro:', error); // Loga o erro
        }
    } else {
        alert('Por favor, selecione uma emoção e faça suas observações.'); // Validação
    }
});
