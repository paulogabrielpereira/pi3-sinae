const reschedule_btns = document.querySelectorAll('.reschedule-attend-btn');
const confirm_modal = new bootstrap.Modal(document.querySelector('#confirmModal'));
const cancel_attend_btns = document.querySelectorAll('.cancel-attend-btn');
const confirm_cancel_attend_btn = document.querySelector('#confirmCancelAttend');

let currentCard = null;

reschedule_btns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const target = e.currentTarget;
        const name = target.parentElement.previousElementSibling.children[1].innerText;
        const date = target.parentElement.previousElementSibling.children[3].innerText.split(' - ')[0];
        const hour = target.parentElement.previousElementSibling.children[3].innerText.split(' - ')[1];

        window.location.href =  `schedule.html?nameStudent=${name}&date=${date}&hour=${hour}`;
    })
})

cancel_attend_btns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        currentCard = e.target.closest('.card');
        confirm_modal.show();
    })
});

confirm_cancel_attend_btn.addEventListener('click', () => {
    const name_canceled = currentCard.querySelectorAll('p.text-secondary')[0].innerText.split(' ')[0];

    if (currentCard) currentCard.remove();
    alert(`Atendimento de ${name_canceled} cancelado com sucesso!`);
    confirm_modal.hide();
});

const filter_name = document.getElementById('filterName');
const filter_date = document.getElementById('filterDate');
const btn_filter = document.querySelector('.modal-footer .btn-primary');
const div_cards = document.getElementById('sect-attend');
const list_cards = Array.from(div_cards.querySelectorAll('.card'));


btn_filter.addEventListener('click', () => {
    let ordered_cards = [...list_cards];
    if (filter_name.checked) {
        ordered_cards.sort((a, b) => {
            let name_a = a.querySelector('.card-info p').textContent.toLowerCase();
            let name_b = b.querySelector('.card-info p').textContent.toLowerCase();
            return name_a.localeCompare(name_b);
        });
    }

    if (filter_date.checked) {
        ordered_cards.sort((a, b) => {
            let da = a.querySelectorAll('.card-info p')[1].textContent.split('-')[0].split('/');
            let db = b.querySelectorAll('.card-info p')[1].textContent.split('-')[0].split('/');
            let date_a = new Date(da[2], da[1] - 1, da[0]);
            let date_b = new Date(db[2], db[1] - 1, db[0]);
            return date_a - date_b;
        });
    }

   
    div_cards.innerHTML = '';
    ordered_cards.forEach(card => div_cards.appendChild(card));
});

