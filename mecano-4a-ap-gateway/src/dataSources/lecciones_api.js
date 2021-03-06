const { RESTDataSource } = require('apollo-datasource-rest');
const serverConfig       = require('../server');
class LeccionesAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = serverConfig.mecano_4a_be_niveles_url;
    }

    async registrarLeccion(nuevaLeccion) {
        nuevaLeccion = new Object(JSON.parse(JSON.stringify(nuevaLeccion)));
        return await this.post(`/aprende/lecciones`,nuevaLeccion);
    }

    async traerLeccion(nivel,nLeccion) {
        return await this.get(`/aprende/lecciones/${nivel}/${nLeccion}`);
    }

    async traerLeccionPorId(idLeccion) {
        return await this.get(`/aprende/lecciones/${idLeccion}`);
    }

    async traertodasLecciones(nro_nivel = null) {
        let requestParams = {}
        if (nro_nivel)
            requestParams = {nivel:nro_nivel}

        return await this.get(`/aprende/lecciones/`, requestParams);
    }

    async traertodasLeccionesLigeras(nro_nivel = null) {
        let requestParams = {}
        if (nro_nivel)
            requestParams = {nivel:nro_nivel}

        return await this.get(`/aprende/lecciones-ligeras/`, requestParams);
    }

    async actualizarLeccion(nivelViejo, nLeccionViejo,leccionNueva) {
        leccionNueva = new Object(JSON.parse(JSON.stringify(leccionNueva)));
        return await this.put(`/aprende/lecciones/${nivelViejo}/${nLeccionViejo}`, leccionNueva);
    }

    async actualizarLeccionPorId(idLeccion, leccionNueva) {
        leccionNueva = new Object(JSON.parse(JSON.stringify(leccionNueva)));
        return await this.put(`/aprende/lecciones/${idLeccion}`, leccionNueva);
    }

    async borrarLeccion_sin_detalle(nivel,nLeccion) {
        return await this.delete(`/aprende/lecciones/${nivel}/${nLeccion}`);
    }

    async borrarLeccionPorId(idLeccion) {
        return await this.delete(`/aprende/lecciones/${idLeccion}`);
    }
   
}
module.exports = LeccionesAPI;