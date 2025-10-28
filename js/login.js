// Seleciona os elementos
const form = document.querySelector("form");
const login_user = document.querySelector('[name="username"]');
const login_pass = document.querySelector('[name="password"]');

// Regex para SIAPE: apenas números, 7 ou 8 dígitos
const userRegex = /^\d{7,8}$/;
// Regex para senha: mínimo 8 caracteres, com letra maiúscula, minúscula, número e caractere especial
const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!?.$*_-])[A-Za-z\d!?.$*_-]{8,}$/;

// Função genérica para validar campos
function validateField(input, regex, message) {
  const value = input.value.trim();

  if (value === "") {
    input.classList.remove("is-invalid", "is-valid");
    return false;
  }

  if (!regex.test(value)) {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");

    // Adiciona ou atualiza a mensagem de feedback
    let feedback = input.nextElementSibling;
    if (!feedback || !feedback.classList.contains("invalid-feedback")) {
      feedback = document.createElement("div");
      feedback.classList.add("invalid-feedback");
      input.parentElement.appendChild(feedback);
    }
    feedback.innerText = message;
    return false;
  }

  input.classList.remove("is-invalid");
  input.classList.add("is-valid");
  return true;
}

// Validação em tempo real
login_user.addEventListener("input", () =>
  validateField(login_user, userRegex, "O SIAPE deve conter apenas números (7 ou 8 dígitos)")
);

login_pass.addEventListener("input", () =>
  validateField(
    login_pass,
    passRegex,
    "A senha deve ter 8+ caracteres, incluindo letra maiúscula, minúscula, número e caractere especial (! ? . $ * _ -)"
  )
);

// Limpa erro ao sair do campo vazio
[login_user, login_pass].forEach((input) => {
  input.addEventListener("blur", () => {
    if (input.value.trim() === "") input.classList.remove("is-invalid", "is-valid");
  });
});

// Intercepta o envio do formulário
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const userValid = validateField(
    login_user,
    userRegex,
    "O SIAPE deve conter apenas números (7 ou 8 dígitos)"
  );
  const passValid = validateField(
    login_pass,
    passRegex,
    "A senha deve ter 8+ caracteres, incluindo letra maiúscula, minúscula, número e caractere especial (! ? . $ * _ -)"
  );

  if (userValid && passValid) {
    console.log("Formulário válido! Redirecionando...");
    // Pequeno delay para permitir ver feedback visual antes de redirecionar
    setTimeout(() => {
      window.location.href = "../index.html";
    }, 100);
  } else {
    console.log("Campos inválidos, revise os dados!");
  }
});
