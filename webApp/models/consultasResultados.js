const db = require('../util/database');

const color = ['red', 'blue', 'green', 'yellow'];
const meses = ['','Ene', 'Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];

module.exports = class DatosConsultas {
  //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
  constructor() {
    this.listaProgam = [];
    this.cicloIni = 0;
    this.intervaloCiclo = true;
    this.cicloFin = 0;
    this.estadoConsulta = true;
    this.califOava = true;
    this.filtrarEdad = false;
    this.edadIni = 0;
    this.intervaloEdad = false;
    this.edadFin = 99;
    this.filtrarSexo = false;
    this.valueSexo = false;
    this.mostrarSexEdad = true;
    this.mostrarCalif = true;
    this.ultimaConsulta = '';
    this.varsUltimaConsulta =[];
  }

  setListaProg(listaProgam){
    //console.table(listaProgam);
    this.listaProgam = listaProgam;
  }

  getModoConsulta(){
      return this.listaProgam.length;
  }

  setValues(cicloIni,intervaloCiclo,cicloFin,estadoConsulta,califOava,filtrarEdad,edadIni,intervaloEdad,edadFin,filtrarSexo,valueSexo,mostrarSexEdad,mostrarCalif){
    this.cicloIni = cicloIni;
    this.intervaloCiclo = intervaloCiclo;
    this.cicloFin = cicloFin;
    this.estadoConsulta = estadoConsulta;
    this.califOava = califOava;
    this.filtrarEdad = filtrarEdad;
    this.edadIni = edadIni;
    this.intervaloEdad = intervaloEdad;
    this.edadFin = edadFin;
    this.filtrarSexo = filtrarSexo;
    this.valueSexo = valueSexo;
    this.mostrarSexEdad = mostrarSexEdad;
    this.mostrarCalif = mostrarCalif;
  }

  static fetchColors(){
      return color;
  }

  static fetchMeses(){
    return meses;
 }

  //Este método servirá para devolver los objetos del almacenamiento persistente.
  static fetchAll() {
    this.ultimaConsulta = 'SELECT * FROM CalifDatos';
    this.varsUltimaConsulta = [];
    return db.execute('SELECT * FROM CalifDatos');
  }

  fetchProgCiclos(){
    let texto = 'SELECT G.idPrograma, P.nombrePrograma, G.idCiclo, P.puntajeMaximo, COUNT(G.idGrupo) AS `numGrupos` FROM grupos G, programas P WHERE G.idPrograma=P.idPrograma AND ';
    let vars = [];

    texto += 'G.idCiclo >= ? AND G.idCiclo <= ?';
    if(this.intervaloCiclo){
        vars.push(this.cicloIni);
        vars.push(this.cicloFin);
   } else {
        vars.push(this.cicloIni);
        vars.push(this.cicloIni);
   }
    

    texto += ' AND ( G.idPrograma = ?';
    vars.push(this.listaProgam[0]);

    for(let i = 1; i < this.listaProgam.length; i++){
        texto += ' OR G.idPrograma = ?';
        vars.push(this.listaProgam[i]);
    }
    texto += ' ) GROUP BY G.idPrograma, G.idCiclo ORDER BY G.idCiclo, G.idPrograma';
    this.ultimaConsulta = texto;
    this.varsUltimaConsulta = vars;
    console.log(texto);
    return db.execute(texto, vars);
  }

  getBools(){
      let arrdeBools = {
        estadoConsulta: this.estadoConsulta,
        mostrarSexEdad: this.mostrarSexEdad,
        mostrarCalif:   this.mostrarCalif,
        califOava:      this.califOava
      };
      return arrdeBools;
  }
  
  fetch(){
        //CALL crearConsultaCalif ( Filtrar_edad BOOL, Filtrar_sexo BOOL, Calif_Ava BOOL, Ciclo_ini INT, Ciclo_fin INT, 
        //                          Edad_ini INT, Edad_fin INT, Sexo CHAR, cantProg INT, Programas CHAR[255] )
        let texto = 'CALL crearConsultaCalif (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        let vars = [this.filtrarEdad,this.filtrarSexo,!this.califOava];
        if(this.intervaloCiclo){
            vars.push(parseInt(this.cicloIni));
            vars.push(parseInt(this.cicloFin));
        } else {
            vars.push(parseInt(this.cicloIni));
            vars.push(parseInt(this.cicloIni));
        }
        this.edadIni = this.edadIni === undefined ? 0 : parseInt(this.edadIni);
        this.edadFin = this.edadFin === undefined ? 200 : parseInt(this.edadFin);
        if(this.intervaloEdad){
            vars.push(this.edadIni);
            vars.push(this.edadFin);
        } else {
            vars.push(this.edadIni);
            vars.push(this.edadIni);
        }
        if(this.valueSexo){
            vars.push('H');
        } else {
            vars.push('M');
        }
        vars.push(this.listaProgam.length);
        vars.push(this.listaProgam.toString());
        //console.log(vars);
        return db.execute(texto,vars)
        .then(() => {
            return db.execute('SELECT * FROM ultimaConsulta',[]);
        }).catch( err => {
            console.log(err);
        });
  }

  fetchCants(){
    let TotCol = 0;
    let cicloFin = 0;
    if(this.intervaloCiclo){
        TotCol = (this.cicloFin - this.cicloIni+1)*this.listaProgam.length;
        cicloFin = this.cicloFin;
    } else {
        TotCol = this.listaProgam.length;
        cicloFin = this.cicloIni;
    }
    let data = {
        TotCol : TotCol,
        cicloIni : this.cicloIni,
        cicloFin : cicloFin,
        TotProg : this.listaProgam.length,
        TotCicl : this.cicloFin - this.cicloIni+1,
        listaProg : this.listaProgam, 
        TotPart : 0
    }
    return db.execute('SELECT COUNT(*) AS `TotPart` FROM ultimaConsulta',[])
    .then(([rows, fieldData]) => {
        data.TotPart = rows[0].TotPart;
        if(data.TotPart === 0){
            throw Error("No existen datos que coincidan con las condiciones propuestas");
        }
        return data;
    }).catch( err => {
        throw Error(err);
    });
  }

  static prepConsulta(){
    this.ultimaConsulta = '';
    this.varsUltimaConsulta = [];
    db.execute('DROP TABLE IF EXISTS ultimaConsulta',[])
    .then(() => {
        db.execute('DROP TEMPORARY TABLE IF EXISTS listprog_temp',[]);
    }).catch( err => {
        console.log(err);
    });
  }

  fetchGen(){
    /*
    //CALL cosultaGeneral ( Ciclo_ini INT, Num INT, Calif_Ava BOOL, Programas VARCHAR(255) )
    let texto = 'CALL cosultaGeneral (?, ?, ?, ?)';
    let TotCol = 0;
    if(this.intervaloCiclo){
        TotCol = (this.cicloFin - this.cicloIni+1)*this.listaProgam.length;
    } else {
        TotCol = this.listaProgam.length;
    }
    let vars = [this.cicloIni,TotCol,!this.califOava,this.listaProgam.toString()];
    console.log(vars);
    return db.execute(texto,vars)*/
    let texto = 'SELECT COUNT(*) AS `ContTotal`';
    let cantJoins = 0;
    if(this.intervaloCiclo){
        cantJoins = (this.cicloFin - this.cicloIni+1)*this.listaProgam.length;
        //console.log('Ini - ' + this.cicloIni + '_ Fin - ' + this.cicloFin);
    } else {
        cantJoins = this.listaProgam.length;
        //console.log('Ini - ' + this.cicloIni + '_ Fin - ' + this.cicloIni);
    }
    let cicloCont = 0, progCont = 0;
    for(let i = 0; i<cantJoins; i++) { 
            if(this.califOava){
                texto += ', AVG(Avance_P' + this.listaProgam[progCont] + '_C' + (parseInt(this.cicloIni) + cicloCont) + ') AS `Prom_Avance_P' + this.listaProgam[progCont] +'_C' + (parseInt(this.cicloIni) + cicloCont) + '`';
            } else {
                texto += ', AVG(CalifFinal_P' + this.listaProgam[progCont] + '_C' + (parseInt(this.cicloIni) + cicloCont) + ') AS `Prom_Calif_P' + this.listaProgam[progCont] +'_C' + (parseInt(this.cicloIni) + cicloCont) + '`';
            }
        if(((progCont+1) % this.listaProgam.length) === 0){
            progCont = 0; 
            cicloCont++;
        } else {
            progCont++;
        }
    }
    texto +=' FROM ultimaConsulta';
    return db.execute(texto,[]);
  }

    static fetchPorGroup_cons(){
        return db.execute('SELECT t1.*, t2.TotalAlumnInscr, t2.Prom_calif_gr, t2.Prom_Ava_gr FROM'+
        ' (SELECT COUNT(U.idGrupo) AS `TotalMatchs`, U.idGrupo, U.idCiclo, P.nombrePrograma, P.dirImagen, S.nombreUsuario, S.apellidoPaterno, S.apellidoMaterno'+
        ' FROM ultimaConsulta U, grupos_terapeutas GT, usuarios S, programas P'+
        ' WHERE U.idPrograma = P.idPrograma AND U.idGrupo = GT.idGrupo AND GT.login = S.login'+
        ' GROUP BY U.idGrupo) t1 LEFT JOIN'+
        ' (SELECT COUNT(idGrupo) AS `TotalAlumnInscr`, AVG(c.CalifFinal) AS `Prom_calif_gr`, AVG(c.Avance) AS `Prom_Ava_gr`, idGrupo'+
        ' FROM califdatos c GROUP BY idGrupo) t2'+
        ' ON (t1.idGrupo = t2.idGrupo)',[]);
    }

    fetchPorGrupo(id){
        //CALL consultaGrupo ( Filtrar_edad BOOL, Filtrar_sexo BOOL, grupo INT, Edad_ini INT, Edad_fin INT, Sexo VARCHAR(1))
        let texto = 'CALL consultaGrupo (?, ?, ?, ?, ?, ?)';
        let vars = [this.filtrarEdad,this.filtrarSexo,id];
        this.edadIni = this.edadIni === undefined ? 0 : parseInt(this.edadIni);
        this.edadFin = this.edadFin === undefined ? 200 : parseInt(this.edadFin);
        if(this.intervaloEdad){
            vars.push(this.edadIni);
            vars.push(this.edadFin);
        } else {
            vars.push(this.edadIni);
            vars.push(this.edadIni);
        }
        if(this.valueSexo){
            vars.push('H');
        } else {
            vars.push('M');
        }
        return db.execute(texto,vars)
        .then(() => {
            return db.execute('SELECT * FROM consultagrupo',[]);
        }).catch( err => {
            console.log(err);
        });
    }

    static DatosGenGrupo(){
        //CALL consultaGenGrupo ( grupo INT )
        /*let texto = 'CALL consultaGenGrupo ()';
        let vars = [];
        return db.execute(texto,vars);*/
        let texto = 'SELECT C.idGrupo, C.idPrograma, C.idCiclo, P.nombrePrograma, U.nombreUsuario, U.apellidoPaterno, U.apellidoMaterno,'+
        ' AVG(C.CalifFinal) AS `Prom_CaliF`, AVG(C.Avance) AS `Prom_Ava`'+
        ' FROM consultagrupo C, programas P, grupos_terapeutas GT, usuarios U WHERE'+
        ' C.idGrupo = GT.idGrupo AND GT.login = U.login AND P.idPrograma=C.idPrograma';
        return db.execute(texto,[]);
    }
};