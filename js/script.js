// Implementing capitalize and format space on javascript String object
String.prototype.capitalize = function () {
    return this.toLowerCase().replace(/(^|\s)([a-z])/g, function(m, p1, p2) { return p1+p2.toUpperCase(); });
}

// My code ;p
const toggler = document.getElementById('navToggler');
const searchTerm = document.getElementById('searchTerm');

function loading(el) {
    var exists = document.getElementById('loadingImage');
    if (!exists) {
        var div = document.createElement('div');
        var otherDiv = document.createElement('div');
        var figure = document.createElement('figure');
        var imageLoading = document.createElement('img');
        div.className = 'columns is-centered'
        otherDiv.className = 'column is-4';
        figure.className = 'image is-128x128 column';
        imageLoading.id = 'loadingImage';
        imageLoading.className = 'full-width';
        imageLoading.src = 'octo-loader.gif';
        el.innerHTML = '';
        div.appendChild(otherDiv);
        otherDiv.appendChild(figure);
        figure.appendChild(imageLoading)
        el.appendChild(div);
    }
}

function getTranslate(term, to) {
    const apiKey = 'trnsl.1.1.20180119T231002Z.7f3861d36a1ace13.a12eeb16ed95a2ab4448f1bfc7b8e49c4da7b4bd';
    term = term.replace(' ', '%20')


    const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${apiKey}&text=${term}&lang=${to}&format=plain`;
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            var response = JSON.parse(xhr.responseText);
            document.getElementById('content').innerHTML = response.text[0];
            return response.text[0];
        } else {
            loading(document.getElementById('content'));
        }
    }

    xhr.open('GET', url);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhr.send();
}

function getMovie(term) {
    const apiKey = 'f449c41c';
    term = term.replace(' ', '%20');
    const url = `https://www.omdbapi.com?apikey=${apiKey}&t=${term}`;
    const xhr =  new XMLHttpRequest();

    var rlBtn = document.getElementById('rlBtn');

    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            var response = JSON.parse(xhr.responseText);
            if (response.Title != undefined) {
                document.getElementsByClassName('box')[0].style.display = 'block';
                document.getElementById('thumbImage').src = response.Poster;
                document.getElementById('infoName').innerHTML = response.Title;
                document.getElementById('infoDescrip').innerHTML = `<i class="fa fa-users"></i>: ${response.Actors}<br><i class="fa fa-calendar"></i> ${response.Year}<br><i class="fa fa-star"></i> ${response.imdbRating}`;
                var translated = getTranslate(response.Plot, 'pt');
                rlBtn.classList.toggle('is-loading');
            } else {
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