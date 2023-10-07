import 'dotenv/config';
import { Busquedas } from "./models/busquedas.js";
import { inquirerMenu, leerInput, listarLugares, pausa } from "./helpers/inquirer.js";


const main = async () => {

    const busquedas = new Busquedas();
    let opt;

    do {
        opt = await inquirerMenu();

        switch ( opt ) {
            case 1:
                // Digitar el termino a buscar
                const termino = await leerInput('Ciudad: ');

                // Buscar los lugares
                const lugares = await busquedas.buscarCiudad( termino );

                // Seleccionar un lugar
                const id = await listarLugares(lugares);

                if( id === '0' ) continue;

                const lugarSel = lugares.find( l => l.id === id );
                busquedas.agregarHistorial( lugarSel.nombre );

                // Datos del clima
                const { desc = '', min = '', max = '', temp = '' } = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng);

                console.clear();
                // Mostrar resultados
                console.log('\nInformación de la ciudad\n'.green);
                console.log('Ciudad:      '.cyan, lugarSel.nombre);
                console.log('Lat:         '.cyan, lugarSel.lat);
                console.log('Lng:         '.cyan, lugarSel.lng);
                console.log('Predicción:  '.cyan, desc);
                console.log('Temperatura: '.cyan, temp);
                console.log('Mínima:      '.cyan, min);
                console.log('Máxima:      '.cyan, max);
                break;

            case 2:
                busquedas.historialCapitalizado.forEach( (lugar, i) => {
                    const idx = `${ i + 1 }.`.green;
                    console.log(`${ idx } ${ lugar }`);
                });
                break;

            default:
                break;
        }

        if (opt !== 0) await pausa();
    } while ( opt !== 0 );
};

main();