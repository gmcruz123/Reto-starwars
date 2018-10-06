var personajes = [];
var naves = [];
var peliculas = [];
var vehiculos = [];
var especies = [];
var planetas = [];
var personaje = {};
var nave = {};
var pelicula = {};
var vehiculo = {};
var especie = {};
var planeta = {};
var baseUrlApi = "https://swapi.co/api/";
var ruta1 = ""
var identificador = 0;


function getApi(ruta) {
    ruta1 = ruta
    var pintar = "";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 3 && this.status == 200) {
            switch (ruta) {

                case "people":
                    pintar = ""
                    personajes = JSON.parse(this.responseText).results;
                    personajes.forEach(element => {
                        pintar += '<a class="dropdown-item" href="#">' + element.name + '</a>'
                    });

                    document.getElementById("personajes").innerHTML = pintar;

                    break;
                case "films":
                    pintar = ""
                    peliculas = JSON.parse(this.responseText).results;
                    peliculas.forEach(function (element, index) {
                        pintar += '<a  class="dropdown-item" data-toggle="modal" data-target="#exampleModalCenter" onclick="getItem(2,' + index + ')">' + element.title + '</a>'
                    });

                    document.getElementById("peliculas").innerHTML = pintar;
                    break;

            }
        }
    };


    xhttp.open("GET", baseUrlApi + ruta, true);
    xhttp.send();
}

function getItem(ruta, id) {
    var pintar = "";
    identificador = id;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 3 && this.status == 200) {
            switch (ruta) {

                case 2:
                    ruta1 = "films"
                    pintar = ""
                    pelicula = JSON.parse(this.responseText);
                    pintar = '<h1 class="titulo" >' + pelicula.title + '</h1><div class="row"><img height=500px width=800px src="img/movies/' + id + '.jpg"></div><p><strong>Episodio: ' + pelicula.title + '</strong></p><p> ' + pelicula.opening_crawl + '</p><strong><a onclick="pasarpag()" href="page2.html">Ver mas ..</a></strong>'

                    document.getElementById("gridMovies").innerHTML = pintar;

            }
        }
    };
    xhttp.open("GET", baseUrlApi + ruta1 + '/' + id, true);
    xhttp.send();
}

function pasarpag() {
    localStorage.setItem("id", identificador);

}


