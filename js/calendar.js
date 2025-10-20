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
        coluna = (primeiroDia + dia - 1) % 7
    
        if (dia === diaHoje ) {
         if(coluna === 0 || coluna === 6){
                 tabela += `<td class="day today text-white fw-bold border border-0">  ${dia} </td> `; 
            }else{
            tabela += `<td class="day today text-white fw-bold border border-0"> <span class="tooltip">Agendar Atendimento</span> <button onclick="Marcar_consulta(${dia},${mes},${ano})" class="day today text-white fw-bold border border-0 text-decoration-none h-100 w-100" "> ${dia}</a> </td> `; // destaca dia atual
        }} else {
            if(dia > diaHoje){
                if(coluna === 0 || coluna === 6){
                     tabela += `<td class="day dias_passsados"> ${dia}</td>`;
                }else{
                tabela += `<td class="day"> <span class="tooltip">Agendar Atendimento</span> <button onclick="Marcar_consulta(${dia},${mes},${ano})" class="day bg-transparent border-0"> ${dia}</button> </td>`;
            }}else{
            tabela += `<td class="day dias_passsados"> ${dia}</td>`;
        }}
        if ((dia + primeiroDia) % 7 === 0) tabela += '</tr><tr>'; // nova linha a cada semana
    }

    tabela += '</tr></table>';
    calendario.innerHTML = tabela;
}

gerarCalendario();


function Marcar_consulta(d,m,a){
   var x = d+"-"+(m+1)+"-"+a

    window.location.href='pages/schedule.html?data='+encodeURIComponent(x)



}