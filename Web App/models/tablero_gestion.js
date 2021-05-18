const tabGestion = [
    {
        nombre: 'GESTIÓN DE USUARIOS',
        imagen: 'https://www.fundacionsomos.cl/wp-content/uploads/2017/05/IMG_2792-960x750.jpeg',
        ruta:   'gestionUsuarios'
    },
    {
        nombre: 'GESTIÓN DE PARTICIPANTES',
        imagen: 'https://www.fundacionsomos.cl/wp-content/uploads/2017/05/IMG_2792-960x750.jpeg',
        ruta:   'gestionParticipantes'
    },
    {
        nombre: 'GESTIÓN DE PROGRAMAS',
        imagen: 'https://www.fundacionsomos.cl/wp-content/uploads/2017/05/IMG_2792-960x750.jpeg',
        ruta:   'gestionProgramas'
    },
    {
        nombre: 'GESTION DE CICLOS',
        imagen: 'https://www.fundacionsomos.cl/wp-content/uploads/2017/05/IMG_2792-960x750.jpeg',
        ruta:   'gestionCiclos'
    }
];

module.exports = class TableroGestion {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(nombre, imagen, ruta) {
        this.nombre = nombre;
        this.imagen = imagen;
        this.ruta = ruta;
    }
    //Este método servirá para guardar de manera persistente el nuevo objeto. 
    save() {
        tabGestion.push(this);
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return tabGestion;
    }

}