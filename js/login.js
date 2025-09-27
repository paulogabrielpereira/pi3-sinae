const login_btn = document.querySelector('.login-btn');
const login_user = document.querySelector('[name="username"]');
const login_pass = document.querySelector('[name="password"]');

let user = login_user.value;
let pass = login_pass.value;
let userRegex = /^[a-z]+\.[a-z]+$/;
let passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*!\?\.\$\*_-)[A-Za-z\d!\?\.\$\*_-]{8,}$/;

login_user.addEventListener('input', (e) => {
    if (!userRegex.test(user)) {
        login_user.classList.add('is-invalid');
        e.target.nextElementSibling.innerText = 'Use o formato: nome.sobrenome';
    } else {
        login_user.classList.remove('is-invalid');
        console.log('ok');
    }

    if (e.target.value === '') login_user.classList.remove('is-invalid');    
});

login_user.addEventListener('blur', (e) => {
    if (e.target.value === '') login_user.classList.remove('is-invalid');
});

login_pass.addEventListener('input', (e) => {
    if (!passRegex.test(pass)) {
        login_pass.classList.add('is-invalid');
        e.target.nextElementSibling.innerText = 'A senha deve ter ao menos 8 caracteres, incluindo uma letra maiúscula, uma minúscula, um número e um caractere especial (! ? . $ * _ -)';
    } else {
        login_pass.classList.remove('is-invalid');
        console.log('ok');
    }

    if (e.target.value === '') login_pass.classList.remove('is-invalid');
});

login_pass.addEventListener('blur', (e) => {
    if (e.target.value === '') login_pass.classList.remove('is-invalid');
});

login_btn.addEventListener('submit', (e) => {
    e.preventDefault();    

    if (!userRegex.test(user)) {
        login_user.innerText = '';
        login_pass.innerText = '';
    }
});