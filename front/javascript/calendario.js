// Seleção dos elementos DOM necessários
const daysTag = document.querySelector(".days"),
currentDate = document.querySelector(".current-date"),
prevNextIcon = document.querySelectorAll(".icons span");

// Botão de voltar
const backButton = document.getElementById('back-button');
backButton.addEventListener('click', function() {
    window.history.back();  // Volta para a página anterior
});

// Variáveis de controle de data
let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();

// Array de meses em português
const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho",
              "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

// Função que renderiza o calendário na tela
const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(),
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(),
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
    let liTag = "";

    // Preenche os dias do mês anterior que aparecem no calendário atual
    for (let i = firstDayofMonth; i > 0; i--) {
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }

    // Preenche os dias do mês atual
    for (let i = 1; i <= lastDateofMonth; i++) {
        let isToday = i === date.getDate() && currMonth === new Date().getMonth()
                     && currYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}" onclick="abrirDia(${i}, ${currMonth + 1}, ${currYear})">${i}</li>`;
    }

    // Preenche os primeiros dias do próximo mês que aparecem no calendário atual
    for (let i = lastDayofMonth; i < 6; i++) { 
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
    }

    currentDate.innerText = `${months[currMonth]} ${currYear}`;
    daysTag.innerHTML = liTag;
};

// Renderiza o calendário inicialmente
renderCalendar();

// Navegação entre meses
prevNextIcon.forEach(icon => { 
    icon.addEventListener("click", () => { 
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

        if (currMonth < 0 || currMonth > 11) {
            date = new Date(currYear, currMonth, new Date().getDate());
            currYear = date.getFullYear(); 
            currMonth = date.getMonth(); 
        } else {
            date = new Date(); 
        }
        renderCalendar();
    });
});

// Função que é chamada ao clicar em um dia do calendário
function abrirDia(dia, mes, ano) {
    // Exibe a div de registro de emoji
    const registroEmoji = document.querySelector('.registroEmoji');
    registroEmoji.style.display = 'block'; // Exibe a div
    document.getElementById("dia").innerHTML = `Dia: ${dia}/${mes}/${ano}`

    // Opcional: se quiser rolar a página até a div exibida
    registroEmoji.scrollIntoView({ behavior: 'smooth' });

    console.log("Dia selecionado:", dia, mes, ano);
}


document.getElementsByClassName('registroEmoji').style.display = "block" 

// Emojis e observações
const emojis = document.querySelectorAll('.emoji');
const selectedEmotion = document.getElementById('selected-emotion');
const observations = document.getElementById('observations');
const submitButton = document.getElementById('submit');
let currentEmotion = '';

const dia = document.querySelectorAll('.days');
const quadro_emocoes = document.querySelectorAll('.registro');

dia.onclick = function(){
    quadro_emocoes.style.display = 'flex';
    window.scrollTo(0, document.body.scrollHeight);
    var fundo = document.getElementById('fundo');
    fundo.style.display = 'block';
}

// Função para remover a seleção de todos os emojis
function removeSelectedClass() {
    emojis.forEach(emoji => {
        emoji.classList.remove('selected');
    });
}

// Seleção de emojis
emojis.forEach(emoji => {
    emoji.addEventListener('click', function() {
        removeSelectedClass(); 
        currentEmotion = this.dataset.emotion;
        selectedEmotion.textContent = `Você está se sentindo: ${currentEmotion}`;
        this.classList.add('selected');
    });
});

// Função para enviar os dados ao backend
submitButton.addEventListener('click', async function() {
    if (currentEmotion && observations.value) {
        const data = {
            emotion: currentEmotion,
            observation: observations.value
        };

        try {
            const response = await fetch('http://127.0.0.1:3009/registrar-emocao', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                alert('Emoção registrada com sucesso!');
                removeSelectedClass();
                selectedEmotion.textContent = '';
                observations.value = '';
            } else {
                alert('Ocorreu um erro ao registrar a emoção.');
            }
        } catch (error) {
            console.error('Erro:', error);
        }
    } else {
        alert('Por favor, selecione uma emoção e faça suas observações.');
    }
});
