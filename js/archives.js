function showArchive() {
    const cardFiles = document.querySelector('.card-files');
    const noneAlert = document.querySelector('.none-block');

    if (cardFiles.children.length > 1) {
        noneAlert.setAttribute("hidden", "hidden");
    } else {
        noneAlert.removeAttribute("hidden");
    }
}

showArchive();