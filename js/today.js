const hoje = new Date();
const opcoes = { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' };
const dataFormatada = hoje.toLocaleDateString('pt-BR', opcoes);
document.getElementById("data").textContent = dataFormatada;