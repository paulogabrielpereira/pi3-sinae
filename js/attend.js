const cards_attend = document.querySelectorAll('.card.border-warning');

cards_attend.forEach(card => {
    card.addEventListener('click', (event) => {
        const target = event.target;
        const card_body = target.parentElement.parentElement.firstElementChild.firstElementChild;
        const date = card_body.children[3].innerText.split('-')[0].trim();
        const hour = card_body.children[3].innerText.split('-')[1].trim();

        window.location.href = `schedule.html?nameStudent=${card_body.children[1].innerText}&date=${date}&hour=${hour}`;
    })
})

const confirm_modal = new bootstrap.Modal(document.querySelector('#confirmModal'));
const cancel_attend_btns = document.querySelectorAll('#cancelAttendBtn');

cancel_attend_btns.forEach(btn => {
    btn.addEventListener('click', () => {
        confirm_modal.show();
    })
});