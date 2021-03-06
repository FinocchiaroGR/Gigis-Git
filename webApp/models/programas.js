const db = require('../util/database');

module.exports = class Programas {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(nombrePrograma, puntajeMaximo, dirImagen) {
        this.nombrePrograma = nombrePrograma;
        this.puntajeMaximo = puntajeMaximo;
        this.dirImagen = dirImagen;
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto. 
    save() {
        return db.execute(
            'INSERT INTO programas (nombrePrograma, puntajeMaximo, dirImagen) VALUES (?,?,?)',
            [this.nombrePrograma,this.puntajeMaximo,this.dirImagen]
          );
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return db.execute('SELECT * FROM programas ORDER BY nombrePrograma ASC');
    }

    static fetchAllSOrd() {
        return db.execute('SELECT * FROM programas');
    }

    static fetch(criterio) {
        return db.execute('SELECT * FROM programas WHERE nombrePrograma LIKE ?' , ['%'+criterio+'%']);
    }

    static fetchIdPrograma(nombrePrograma) {
        return db.execute('SELECT idPrograma FROM programas WHERE nombrePrograma LIKE ?', 
            [nombrePrograma]
        );
    }

    static fetchNombreProg(){
        return db.execute('SELECT idPrograma, nombrePrograma, puntajeMaximo FROM programas');
    }
    
    static fetchProgramasCicloActual() {
        db.execute('SET lc_time_names = "es_MX";')
        return db.execute('SELECT G.idGrupo, G.idPrograma, nombrePrograma,GP.login, P.dirImagen, DATE_FORMAT(fechaInicial, "%M") AS fechaInicio , DATE_FORMAT(fechafinal, "%M %Y") AS fechaFinal, DATE_SUB(fechaInicial,INTERVAL 60 DAY) AS Inicial, DATE_ADD(fechafinal,INTERVAL 60 DAY) AS Final FROM grupos G ,ciclos C, programas P, grupos_terapeutas GP WHERE G.idCiclo=C.idCiclo AND G.idPrograma=P.idPrograma AND G.idGrupo = GP.idGrupo GROUP BY G.idPrograma, C.idCiclo HAVING Inicial<CURRENT_DATE AND Final>CURRENT_DATE ORDER BY `G`.`idGrupo` ASC'
        );
    }

    static fetchNombreProgama(idPrograma){
        return db.execute('SELECT nombrePrograma, puntajeMaximo FROM programas WHERE idPrograma=?', 
            [idPrograma]
        );
    }

    static editarPrograma(idPrograma, nombrePrograma, dirImagen) {
        return db.execute('UPDATE programas SET nombrePrograma=?,dirImagen=? WHERE idPrograma=?', [nombrePrograma, dirImagen, idPrograma])
    }

    static editarProgramaSinImagen(idPrograma, nombrePrograma) {
        return db.execute('UPDATE programas SET nombrePrograma=? WHERE idPrograma=?', [nombrePrograma, idPrograma])
    }

    static editarProgramaSinTitulo(idPrograma, dirImagen) {
        return db.execute('UPDATE programas SET dirImagen=? WHERE idPrograma=?', [dirImagen, idPrograma])
    }

    static fetchPorIdCiclo(idCiclo) {
        return db.execute(
        'SELECT P.nombrePrograma, P.idPrograma FROM programas P, grupos G WHERE P.idPrograma = G.idPrograma AND G.idCiclo = ? GROUP BY (idPrograma)',
        [idCiclo]
        );
    }

    static programasCiclo(idCiclo) {
        return db.execute(
        'SELECT P.*,  GPCT.idGrupo, case when GPCT.idPrograma is null then 0 else 1 end as paloma FROM programas P LEFT JOIN grupos_programas_ciclos GPCT ON GPCT.idPrograma = P.idPrograma AND GPCT.idCiclo = ? GROUP BY P.idPrograma',
        [idCiclo]
        );
    }

    static fetchProgramasCicloAnterior() {
        db.execute('SET lc_time_names = "es_MX";')
        return db.execute('SELECT G.idGrupo, G.idPrograma, nombrePrograma,GP.login, P.dirImagen, DATE_FORMAT(fechaInicial, "%M") AS fechaInicio , DATE_FORMAT(fechafinal, "%M %Y") AS fechaFinal FROM grupos G ,ciclos C, programas P, grupos_terapeutas GP WHERE G.idCiclo=C.idCiclo AND G.idPrograma=P.idPrograma AND G.idGrupo = GP.idGrupo AND fechaInicial = (SELECT fechaInicial FROM ciclos WHERE idCiclo = (SELECT MAX(idCiclo) FROM ciclos WHERE idCiclo <  (SELECT MAX(idCiclo) FROM ciclos) )) GROUP BY idPrograma'
        );
    }
}
