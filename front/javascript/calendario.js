const daysTag = document.querySelector(".days"),
      currentDate = document.querySelector(".current-date"),
      prevNextIcon = document.querySelectorAll(".icons span"),
      registroEmoji = document.querySelector('.registroEmoji'),
      fundo = document.querySelector('.fundo');

const backButton = document.getElementById('back-button');
backButton.addEventListener('click', function() {
    window.history.back();
});

let date = new Date(),
    currYear = date.getFullYear(),
    currMonth = date.getMonth();

const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho",
                "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];


const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(),
        lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
        lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(),
        lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
    let liTag = "";

    // Dias do mês anterior
    for (let i = firstDayofMonth; i > 0; i--) {
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }

    // Dias do mês atual
    for (let i = 1; i <= lastDateofMonth; i++) {
        let isToday = i === date.getDate() && currMonth === new Date().getMonth()
                     && currYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}" onclick="abrirDia(${i}, ${currMonth + 1}, ${currYear})" data-dia="${i}">${i}</li>`;
    }

    // Dias do próximo mês
    for (let i = lastDayofMonth; i < 6; i++) { 
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
    }

    currentDate.innerText = `${months[currMonth]} ${currYear}`;
    daysTag.innerHTML = liTag;
};

renderCalendar();

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

// async function abrirDia(dia, mes, ano) {
//     const dataSelecionada = `${ano}-${mes.toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;
//     registroEmoji.style.display = 'block';
//     fundo.style.display = 'block';
//     document.getElementById("dia").innerHTML = `Dia: ${dia}/${mes}/${ano}`;

//     try {
//         const response = await fetch(`http://127.0.0.1:3020/api/obter-emocoes/${dataSelecionada}`);
//         const emocoes = await response.json();

//         if (emocoes.data.length > 0) {
//             alert(`Registro encontrado: Emoção - ${emocoes.data[0].emocao}, Observação - ${emocoes.data[0].observacao}`);
//             selectedEmotion.textContent = `Você registrou: ${emocoes.data[0].emocao}`;
//             observations.value = emocoes.data[0].observacao;
//         } else {
//             selectedEmotion.textContent = '';
//             observations.value = '';
//         }
//     } catch (error) {
//         console.error('Erro ao obter emoções:', error);
//     }

//     fundo.onclick = fecharRegistro;
// }

async function abrirDia(dia, mes, ano) {
    const dataSelecionada = `${ano}-${mes.toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;
    registroEmoji.style.display = 'block';
    fundo.style.display = 'block';
    document.getElementById("dia").innerHTML = `Dia: ${dia}/${mes}/${ano}`;

    try {
        const response = await fetch(`http://127.0.0.1:3020/api/obter-emocoes/${dataSelecionada}`);
        const emocoes = await response.json();

        if (emocoes.data && emocoes.data.length > 0) {
            const emocao = emocoes.data[0].emocao;
            const observacao = emocoes.data[0].observacao;
            selectedEmotion.textContent = `Você registrou: ${emocao}`;
            observations.value = observacao;
        } else {
            selectedEmotion.textContent = '';
            observations.value = '';
        }
    } catch (error) {
        console.error('Erro ao obter emoções:', error);
    }

    fundo.onclick = fecharRegistro;
}



function fecharRegistro() {
    registroEmoji.style.display = 'none';
    fundo.style.display = 'none';
}

const emojis = document.querySelectorAll('.emoji');
const selectedEmotion = document.getElementById('selected-emotion');
const observations = document.getElementById('observations');
const submitButton = document.getElementById('submit');
let currentEmotion = '';

function removeSelectedClass() {
    emojis.forEach(emoji => {
        emoji.classList.remove('selected');
    });
}

emojis.forEach(emoji => {
    emoji.addEventListener('click', function() {
        removeSelectedClass(); 
        currentEmotion = this.dataset.emotion;
        selectedEmotion.textContent = `Você está se sentindo: ${currentEmotion}`;
        this.classList.add('selected');
    });
});

submitButton.addEventListener('click', async function() {
    if (currentEmotion && observations.value) {
        const selectedDate = document.getElementById("dia").textContent.split(": ")[1];
        const data = {
            data: selectedDate,
            emocao: currentEmotion,
            observacao: observations.value
        };

        try {
            const response = await fetch('http://127.0.0.1:3020/api/registrar-emocao', {
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
                fecharRegistro();
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