function getMovie(item) {

    var datosVehicles = []
    var vehiculosrecibidos = [];

    var datosNaves = []
    var navesrecibidos = []

    var datosPersonajes = []
    var personajesrecibidos = []

    var datosEspecies = []
    var especiesrecibidos = []

    var datosPlanetas = []
    var planetasrecibidos = []

    var pintar = "";
    identificador = localStorage.getItem("id");
    var xhttp = new XMLHttpRequest();
    var xhttp1 = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 3 && this.status == 200) {
            pintar = ""
            pelicula = JSON.parse(this.responseText);
            personajes = pelicula.characters;
            especies = pelicula.species;
            planetas = pelicula.planets;
            vehiculos = pelicula.vehicles;
            naves = pelicula.starships;
            switch (item) {

                case 0:
                    personajes.forEach(function (element, index) {
                        datosPersonajes.push(element);
                    })

                    datosPersonajes.forEach(function (url) {
                        personajesrecibidos.push(getP(url))
                        console.log(url)
                    });
                    Promise.all(personajesrecibidos)
                        .then(function (data) {
                            console.log(data)
                            data.forEach((vehiculo, index) => {
                                if (pintar == "") {
                                    pintar += '<div class="row" >' +
                                        '<div class="col-6 col-md-4"><div class="card" style="width: 18rem;">   <img id="imgdetalle" class="card-img-top" src="img/personajes/' + (index + 1) + '.jpg" alt="Card image cap">   <div class="card-body">     <h5 class="card-title">' + vehiculo.name + '</h5>     <p class="card-text"></p>        </div> </div></div>';
                                }
                                else if (index % 3 == 0 && pintar != "") {
                                    pintar += '</div><div class="row" id="cardmargen">' +
                                        '<div class="col-6 col-md-4"><div class="card" style="width: 18rem;">   <img id="imgdetalle" class="card-img-top" src="img/personajes/' + (index + 1) + '.jpg" alt="Card image cap">   <div class="card-body">     <h5 class="card-title">' + vehiculo.name + '</h5>     <p class="card-text"></p>        </div> </div></div>';
                                }

                                else {
                                    pintar +=
                                        '<div id="margen" class="col-6 col-md-4"><div class="card" style="width: 18rem;">   <img id="imgdetalle" class="card-img-top" src="img/personajes/' + (index + 1) + '.jpg" alt="Card image cap">   <div class="card-body">     <h5 class="card-title">' + vehiculo.name + '</h5>     <p class="card-text"></p>        </div> </div></div>';
                                }
                            })
                            document.getElementById("personajes").innerHTML = pintar + '</div>';

                        });

                    break;

                case 1:
                    especies.forEach(function (element, index) {
                        datosEspecies.push(element)
                    });

                    datosEspecies.forEach(function (url) {
                        especiesrecibidos.push(getP(url))
                        console.log(url)
                    });
                    Promise.all(especiesrecibidos)
                        .then(function (data) {
                            console.log(data)
                            data.forEach((vehiculo, index) => {
                                if (pintar == "") {
                                    pintar += '<div class="row">' +
                                        '<div class="col-6 col-md-4"><div class="card" style="width: 18rem;">   <img id="imgdetalle" class="card-img-top" src="img/especies/' + (index + 1) + '.jpg" alt="Card image cap">   <div class="card-body">     <h5 class="card-title">' + vehiculo.name + '</h5>     <p class="card-text"></p>        </div> </div></div>';
                                }
                                else if (index % 3 == 0 && pintar != "") {
                                    pintar += '</div><div class="row" id="cardmargen">' +
                                        '<div class="col-6 col-md-4"><div class="card" style="width: 18rem;">   <img id="imgdetalle" class="card-img-top" src="img/especies/' + (index + 1) + '.jpg" alt="Card image cap">   <div class="card-body">     <h5 class="card-title">' + vehiculo.name + '</h5>     <p class="card-text"></p>        </div> </div></div>';
                                }

                                else {
                                    pintar +=
                                        '<div class="col-6 col-md-4"><div class="card" style="width: 18rem;">   <img id="imgdetalle" class="card-img-top" src="img/especies/' + (index + 1) + '.jpg" alt="Card image cap">   <div class="card-body">     <h5 class="card-title">' + vehiculo.name + '</h5>     <p class="card-text"></p>        </div> </div></div>';
                                }
                            })
                            document.getElementById("especies").innerHTML = pintar + '</div>';

                        });


                    break;

                case 2:
                    planetas.forEach(function (element, index) {
                        datosPlanetas.push(element);
                    });

                    datosPlanetas.forEach(function (url) {
                        planetasrecibidos.push(getP(url))
                        console.log(url)
                    });

                    Promise.all(planetasrecibidos)
                        .then(function (data) {
                            console.log(data)
                            data.forEach((vehiculo, index) => {
                                if (pintar == "") {
                                    pintar += '<div class="row">' +
                                        '<div class="col-6 col-md-4"><div class="card" style="width: 18rem;">   <img id="imgdetalle" class="card-img-top" src="img/planetas/' + (index + 1) + '.jpg" alt="Card image cap">   <div class="card-body">     <h5 class="card-title">' + vehiculo.name + '</h5>     <p class="card-text"></p>        </div> </div></div>';
                                }
                                else if (index % 3 == 0 && pintar != "") {
                                    pintar += '</div><div class="row" id="cardmargen">' +
                                        '<div class="col-6 col-md-4"><div class="card" style="width: 18rem;">   <img id="imgdetalle" class="card-img-top" src="img/planetas/' + (index + 1) + '.jpg" alt="Card image cap">   <div class="card-body">     <h5 class="card-title">' + vehiculo.name + '</h5>     <p class="card-text"></p>        </div> </div></div>';
                                }

                                else {
                                    pintar +=
                                        '<div class="col-6 col-md-4"><div class="card" style="width: 18rem;">   <img id="imgdetalle" class="card-img-top" src="img/planetas/' + (index + 1) + '.jpg" alt="Card image cap">   <div class="card-body">     <h5 class="card-title">' + vehiculo.name + '</h5>     <p class="card-text"></p>        </div> </div></div>';
                                }
                            })
                            document.getElementById("planetas").innerHTML = pintar + '</div>';

                        });
                    break;
                case 3:
                    naves.forEach(function (element, index) {
                        datosNaves.push(element);
                    });
                    datosNaves.forEach(function (url) {
                        navesrecibidos.push(getP(url))
                        console.log(url)
                    });


                    Promise.all(navesrecibidos)
                        .then(function (data) {
                            console.log(data)
                            data.forEach((vehiculo, index) => {
                                if (pintar == "") {
                                    pintar += '<div class="row">' +
                                        '<div class="col-6 col-md-4"><div class="card" style="width: 18rem;">   <img id="imgdetalle" class="card-img-top" src="img/naves/' + (index + 1) + '.jpg" alt="Card image cap">   <div class="card-body">     <h5 class="card-title">' + vehiculo.name + '</h5>     <p class="card-text"></p>        </div> </div></div>';
                                }
                                else if (index % 3 == 0 && pintar != "") {
                                    pintar += '</div><div class="row" id="cardmargen">' +
                                        '<div class="col-6 col-md-4"><div class="card" style="width: 18rem;">   <img id="imgdetalle" class="card-img-top" src="img/naves/' + (index + 1) + '.jpg" alt="Card image cap">   <div class="card-body">     <h5 class="card-title">' + vehiculo.name + '</h5>     <p class="card-text"></p>        </div> </div></div>';
                                }

                                else {
                                    pintar +=
                                        '<div class="col-6 col-md-4"><div class="card" style="width: 18rem;">   <img id="imgdetalle" class="card-img-top" src="img/naves/' + (index + 1) + '.jpg" alt="Card image cap">   <div class="card-body">     <h5 class="card-title">' + vehiculo.name + '</h5>     <p class="card-text"></p>        </div> </div></div>';
                                }
                            })
                            document.getElementById("naves").innerHTML = pintar + '</div>';

                        });
                    break;

                case 4:

                    vehiculos.forEach(function (element, index) {

                        datosVehicles.push(element);
                    });

                    datosVehicles.forEach(function (url) {
                        vehiculosrecibidos.push(getP(url))
                        console.log(url)
                    });

                    Promise.all(vehiculosrecibidos)
                        .then(function (data) {
                            console.log(data)
                            data.forEach((vehiculo, index) => {
                                if (pintar == "") {
                                    pintar += '<div class="row">' +
                                        '<div class="col-6 col-md-4"><div class="card" style="width: 18rem;">   <img id="imgdetalle" class="card-img-top" src="img/vehiculos/' + (index + 1) + '.jpg" alt="Card image cap">   <div class="card-body">     <h5 class="card-title">' + vehiculo.name + '</h5>     <p class="card-text"></p>        </div> </div></div>';
                                }
                                else if (index % 3 == 0 && pintar != "") {
                                    pintar += '</div><div class="row" id="cardmargen">' +
                                        '<div class="col-6 col-md-4"><div class="card" style="width: 18rem;">   <img id="imgdetalle" class="card-img-top" src="img/vehiculos/' + (index + 1) + '.jpg" alt="Card image cap">   <div class="card-body">     <h5 class="card-title">' + vehiculo.name + '</h5>     <p class="card-text"></p>        </div> </div></div>';
                                }

                                else {
                                    pintar +=
                                        '<div class="col-6 col-md-4"><div class="card" style="width: 18rem;">   <img id="imgdetalle" class="card-img-top" src="img/vehiculos/' + (index + 1) + '.jpg" alt="Card image cap">   <div class="card-body">     <h5 class="card-title">' + vehiculo.name + '</h5>     <p class="card-text"></p>        </div> </div></div>';
                                }
                            })
                            document.getElementById("vehiculos").innerHTML = pintar + '</div>';

                        });


                    break;
            }
        }
    };

    xhttp.open("GET", baseUrlApi + "films" + '/' + identificador, true);
    xhttp.send();
}


