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

function getMovie(term) {
    const apiKey = 'f449c41c';
    term = term.format();

    var url = `http://www.omdbapi.com?apikey=${apiKey}&t=${term}`;
    const xhr =  new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            response = JSON.parse(xhr.responseText);
            if (response.Title != undefined) {
                document.querySelector('.box').style.display = 'block';
                document.querySelector('#thumbImage').src = response.Poster;
                document.querySelector('#infoName').innerHTML = response.Title;
                document.querySelector('#title-info').innerHTML = 'Última pesquisa: ' + response.Title;
                document.querySelector('#infoDescrip').innerHTML = `Ano: ${response.Year}<br> Idade recomendada: ${response.Rated}`;
                document.querySelector('#content').innerHTML = response.Plot;
                document.querySelector('#rlBtn').classList.remove('is-loading');
            } else {
                document.querySelector('#title-info').innerHTML = 'Nenhum filme/série foi encontrado!';
                document.querySelector('#rlBtn').classList.remove('is-loading');
            }
        } else {
            document.querySelector('#rlBtn').classList.add('is-loading');
        }
    }

    xhr.open('GET', url);
    xhr.send();
}

function toggleNav() {
    toggler.classList.toggle('is-active');
    navMenu.classList.toggle('is-active');
}

// event listeners
document.querySelector('#btnSearch').addEventListener('click', function() {
    getMovie(searchTerm.value);
});

toggler.addEventListener('click', toggleNav);

searchTerm.addEventListener('keypress', function(e) {
    if (e.keyCode == 13) {
        getMovie(searchTerm.value);
    }
});