const btn_back = document.querySelector('.btn-back');

const fp = flatpickr("#date", {
    dateFormat: "d/m/Y",
    defaultDate: "today",
    minDate: "today",
    maxDate: `31-12-${new Date().getFullYear()}`,
    disable: [
        function(date) {
            return date.getDay() === 0 || date.getDay() === 6;
        }
    ]
});
const params = new URLSearchParams(window.location.search);


const dataURL = params.get("data"); 


if (dataURL) {
    fp.setDate(dataURL, true); 
}





params.forEach((value, key) => {
    const input = document.querySelector(`input[name="${key}"]`) || document.getElementById(key);
    if (input) {
        input.value = value;
    }
})

btn_back.addEventListener('click', () => {
    if (window.location.search !== '') {
        btn_back.href = 'attend.html';
    }
});


