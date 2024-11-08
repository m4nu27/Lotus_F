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
//     const diaFormatado = dia.toString().padStart(2, '0');
//     const mesFormatado = mes.toString().padStart(2, '0');
//     const dataSelecionada = `${ano}-${mesFormatado}-${diaFormatado}`;

//     registroEmoji.style.display = 'block';
//     fundo.style.display = 'block';
//     document.getElementById("dia").innerHTML = `Dia: ${dia}/${mes}/${ano}`;

//     try {
//         const response = await fetch(`http://127.0.0.1:3020/api/obter-emocoes/${dataSelecionada}`);
//         const emocoes = await response.json();

//         const registroCard = document.querySelector('.registro-card');
//         const registroEmocao = document.getElementById("registro-emocao");
//         const registroObservacao = document.getElementById("registro-observacao");

//         if (emocoes.data.length > 0) {
//             registroEmocao.innerText = `Emoção: ${emocoes.data[0].emocao}`;
//             registroObservacao.innerText = `Observação: ${emocoes.data[0].observacao}`;
//             registroCard.style.display = 'block';
//         } else {
//             registroEmocao.innerText = 'Nenhum registro encontrado para este dia.';
//             registroObservacao.innerText = '';
//             registroCard.style.display = 'block';
//         }
//     } catch (error) {
//         console.error('Erro ao obter emoções:', error);
//     }

//     fundo.onclick = fecharRegistro;
// }

async function abrirDia(dia, mes, ano) {
    const diaFormatado = dia.toString().padStart(2, '0');
    const mesFormatado = mes.toString().padStart(2, '0');
    const dataSelecionada = `${ano}-${mesFormatado}-${diaFormatado}`;

    document.getElementById("dia").innerHTML = `Dia: ${dia}/${mes}/${ano}`;

    try {
        // Realizar a requisição para verificar se há registros para a data selecionada
        const response = await fetch(`http://127.0.0.1:3020/api/obter-emocoes`, dataSelecionada);
        const emocoes = await response.json();

        const registroEmocao = document.getElementById("registro-emocao");
        const registroObservacao = document.getElementById("registro-observacao");

        // Verifica se há registros para a data e exibe no card
        if (emocoes.data.length > 0) {
            registroEmocao.innerText = `Emoção: ${emocoes.data[0].emocao}`;
            registroObservacao.innerText = `Observação: ${emocoes.data[0].observacao}`;
        } else {
            registroEmocao.innerText = 'Nenhum registro encontrado para este dia.';
            registroObservacao.innerText = '';
        }
    } catch (error) {
        console.error('Erro ao obter emoções:', error);
    }
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

// submitButton.addEventListener('click', async function() {
//     if (currentEmotion && observations.value) {
//         const selectedDate = document.getElementById("dia").textContent.split(": ")[1];
//         const data = {
//             data: selectedDate,
//             emocao: currentEmotion,
//             observacao: observations.value
//         };

//         try {
//             const response = await fetch('http://127.0.0.1:3020/api/registrar-emocao', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(data)
//             });

//             if (response.ok) {
//                 alert('Emoção registrada com sucesso!');
//                 removeSelectedClass();
//                 selectedEmotion.textContent = '';
//                 observations.value = '';
                
//                 // Atualizar o card com o novo registro
//                 document.getElementById("registro-emocao").innerText = `Emoção: ${data.emocao}`;
//                 document.getElementById("registro-observacao").innerText = `Observação: ${data.observacao}`;
//                 document.querySelector('.registro-card').style.display = 'block';

//                 fecharRegistro();
//             } else {
//                 alert('Ocorreu um erro ao registrar a emoção.');
//             }
//         } catch (error) {
//             console.error('Erro:', error);
//         }
//     } else {
//         alert('Por favor, selecione uma emoção e faça suas observações.');
//     }
// });


// Função para carregar todos os registros do banco de dados e exibi-los no card
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

                // Atualizar o card com o novo registro
                document.getElementById("registro-emocao").innerText = `Emoção: ${data.emocao}`;
                document.getElementById("registro-observacao").innerText = `Observação: ${data.observacao}`;

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


// async function carregarRegistros() {
//     try {
//         const response = await fetch('http://127.0.0.1:3020/api/obter-todos-registros');
//         const registros = await response.json();

//         const listaRegistros = document.getElementById("lista-registros");
//         listaRegistros.innerHTML = '';

//         registros.data.forEach(registro => {
//             const item = document.createElement("li");
//             item.innerHTML = `<strong>Data:</strong> ${registro.data} <br>
//                               <strong>Emoção:</strong> ${registro.emocao} <br>
//                               <strong>Observação:</strong> ${registro.observacao}`;
//             listaRegistros.appendChild(item);
//         });
//     } catch (error) {
//         console.error('Erro ao carregar registros:', error);
//     }
// }

// Chama a função ao carregar a página para exibir todos os registros no card
// document.addEventListener('DOMContentLoaded', carregarRegistros);




