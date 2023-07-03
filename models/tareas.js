import {Tarea} from './tarea.js'

class Tareas {

    _listado = {}; // no es necesario pero hace que sea mas facil la visualización. El guion bajo es para indicar que es privada.


    get listadoArr() {
        
        const listado = [];

        Object.keys(this._listado).forEach( key => {
            listado.push( this._listado[key]);
        })

        return listado;
    }

    constructor() {
        this._listado = {};
    }

    borrarTarea( id = ''){

        if( this._listado[id]){
            delete this._listado[id];
        }
    }

    crearTarea( desc = '') {
        
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;

    }

    cargarTareasFromArray( tareas = []) {

        tareas.forEach( tarea => this._listado[tarea.id] = tarea);

    }

    listadoCompleto() {

        console.log();
        this.listadoArr.forEach( ({desc, completadoEn}, idx) => {
            const idxStr = `${idx+1}.`.green;
            const estado = (completadoEn)
                                ? 'Completada'.green
                                : 'Pendiente'.red;
            console.log(`${idxStr} ${desc} :: ${estado}`)
        })
    }

    listarPendientesCompletadas( completadas = true) {

        console.log();
        let idx = 0;
        this.listadoArr.forEach( ({desc, completadoEn}) => {
            const estado = (completadoEn)
                                ? 'Completada'.green
                                : 'Pendiente'.red;

            if (completadas && completadoEn){
                idx += 1;
                const idxStr = `${idx}.`.green;
                console.log(`${idxStr} ${desc} :: ${completadoEn.green}`)
            } else if (!completadas && !completadoEn) {
                idx += 1;
                const idxStr = `${idx}.`.green;
                console.log(`${idxStr} ${desc} :: ${estado}`)
            }
        })
    }

    toggleCompletadas( ids = []){

        ids.forEach(id => {
            const tarea = this._listado[id];
            if (!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString();
            }
        })

        this.listadoArr.forEach( tarea => {
            if( !ids.includes(tarea.id)){
                tarea.completadoEn = null;
            }
        })
    }

}


export {
    Tareas
}