document.addEventListener('DOMContentLoaded', function () {
    var carouselElems = document.querySelector('.carousel.carousel-slider');
        var carouselInstance = M.Carousel.init(carouselElems, {
            fullWidth: true,
            indicators: true,
            numVisible:2
        });
    });
    function moveNextCarousel() {
        var elems = document.querySelector('.carousel.carousel-slider');
        var moveRight = M.Carousel.getInstance(elems);
        moveRight.next(1);
    }
    function movePrevCarousel() {
        var elems = document.querySelector('.carousel.carousel-slider');
        var moveLeft = M.Carousel.getInstance(elems);
        moveLeft.prev(1);
    }

    M.AutoInit();

var listaProg = [];

function selCard(evt) {
    if(evt.currentTarget.className.includes("blue-grey")){
        //Seleccionar programa
        evt.currentTarget.className = evt.currentTarget.className.replace(" blue-grey", " light-blue");
        listaProg.push(parseInt(evt.currentTarget.id));
        //console.table(listaProg);
    }
    else if(evt.currentTarget.className.includes("light-blue")){
        //Des-seleccionar programa
        evt.currentTarget.className = evt.currentTarget.className.replace(" light-blue", " blue-grey");
        let pos = listaProg.indexOf(evt.currentTarget.id);
        listaProg.splice(pos, 1);
        //console.table(listaProg);
    }
    if(listaProg.length > 1){
        document.getElementById('swCalifOProg').removeAttribute("disabled");
    }else{
        document.getElementById('swCalifOProg').setAttribute("disabled",null);
    }

    let data = {
        listaProg : listaProg,
    };
    //El token de protección CSRF
    const csrf = document.getElementById('_csrf').value;
    fetch('/Consultas/SelProgram',{
        method: 'POST',
        headers: {'Content-Type':'application/json',
                   'csrf-token': csrf
                 },
        body:JSON.stringify(data)
    }).then(result => {
        return result.json();
    });
    //console.log('Hecho');
}

function todosProg(){
    tarjetProg = document.getElementsByClassName("card");
    for (i = 0; i < tarjetProg.length; i++) {
        if(tarjetProg[i].className.includes("blue-grey")){
            tarjetProg[i].className = tarjetProg[i].className.replace(" blue-grey", " light-blue");
            listaProg.push(tarjetProg[i].id);
        }
    }
    //console.table(listaProg);
    document.getElementById('swCalifOProg').removeAttribute("disabled");
    let data = {
        listaProg : listaProg,
    };
    //El token de protección CSRF
    const csrf = document.getElementById('_csrf').value;
    fetch('/Consultas/SelProgram',{
        method: 'POST',
        headers: {'Content-Type':'application/json',
                  'csrf-token': csrf
                 },
        body:JSON.stringify(data)
    }).then(result => {
        return result.json();
    });
}

function ningunProg(){
    tarjetProg = document.getElementsByClassName("card");
    for (i = 0; i < tarjetProg.length; i++) {
        if(tarjetProg[i].className.includes("light-blue")){
            tarjetProg[i].className = tarjetProg[i].className.replace(" light-blue", " blue-grey");
            listaProg.pop();
        }
    }
    //console.table(listaProg);
    document.getElementById('swCalifOProg').setAttribute("disabled",null);
    let data = {
        listaProg : listaProg,
    };
    //El token de protección CSRF
    const csrf = document.getElementById('_csrf').value;
    fetch('/Consultas/SelProgram',{
        method: 'POST',
        headers: {'Content-Type':'application/json',
                  'csrf-token': csrf
                 },
        body:JSON.stringify(data)
    }).then(result => {
        return result.json();
    });
}

function enableSexo(){
    let bool = document.getElementById('chSexo').checked;
    //console.log('Sexo: '+bool);
    if(bool){
        document.getElementById('swSexo').removeAttribute("disabled");
    }else{
        document.getElementById('swSexo').setAttribute("disabled",null);
    }
}

function enableEdad(){
    let bool = document.getElementById('chEdad').checked;
    //console.log('Edad: '+bool);
    if(bool){
        document.getElementById('inEdadIni').removeAttribute("disabled");
        document.getElementById('chRangoEdad').removeAttribute("disabled");
        document.getElementById('inEdadFin').removeAttribute("disabled");
    }else{
        document.getElementById('inEdadIni').setAttribute("disabled",null);
        document.getElementById('chRangoEdad').setAttribute("disabled",null);
        document.getElementById('inEdadFin').setAttribute("disabled",null);
    }
}

const buscarHistorial = () => {

    const csrf = document.getElementById('_csrf').value;
    let criterio = document.getElementById("buscador").value;
    if(criterio === ''){
        criterio = " ";
    }

    let data={
        inCiclosIni : document.getElementById('inCiclosIni').value,
        chRangoCiclos: document.getElementById('chRangoCiclos').checked,
        inCiclosFin : document.getElementById('inCiclosFin').value
    }

    fetch('/consultas/historial/'+criterio, {
        method: 'POST',
        headers: {'Content-Type':'application/json',
                    'csrf-token': csrf},
        body:JSON.stringify(data)
    }).then(result => {
        return result.json(); 
    }).then(data => {
        //console.table(data.historial);
        if(data.historial.length === 0){
            let html = 'No hay resultados';
            document.getElementById('tablaHistorial').innerHTML = html;
        }else {
            let html = '<table class="striped highlight responsive-table">'+-
                        +'<thead><tr>'+
                        '<td>Programa</td>'+
                        '<td>Periodo</td>'+
                        '<td>Terapeuta</td>'+
                        '<td>Calificación Inicial</td>'+
                        '<td>Calificación Final</td>'+
                        '<td>Avance</td>'+
                        '</tr></thead>'+
                        '<tbody>';
            for (let programa of data.historial) {
                html += '<tr>'+
                        '<td>'+programa.nombrePrograma+'</td>'+
                        '<td>'+programa.FechaInicial+'-'+programa.FechaFinal+'</td>'+
                        '<td>'+programa.nombreMaestro+' '+programa.apellidoPMaestro+' '+programa.apellidoMMaestro+'</td>'+
                        '<td>'+(Math.round((programa.CalifInicial) * 10) / 10)+'</td>'+
                        '<td>'+(Math.round((programa.CalifFinal) * 10) / 10)+'</td>'+
                        '<td>'+(Math.round((programa.Avance) * 100) / 100)+'%</td>'+
                        '</tr>';
            }
            html += '</tbody></table>';
            
            document.getElementById('tablaHistorial').innerHTML = html;
        }
        
    }).catch(err => {
        console.log(err);
    });
}