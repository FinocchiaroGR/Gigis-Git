const db = require('../util/database');
module.exports = class inputsCiclos {
    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(prograSel, terapAsig, fechaCiclo, idCiclo, idGrupo) {
      this.prograSel = prograSel;
      this.terapAsig = terapAsig;
      this.fechaCiclo = fechaCiclo;
      this.idCiclo = idCiclo;
      this.idGrupo = idGrupo;
    }
  
    static setProg(prograSel){
      this.prograSel = prograSel;
    }

    static setGrup(terapAsig){
        this.terapAsig = terapAsig;
    }
  
    static getProg(){
        return this.prograSel;
    }

    static getTer(){
        return this.terapAsig;
    }

    static llenarTablas(fechaCiclo){
      this.fechaCiclo = fechaCiclo;
      this.idCiclo = db.execute('SELECT idCiclo FROM ciclos WHERE fechaFinal =?'),
                      [this.fechaCiclo];
      return this.idCiclo;
      
  }
}