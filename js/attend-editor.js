// Inicializa o Quill
var quill = new Quill('#editor', {
  modules: {
    toolbar: '#toolbar'
  },
  theme: 'snow'
});

// Função “fake” de upload (apenas retorna URL de teste)
function fakeUpload(file) {
  return new Promise((resolve) => {
    setTimeout(() => {
      if(file.type.startsWith('image/')){
        resolve('https://via.placeholder.com/150'); // URL de imagem teste
      } else {
        resolve('https://example.com/fakefile/' + file.name); // URL de arquivo teste
      }
    }, 500);
  });
}

// Handler de imagem
var toolbarModule = quill.getModule('toolbar');
toolbarModule.addHandler('image', () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.click();

  input.onchange = async () => {
    const file = input.files[0];
    const range = quill.getSelection(true);
    const url = await fakeUpload(file);
    quill.insertEmbed(range.index, 'image', url);
  };
});

// Handler de arquivo genérico
toolbarModule.addHandler('file', () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '*/*';
  input.click();

  input.onchange = async () => {
    const file = input.files[0];
    const range = quill.getSelection(true);
    const url = await fakeUpload(file);
    quill.insertText(range.index, file.name, { link: url });
  };
});

document.addEventListener('DOMContentLoaded', () => {
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  var tooltipTriggerList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

})