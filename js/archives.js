// archives.js

const none_alert = document.querySelector('.none-block');
const search_input = document.querySelector('#search');
const card_files = document.querySelector('.card-files');
const btn_history = document.querySelectorAll('.btn-history');

let data = [];

function showArchive() {
    const visible_cards = card_files.querySelectorAll(':scope > div:not(.none-block):not(.d-none)');
    none_alert.hidden = visible_cards.length > 0;
}

function renderCards() {
    card_files.innerHTML = '';

    data.forEach(item => {
        const card_div = document.createElement('div');
        card_div.classList.add('d-flex', 'justify-content-center', 'align-items-center');

        card_div.innerHTML = `
          <div class="card m-3 w-75 border-start border-3 border-success shadow" id="borda_esquerda">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-center">
                <div class="card-body">
                  <h3 class="fw-bolder">${item.nome}</h3>
                  <p class="fw-bolder text-secondary">RA: ${item.ra}</p>
                </div>
                <div class="d-inline-flex">
                  <a href="list-archives.html" class="btn btn-secondary fw-bolder ms-3 btn-history">Consultar Histórico</a>
                </div>
              </div>
            </div>
          </div>
        `;

        card_files.appendChild(card_div);
    });

    showArchive();
}

function fetchData() {
    fetch('../api.php')
        .then(res => res.json())
        .then(json => {
            data = json;
            renderCards();
        })
        .catch(err => {
          console.error('Erro ao buscar dados:', err);
        });
}

search_input.addEventListener('input', () => {
    const cards = card_files.querySelectorAll(':scope > div');
    const search_text = search_input.value.toLowerCase();

    cards.forEach(card => {
        const text = card.querySelector('h3').textContent.toLowerCase();
        card.classList.toggle('d-none', !text.includes(search_text));
    });

    showArchive();
});

fetchData();

// list-archives.js

const history_title = document.querySelector('#history-title');

