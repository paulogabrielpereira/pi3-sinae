function gerarCalendario() {
    const calendario = document.getElementById('calendario');
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = hoje.getMonth(); // 0 = Janeiro
    const diaHoje = hoje.getDate();

    const nomesMeses = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
    const nomesDias = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];

    // Primeiro dia do mês e quantidade de dias
    const primeiroDia = new Date(ano, mes, 1).getDay();
    const diasNoMes = new Date(ano, mes + 1, 0).getDate();

    // Cabeçalho do mês
    let tabela = `<h4 class="text-center">${nomesMeses[mes]} ${ano}</h4>`;
    tabela += '<table class="table table-borderless text-center">';
    tabela += '<tr>';
    nomesDias.forEach(d => tabela += `<th>${d}</th>`);
    tabela += '</tr>';

    // Preencher os dias vazios antes do primeiro dia
    for (let i = 0; i < primeiroDia; i++) {
        tabela += '<td class="border-0 empty"></td>';
    }

    // Preencher os dias do mês
    for (let dia = 1; dia <= diasNoMes; dia++) {
        if (dia === diaHoje) {
            tabela += `<td class="day today text-white fw-bold border border-0"> <span class="tooltip">Agendar Atendimento</span> ${dia}</td>`; // destaca dia atual
        } else {
            tabela += `<td class="day"> <span class="tooltip">Agendar Atendimento</span> ${dia}</td>`;
        }
        if ((dia + primeiroDia) % 7 === 0) tabela += '</tr><tr>'; // nova linha a cada semana
    }

    tabela += '</tr></table>';
    calendario.innerHTML = tabela;
}

gerarCalendario();