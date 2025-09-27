function showArchive() {
    const card_files = document.querySelector('.card-files');
    const none_alert = document.querySelector('.none-block');
    const visible_cards = card_files.querySelectorAll(':scope > div:not(.none-block):not(.d-none)');

    none_alert.hidden = visible_cards.length > 0;
}

showArchive();

const search_input = document.querySelector('#search');
const card_files = document.querySelector('.card-files');
const cards = card_files.querySelectorAll(':scope > div:not(.none-block)');

document.querySelector('.form-search').addEventListener('submit', (e) => {
    e.preventDefault();

    cards.forEach(card => {
        let search_text = search_input.value.toLowerCase();
        const text = card.querySelector('h3').textContent.toLowerCase();

        if (text.includes(search_text)) {
            card.classList.remove('d-none');
        } else {
            card.classList.add('d-none');
        }
    });

    showArchive();
});