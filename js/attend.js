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
    console.log(name_canceled);

    if (currentCard) currentCard.remove();

    alert(`Atendimento de ${name_canceled} cancelado com sucesso!`);
    confirm_modal.hide();
});