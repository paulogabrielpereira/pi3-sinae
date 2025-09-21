var quill = new Quill('#editor', {
  modules: {
    toolbar: '#toolbar'
  },
  theme: 'snow'
});

function fakeUpload(file) {
  return new Promise((resolve) => {
    setTimeout(() => {
      if(file.type.startsWith('image/')){
        resolve('https://via.placeholder.com/150');
      } else {
        resolve('https://example.com/fakefile/' + file.name); 
      }
    }, 500);
  });
}


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