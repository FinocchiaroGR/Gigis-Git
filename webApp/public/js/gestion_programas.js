// Or with jQuery

$(document).ready(function(){
    $('.modal').modal();
});

// Eliminar programa
$(document).ready(() => {
    $(".eliminarProgra").on("click", () => {
      location.replace("./");
      window.alert("Se eliminó el programa.");
    });
});

      //let index = programas.indexOf(programa);
      //programas.splice(index,1);

// Eliminar objetivos
$(document).ready(() => {
  $(".eliminarObj").on("click", () => {
    location.replace("./gestion-nivel-objetivos");
    window.alert("Se eliminó el objetivo.");
  });
});