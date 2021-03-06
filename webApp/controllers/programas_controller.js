const Grupo = require('../models/grupos');
const Programa = require('../models/programas');
const Arrow = require('../models/arrow');
const Participante_Grupo_Objetivo = require('../models/participantes_grupos_objetivos');
const Usuario = require('../models/usuarios')
const arrows = Arrow.fetchAll();
const arrayToLinkedlist = require('array-to-linkedlist');
const { response } = require('express');

exports.getProgramas = (request, response, next) => {
  const permiso = request.session.permisos;
  const rol = request.session.rol;
  const usuario = request.session.user;
  let existeTerapeuta = 0;
  const idPrograma = request.params.id_programa;
  const programasParticipante = request.session.programasParticipante;
  Programa.fetchNombreProgama(idPrograma)
    .then(([programa, fieldData]) => {
      Grupo.fethcGruposProgramaActual(idPrograma)
      .then(([grupos, fieldData1]) => {
        for (let grupo of grupos) {
          if (grupo.login === usuario)
            existeTerapeuta = 1;
        }
        if(existeTerapeuta || programasParticipante.includes(parseInt(idPrograma)) || rol === 4) {
          Participante_Grupo_Objetivo.fetchParticipantesPorPrograma(idPrograma)
            .then(([participantes,fieldData2]) => {
              Participante_Grupo_Objetivo.calificacionesPorPrograma(idPrograma)
                .then(([calificaciones, fieldData3]) => {
                  const listaGrupos = arrayToLinkedlist(grupos);
                  const listaParticipantes = arrayToLinkedlist(participantes);
                  const listaCalificaciones = arrayToLinkedlist(calificaciones);
                  response.render('programas_programa1', {
                    tituloDeHeader: programa[0].nombrePrograma,
                    tituloBarra: programa[0].nombrePrograma,
                    programa: idPrograma,
                    puntajeMax: programa[0].puntajeMaximo,
                    grupos: listaGrupos,
                    rol: rol,
                    usuario: usuario,
                    participantes: listaParticipantes,
                    calificaciones: listaCalificaciones,
                    permisos: request.session.permisos,
                    backArrow: { display: 'block', link: '/programas' },
                    forwArrow: arrows[1]
                  });
                }).catch((err) => {
                  console.log(err);
                })
            }).catch((err) => {
              console.log(err);
            })
        }
        else {
          response.status(404);
          response.send('Lo sentimos, este sitio no existe');
        }
      }).catch((err) => {
          console.log(err);
      })
    }).catch((err) => {
      console.log(err);
  })
}

exports.getProgramasAnteriores = (request, response, next) => {
  const permiso = request.session.permisos;
  const rol = request.session.rol;
  const usuario = request.session.user;
  let existeTerapeuta = 0;
  const idPrograma = request.params.id_programa;
  const programasParticipante = request.session.programasParticipante;
  Programa.fetchNombreProgama(idPrograma)
    .then(([programa, fieldData]) => {
      Grupo.fethcGruposProgramaAnterior(idPrograma)
      .then(([grupos, fieldData1]) => {
        for (let grupo of grupos) {
          if (grupo.login === usuario)
            existeTerapeuta = 1;
        }
        if(existeTerapeuta || programasParticipante.includes(parseInt(idPrograma)) || rol === 4) {
          Participante_Grupo_Objetivo.fetchParticipantesPorProgramaAnterior(idPrograma)
            .then(([participantes,fieldData2]) => {
              Participante_Grupo_Objetivo.calificacionesPorProgramaAnterior(idPrograma)
                .then(([calificaciones, fieldData3]) => {
                  const listaGrupos = arrayToLinkedlist(grupos);
                  const listaParticipantes = arrayToLinkedlist(participantes);
                  const listaCalificaciones = arrayToLinkedlist(calificaciones);
                  response.render('programas_programa1', {
                    tituloDeHeader: programa[0].nombrePrograma,
                    tituloBarra: programa[0].nombrePrograma,
                    programa: idPrograma,
                    puntajeMax: programa[0].puntajeMaximo,
                    grupos: listaGrupos,
                    rol: rol,
                    usuario: usuario,
                    participantes: listaParticipantes,
                    calificaciones: listaCalificaciones,
                    permisos: request.session.permisos,
                    backArrow: { display: 'block', link: '/programas/cicloAnterior' },
                    forwArrow: arrows[1]
                  });
                }).catch((err) => {
                  console.log(err);
                })
            }).catch((err) => {
              console.log(err);
            })
        }
        else {
          response.status(404);
          response.send('Lo sentimos, este sitio no existe');
        }
      }).catch((err) => {
          console.log(err);
      })
    }).catch((err) => {
      console.log(err);
  })
}

