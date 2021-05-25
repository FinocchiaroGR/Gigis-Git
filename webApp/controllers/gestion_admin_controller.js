const Arrow = require('../models/arrow');
const TableroGestion = require('../models/tablero_gestion');

const arrows = Arrow.fetchAll();
const tabGestion = TableroGestion.fetchAll();

exports.get = ((request,response,next) => {
    response.render('gestion_administrativa', {
        tabGestion: tabGestion, 
        tituloDeHeader: "Gestión Administrativa",
        tituloBarra: "Gestión administrativa",
        backArrow: arrows[0],
        forwArrow: arrows[1]
    });
});
