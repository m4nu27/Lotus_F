// Variáveis globais e seleção de elementos
const date = new Date();
let currYear = date.getFullYear();
let currMonth = date.getMonth();
const daysTag = document.querySelector(".days"),
      currentDate = document.querySelector(".current-date"),
      prevNextIcon = document.querySelectorAll(".icons span"),
      registroEmoji = document.querySelector("#registro-emoji"),
      fundo = document.querySelector("#fundo"),
      selectedEmotion = document.querySelector("#selected-emotion"),
      observations = document.querySelector("#observations");

const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", 
                "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

// Função para renderizar o calendário
async function renderCalendar() {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(),
        lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
        lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(),
        lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
    let liTag = "";

    // Obter as datas com emoções registradas para o mês atual
    const monthFormatted = (currMonth + 1).toString().padStart(2, '0');
    const yearMonth = `${currYear}-${monthFormatted}`;

    // Chamada para obter os registros do banco de dados
    let registros = await fetch(`http://127.0.0.1:3020/api/obter-emocoes?mes=${yearMonth}`)
        .then(response => response.json())
        .then(data => data.success ? data.data : []);

    // Converter as datas com registros em uma lista de dias
    const diasComRegistros = registros.map(registro => registro.data.split('-')[2].padStart(2, '0'));

    // Dias do mês anterior
    for (let i = firstDayofMonth; i > 0; i--) {
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }

    // Dias do mês atual
    for (let i = 1; i <= lastDateofMonth; i++) {
        let isToday = i === date.getDate() && currMonth === new Date().getMonth()
                     && currYear === new Date().getFullYear() ? "active" : "";

        let dayTag = diasComRegistros.includes(i.toString().padStart(2, '0')) ? 
                     `<li class="${isToday}" onclick="abrirDia(${i}, ${currMonth + 1}, ${currYear})" data-dia="${i}">
                         ${i}<span class="registro-ponto"></span>
                     </li>` :
                     `<li class="${isToday}" onclick="abrirDia(${i}, ${currMonth + 1}, ${currYear})" data-dia="${i}">${i}</li>`;
                     
        liTag += dayTag;
    }

    // Dias do próximo mês
    for (let i = lastDayofMonth; i < 6; i++) { 
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
    }

    currentDate.innerText = `${months[currMonth]} ${currYear}`;
    daysTag.innerHTML = liTag;
};

// Evento para alternar entre meses
prevNextIcon.forEach(icon => {
    icon.addEventListener("click", () => {
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

        if(currMonth < 0 || currMonth > 11) {
            date.setFullYear(currYear);
            date.setMonth(currMonth);
            currYear = date.getFullYear();
            currMonth = date.getMonth();
        } else {
            date.setFullYear(new Date().getFullYear());
            date.setMonth(new Date().getMonth());
        }
        renderCalendar();
    });
});

renderCalendar();

// Função para abrir o quadro com dados de um dia específico
async function abrirDia(dia, mes, ano) {
    const diaFormatado = dia.toString().padStart(2, '0');
    const mesFormatado = mes.toString().padStart(2, '0');
    const dataSelecionada = `${ano}-${mesFormatado}-${diaFormatado}`;

    registroEmoji.style.display = 'block';
    fundo.style.display = 'block';
    document.getElementById("dia").innerHTML = `Dia: ${dia}/${mes}/${ano}`;

    try {
        const response = await fetch(`http://127.0.0.1:3020/api/obter-emocoes?data=${dataSelecionada}`);
        const emocoes = await response.json();

        if (emocoes.success && emocoes.data.length > 0) {
            selectedEmotion.textContent = `Emoção: ${emocoes.data[0].emocao}`;
            observations.value = `Observação: ${emocoes.data[0].observacao}`;
        } else {
            selectedEmotion.textContent = 'Sem registro para esta data.';
            observations.value = '';
        }
    } catch (error) {
        console.error('Erro ao obter emoções:', error);
    }

    fundo.onclick = fecharRegistro;
};

// Função para fechar o quadro de registro
function fecharRegistro() {
    registroEmoji.style.display = 'none';
    fundo.style.display = 'none';
    selectedEmotion.textContent = '';
    observations.value = '';
}
