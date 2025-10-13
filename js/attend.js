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
const ordered_cards = [...list_cards];

btn_filter.addEventListener('click', () => {
    if (filter_name.checked) {
        ordered_cards.sort((a, b) => {
            let name_a = a.querySelector('.card-info p').textContent.toLowerCase();
            let name_b = b.querySelector('.card-info p').textContent.toLowerCase();

            return name_a.localeCompare(name_b);
        })

        div_cards.innerHTML = '';
        ordered_cards.forEach(card => div_cards.appendChild(card));
    } else {
        div_cards.innerHTML = '';
        list_cards.forEach(card => div_cards.appendChild(card));
    }

    if (filter_date.checked) {
        ordered_cards.sort((a, b) => {
            let date_a = a.querySelectorAll('.card-info p')[1].textContent.split('-')[0].split('/');
            let date_b = b.querySelectorAll('.card-info p')[1].textContent.split('-')[0].split('/');

            date_a = new Date(date_a[2], date_a[1] - 1, date_a[0]);
            date_b = new Date(date_b[2], date_b[1] - 1, date_b[0]);

            return date_a - date_b;
        })

        div_cards.innerHTML = '';
        ordered_cards.forEach(card => div_cards.appendChild(card));
    } else {
        div_cards.innerHTML = '';
        list_cards.forEach(card => div_cards.appendChild(card));
    }
})

