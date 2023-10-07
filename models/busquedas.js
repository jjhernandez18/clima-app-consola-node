import fs from "fs";
import axios from "axios";

class Busquedas {

    historial = [];
    dbPath = './db';
    dbFile = '/database.json';

    get paramsMapbox() {
        return {
            'language': 'es',
            'access_token': process.env.MAPBOX_KEY,
        };
    }

    get paramsOpenwheather() {
        return {
            'appid': process.env.OPENWHEATHER_KEY,
            'lang': 'es',
            'units': 'metric',
        };
    }

    get historialCapitalizado() {
        return this.historial.map( ciudad => ciudad.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))) )
    }

    constructor() {
        this.leerDB();
    }

    async buscarCiudad( lugar = '' ) {
        // peticion http
        try {
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json`,
                params: this.paramsMapbox
            });

            const resp = await instance.get();

            return resp.data.features.map( lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1],
            }));

        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async climaLugar( lat, lon ) {
        try {
            // instance axios
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: { ...this.paramsOpenwheather, lat, lon }
            });
            const resp = await instance.get();
            const { weather, main } = resp.data;
            return {
                desc : weather[0].description,
                min  : main.temp_min + '°C',
                max  : main.temp_max + '°C',
                temp : main.temp + '°C',
            };

        } catch (error) {
            console.log(error);
            return {
                desc : '',
                min  : '',
                max  : '',
                temp : '',
            };
        }
    }

    agregarHistorial( lugar = '' ) {

        if( this.historial.includes( lugar.toLowerCase() )) {
            return;
        }

        this.historial.unshift( lugar.toLowerCase() );
        this.historial = this.historial.splice(0, 5);
        this.guardarDB();
    }

    guardarDB() {
        const payload = { historial: this.historial };

        if( fs.existsSync(this.dbPath) ) {
            fs.writeFileSync( this.dbPath + this.dbFile, JSON.stringify( payload ) );
        }
    }

    leerDB() { 
        if( fs.existsSync(this.dbPath + this.dbFile) ) {
            const read = fs.readFileSync(this.dbPath + this.dbFile, { encoding: 'utf-8' });
            const data = JSON.parse( read );
            this.historial = data.historial;
        }
    }
}


export { Busquedas };