function getP(url) {
    return new Promise(function (resolve, reject) {
        var httpX = new XMLHttpRequest();
        httpX.onload = function () {
            //console.log(this.responseText);
            resolve(JSON.parse(this.responseText));
        }
        httpX.onerror = function () {
            reject(Error('Error 🤮'));
        }
        httpX.open('GET', url, true);
        httpX.send()
    });
}



function imagencard() {
    identificador = localStorage.getItem("id");
    document.getElementById("imgcard").src = "img/movies/" + identificador + ".jpg";


    var httpX = new XMLHttpRequest();
    httpX.onload = function () {
        //console.log(this.responseText);
        datos=JSON.parse(this.responseText);
        document.getElementById("titulomovie").innerHTML=  '<p class="card-title" class="subtitle"><strong>Titulo: </strong>'+datos.title+' </p>'
        document.getElementById("referenciamovie").innerHTML=  '<p class="texto"><strong class="subtitle"> Resumen: </strong>'+datos.opening_crawl+' </p>'
        document.getElementById("refmovie").innerHTML=  '<p class="texto"><strong class="subtitle">Director: </strong>'+datos.director+' </p>'
        document.getElementById("producermovie").innerHTML=  '<p class="texto"><strong class="subtitle">Productor: </strong>'+datos.producer+' </p>'


    }
    httpX.onerror = function () {
        reject(Error('Error 🤮'));
    }
    httpX.open('GET', baseUrlApi + "films" + '/' + identificador, true);
    httpX.send()
}



imagencard();