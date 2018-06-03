// Implementing capitalize and format space on javascript String object
String.prototype.capitalize = function () {
    return this.toLowerCase().replace(/(^|\s)([a-z])/g, function(m, p1, p2) { return p1+p2.toUpperCase(); });
}

// My code ;p
const toggler = document.getElementById('navToggler');
const searchTerm = document.getElementById('searchTerm');

function getMovie(term) {
    const apiKey = 'f449c41c';
    term = term.replace(' ', '+');

    const url = `http://www.omdbapi.com?apikey=${apiKey}&t=${term}`;
    const xhr =  new XMLHttpRequest();

    var rlBtn = document.getElementById('rlBtn');

    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            console.log(xhr.responseText);
            // var response = JSON.parse(xhr.responseText);
            if (response.Title != undefined) {
                document.getElementsByClassName('box')[0].style.display = 'block';
                document.getElementById('thumbImage').src = response.Poster;
                document.getElementById('infoName').innerHTML = response.Title;
                document.getElementById('title-info').innerHTML = 'Última pesquisa: ' + response.Title;
                document.getElementById('infoDescrip').innerHTML = `Ano: ${response.Year}<br> Idade recomendada: ${response.Rated}`;
                document.getElementById('content').innerHTML = response.Plot;
                rlBtn.classList.toggle('is-loading');
            } else {
                document.getElementById('title-info').innerHTML = 'Nenhum filme/série foi encontrado!';
                rlBtn.classList.toggle('is-loading');
            }
        } else {
            rlBtn.classList.toggle('is-loading');
        }
    }

    xhr.open('GET', url);
    xhr.send();
}

function toggleNav() {
    var navMenu = document.getElementById('navMenu');    
    toggler.classList.toggle('is-active');
    navMenu.classList.toggle('is-active');
}

// event listeners
document.getElementById('btnSearch').addEventListener('click', function() {
    getMovie(searchTerm.value);
});

toggler.addEventListener('click', toggleNav);

searchTerm.addEventListener('keypress', function(e) {
    if (e.keyCode == 13) {
        getMovie(searchTerm.value);
    }
});