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


const form = document.querySelector("form");

// Seleciona todos os campos
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
const telRegex = /^(\(?\d{2}\)?\s?)?\d{4,5}-?\d{4}$/;

// Função auxiliar para mostrar erro
function setError(input, message) {
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

// Função auxiliar para mostrar sucesso
function setSuccess(input) {
  input.classList.remove("is-invalid");
  input.classList.add("is-valid");
  const feedback = input.nextElementSibling;
  if (feedback && feedback.classList.contains("invalid-feedback")) {
    feedback.textContent = "";
  }
}

// Validação em tempo real
[nameStudent, ra, telStudent, nameResp, telResp].forEach((input) => {
  input.addEventListener("input", () => validateField(input));
});

// Validação principal
function validateField(input) {
  const value = input.value.trim();

  switch (input.id) {
    case "nameStudent":
    case "nameResp":
      if (!nameRegex.test(value)) {
        setError(input, "Digite um nome válido (mínimo 3 letras).");
      } else setSuccess(input);
      break;

    case "ra":
      if (!raRegex.test(value)) {
        setError(input, "RA deve conter apenas números (mínimo 7 dígitos).");
      } else setSuccess(input);
      break;

    case "telStudent":
    case "telResp":
      if (!telRegex.test(value)) {
        setError(input, "Digite um telefone válido. Ex: (11) 91234-5678");
      } else setSuccess(input);
      break;
  }
}

// Flatpickr para a data
flatpickr("#date", {
  dateFormat: "d/m/Y",
  minDate: "today",
  locale: "pt",
});

// Validação no envio
form.addEventListener("submit", (e) => {
  e.preventDefault();

  let valid = true;

  // Valida todos os campos
  [nameStudent, ra, telStudent, nameResp, telResp].forEach((input) => {
    validateField(input);
    if (input.classList.contains("is-invalid")) valid = false;
  });

  // Valida data
  if (dateInput.value.trim() === "") {
    setError(dateInput, "Escolha uma data.");
    valid = false;
  } else setSuccess(dateInput);

  // Valida hora
  if (hourInput.value < "09:00" || hourInput.value > "16:00") {
    setError(hourInput, "O horário deve estar entre 09:00 e 16:00.");
    valid = false;
  } else setSuccess(hourInput);

  // Se estiver tudo certo
  if (valid) {
    console.log("Agendamento válido! Redirecionando...");
    alert("Agendamento realizado com sucesso!");
    window.location.href = "../index.html"; // muda pra onde quiser
  }
});


//Formata o input do número
telStudent.addEventListener("input", () => {
  let value = telStudent.value.replace(/\D/g, ""); // remove tudo que não for número

  // adiciona o parêntese e o espaço após os dois primeiros dígitos
  if (value.length > 0) {
    value = "(" + value.substring(0, 2);
    if (value.length >= 3) {
      value += ") " + telStudent.value.replace(/\D/g, "").substring(2, 7);
    }
    if (telStudent.value.replace(/\D/g, "").length > 7) {
      value = "(" + telStudent.value.replace(/\D/g, "").substring(0, 2) + ") " +
              telStudent.value.replace(/\D/g, "").substring(2, 7) + "-" +
              telStudent.value.replace(/\D/g, "").substring(7, 11);
    }
  }

  telStudent.value = value;
});

telResp.addEventListener("input", () => {
  let value = telResp.value.replace(/\D/g, ""); // remove tudo que não for número

  // adiciona o parêntese e o espaço após os dois primeiros dígitos
  if (value.length > 0) {
    value = "(" + value.substring(0, 2);
    if (value.length >= 3) {
      value += ") " + telResp.value.replace(/\D/g, "").substring(2, 7);
    }
    if (telResp.value.replace(/\D/g, "").length > 7) {
      value = "(" + telResp.value.replace(/\D/g, "").substring(0, 2) + ") " +
              telResp.value.replace(/\D/g, "").substring(2, 7) + "-" +
              telResp.value.replace(/\D/g, "").substring(7, 11);
    }
  }

  telResp.value = value;
});