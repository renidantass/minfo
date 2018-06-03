// Implementing capitalize and format space on javascript String object
String.prototype.capitalize = function () {
    return this.toLowerCase().replace(/(^|\s)([a-z])/g, function(m, p1, p2) { return p1+p2.toUpperCase(); });
}

String.prototype.format = function () {
    return this.replace(' ', '+');
}

// My code ;p
const toggler = document.querySelector('#navToggler');
const navMenu = document.querySelector('#navMenu');
const searchTerm = document.querySelector('#searchTerm');
const modal = document.querySelector('.modal');

function getMovie(term) {
    const apiKey = 'f449c41c';
    term = term.format();
    openModal();

    var url = `http://www.omdbapi.com?apikey=${apiKey}&t=${term}`;
    const xhr =  new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            response = JSON.parse(xhr.responseText);
            if (response.Title != undefined) {
                document.querySelector('#thumbImage').src = response.Poster;
                document.querySelector('#infoName').innerHTML = response.Title;
                document.querySelector('#title-info').innerHTML = response.Title;
                document.querySelector('#infoDescrip').innerHTML = `Ano: ${response.Year}<br> Idade recomendada: ${response.Rated}`;
                document.querySelector('#content').innerHTML = response.Plot;
            } else {
                closeModal();
                document.querySelector('#title-info').innerHTML = 'Nenhum filme/série foi encontrado!';
            }
        }
    }

    xhr.open('GET', url);
    xhr.send();
}

function closeModal() {
    modal.classList.remove('is-active');
}

function openModal(movieName, movieDescrip) {
    modal.classList.add('is-active');
}

function toggleNav() {
    toggler.classList.toggle('is-active');
    navMenu.classList.toggle('is-active');
}

// event listeners
document.querySelector('#btnSearch').addEventListener('click', function() {
    getMovie(searchTerm.value);
});

document.querySelector('.modal-close').addEventListener('click', closeModal);

toggler.addEventListener('click', toggleNav);

searchTerm.addEventListener('keypress', function(e) {
    if (e.keyCode == 13) {
        getMovie(searchTerm.value);
    }
});