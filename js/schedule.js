flatpickr("#date", {
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

params.forEach((value, key) => {
    const input = document.querySelector(`input[name="${key}"]`) || document.getElementById(key);
    if (input) input.value = value; 
})