exports.objetivosParticipantes = (request, response, next) => {
  Participante_Grupo_Objetivo.fetchObjetivosPorParticipante(request.body.grupo_id,request.body.login_participante)
    .then(([objetivos, fieldData]) => {
      Grupo.fetchIdPrograma(request.body.grupo_id)
        .then(([programa,fieldData2]) => {
          return response.status(200).json({ 
            objetivos: objetivos,
            programa: programa,
            grupo: request.body.grupo_id,
            participante: request.body.login_participante
          });
        }).catch((err) => { 
          console.log(err);
          return response.status(500).json({message: "Internal Server Error"});
      })
    }).catch((err) => { 
        console.log(err);
        return response.status(500).json({message: "Internal Server Error"});
    })
};

exports.registroPuntajes = (request, response, next) => {
  for (participante of request.body.objetivos){
    let puntaje_final = participante.pFinal === '' ? null : participante.pFinal;
    let puntaje_inicial = participante.pInicial === '' ? null : participante.pInicial;
    Participante_Grupo_Objetivo.ActualizarPuntajes(participante.login, participante.idGrupo, participante.idObjetivo, puntaje_inicial, puntaje_final)
      .then(() =>{
      }).catch((err) => {
        console.log(err);
        return response.status(500).json({message: "Internal Server Error"});
    })
  }
  Usuario.fetchNombre(request.body.objetivos[0].login)
    .then(([nombre,fieldData]) => {
      return response.status(200).json({
        nombre: nombre,
        grupo: request.body.objetivos[0].idGrupo
      });
    }).catch((err) => {
          console.log(err);
          return response.status(500).json({message: "Internal Server Error"});
      })
};

exports.get = (request, response, next) => {
  const permiso = request.session.permisos;
  const rol = request.session.rol;
  const usuario = request.session.user;
  request.session.programasParticipante = [];

  if(permiso.includes(15)){ 
    Programa.fetchProgramasCicloActual()
      .then(([programas, fieldData1]) => {
        (async() => { 
          for (let programa of programas) {
            await Participante_Grupo_Objetivo.fetchParticipantesPorPrograma(programa.idPrograma)
              .then(([participantes, fieldData3]) => {
                for (let participante of participantes)
                  if (usuario === participante.login)
                  request.session.programasParticipante.push(programa.idPrograma)
              })
              .catch((err) => console.log(err));
          }
        Grupo.fetchGruposCicloActual()
          .then(([grupos, fieldData2]) => {
            response.render('programas', {
              botonCiclo: 'anterior',
              rutaCiclo: './cicloAnterior',
              tituloDeHeader: 'Programas',
              rutaAnterior: './',
              tituloBarra: 'Programas',
              programas: programas,
              grupos: grupos,
              rol: rol,
              usuario: usuario,
              programasParticipante: request.session.programasParticipante,
              permisos: request.session.permisos,
              backArrow: arrows[0],
              forwArrow: arrows[1],
            });
          })
          .catch((err) => console.log(err));
        })();
      })
      .catch((err) => console.log(err));
  }
  else {
    return response.redirect('/consultas');
  }
};

 
exports.getCicloAnterior = (request, response) => {
  const permiso = request.session.permisos;
  const rol = request.session.rol;
  const usuario = request.session.user;
  request.session.programasParticipante = [];

  if(permiso.includes(15)){ 
    Programa.fetchProgramasCicloAnterior()
      .then(([programas, fieldData1]) => {
        (async() => { 
          for (let programa of programas) {
            await Participante_Grupo_Objetivo.fetchParticipantesPorPrograma(programa.idPrograma)
              .then(([participantes, fieldData3]) => {
                for (let participante of participantes)
                  if (usuario === participante.login)
                  request.session.programasParticipante.push(programa.idPrograma)
              })
              .catch((err) => console.log(err));
          }
        Grupo.fetchGruposCicloAnterior()
          .then(([grupos, fieldData2]) => {
            response.render('programas', {
              botonCiclo: 'actual',
              rutaCiclo: './',
              tituloDeHeader: 'Programas del ciclo anterior',
              tituloBarra: 'Programas del ciclo anterior',
              rutaAnterior: './cicloAnterior/',
              programas: programas,
              grupos: grupos,
              rol: rol,
              usuario: usuario,
              programasParticipante: request.session.programasParticipante,
              permisos: request.session.permisos,
              backArrow: arrows[0],
              forwArrow: arrows[1],
            });
          })
          .catch((err) => console.log(err));
        })();
      })
      .catch((err) => console.log(err));
  }
  else {
    return response.redirect('/consultas');
  }
};