const btn_back = document.querySelector('.btn-back');
const form = document.querySelector("form");

// Campos
const nameStudent = document.getElementById("nameStudent");
const ra = document.getElementById("ra");
const telStudent = document.getElementById("telStudent");
const nameResp = document.getElementById("nameResp");
const telResp = document.getElementById("telResp");
const dateInput = document.getElementById("date");
const hourInput = document.getElementById("hour");

// Regex de validação
const nameRegex = /^[A-Za-zÀ-ÿ\s]{3,}$/;
const raRegex = /^\d{7,}$/;
const telRegex = /^(\d{10}|\d{11})$/;

// Flatpickr
const fp = flatpickr("#date", {
  dateFormat: "d/m/Y",
  defaultDate: "today",
  minDate: "today",
  maxDate: `31-12-${new Date().getFullYear()}`,
  disable: [
    date => date.getDay() === 0 || date.getDay() === 6
  ]
});

// Funções auxiliares
function setError(input, message) {
  const isEmpty = input.dataset.mask === "phone"
    ? input.value.replace(/\D/g, "") === ""
    : input.value.trim() === "";

  if (isEmpty) {
    input.classList.remove("is-invalid", "is-valid");
    const feedback = input.nextElementSibling;
    if (feedback && feedback.classList.contains("invalid-feedback")) feedback.textContent = "";
    return;
  }

  let feedback = input.nextElementSibling;
  if (!feedback || !feedback.classList.contains("invalid-feedback")) {
    feedback = document.createElement("div");
    feedback.classList.add("invalid-feedback");
    input.parentElement.appendChild(feedback);
  }

  feedback.textContent = message;
  input.classList.add("is-invalid");
  input.classList.remove("is-valid");
}

function setSuccess(input) {
  input.classList.remove("is-invalid");
  input.classList.add("is-valid");
  const feedback = input.nextElementSibling;
  if (feedback && feedback.classList.contains("invalid-feedback")) feedback.textContent = "";
}

// Validação de campos normais
function validateField(input) {
  const value = input.value.trim();
  switch (input.id) {
    case "nameStudent":
    case "nameResp":
      if (!nameRegex.test(value)) setError(input, "Digite um nome válido (mínimo 3 letras).");
      else setSuccess(input);
      break;
    case "ra":
      if (!raRegex.test(value)) setError(input, "RA deve conter apenas números (mínimo 7 dígitos).");
      else setSuccess(input);
      break;
  }
}

// Validação de telefone
function formatPhone(input) {
  let digits = input.value.replace(/\D/g, "");
  if (digits.length > 11) digits = digits.substring(0, 11);

  if (digits.length > 10) input.value = `(${digits.substring(0,2)}) ${digits.substring(2,7)}-${digits.substring(7)}`;
  else if (digits.length > 6) input.value = `(${digits.substring(0,2)}) ${digits.substring(2,6)}-${digits.substring(6)}`;
  else if (digits.length > 2) input.value = `(${digits.substring(0,2)}) ${digits.substring(2)}`;
  else input.value = digits;
}

function validatePhone(input) {
  const digits = input.value.replace(/\D/g, "");
  if (!telRegex.test(digits)) {
    setError(input, "Digite um telefone válido (fixo ou celular).\nEx: (11) 1234-5678 ou (11) 91234-5678");
    return false;
  } else {
    setSuccess(input);
    return true;
  }
}

// Listeners em tempo real
[nameStudent, ra, nameResp].forEach(input => {
  input.addEventListener("input", () => validateField(input));
  input.addEventListener("blur", () => validateField(input));
});

[telStudent, telResp].forEach(input => {
  input.dataset.mask = "phone"; // marca como telefone
  input.addEventListener("input", () => {
    formatPhone(input);
    validatePhone(input);
  });
  input.addEventListener("blur", () => validatePhone(input));
});

// Botão voltar
btn_back.addEventListener('click', () => {
  if (window.location.search !== '') btn_back.href = 'attend.html';
});

// Validação no submit
form.addEventListener("submit", e => {
  e.preventDefault();
  let valid = true;

  // Campos texto e RA
  [nameStudent, ra, nameResp].forEach(input => {
    validateField(input);
    if (input.classList.contains("is-invalid")) valid = false;
  });

  // Telefones
  [telStudent, telResp].forEach(input => {
    if (!validatePhone(input)) valid = false;
  });

  // Data
  if (dateInput.value.trim() === "") {
    setError(dateInput, "Escolha uma data.");
    valid = false;
  } else setSuccess(dateInput);

  // Hora
  if (hourInput.value < "09:00" || hourInput.value > "16:00") {
    setError(hourInput, "O horário deve estar entre 09:00 e 16:00.");
    valid = false;
  } else setSuccess(hourInput);

  if (valid) {
    alert("Agendamento realizado com sucesso!");
    window.location.href = "../index.html";
  }
});