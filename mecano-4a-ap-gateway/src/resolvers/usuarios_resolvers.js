const { ApolloError } = require("apollo-server-errors");

const usuariosResolvers = {
    Query: {
        detallesUsuarioPorId: async function(_, {idUsuario}, context) {
            
            if (!context.usuarioT){
                throw new ApolloError("Acceso No Autorizado", 401)
            }

            if (idUsuario == context.usuarioT.id) {
                return context.dataSources.usuariosAPI.getUser(idUsuario);
            }
        },

        detallesUsuarioAutenticado: async function(_, __, context) {
            if (!context.usuarioT) {
                throw new ApolloError("No hay usuario autenticado.", 400)
            }

            return context.dataSources.usuariosAPI.getUser(context.usuarioT.id);
        },

        listaUsuarios: async function(_, __, context) {
            // TODO Agregar 
            return [];
        }
    },

    Mutation: {
        logIn: async function(_, {credenciales}, context) {
            return context.dataSources.usuariosAPI.authRequest(credenciales);
        },

        actualizarToken: async function(_, {tActualizacion}, context) {
            return context.dataSources.usuariosAPI.refreshToken(tActualizacion);
        },

        registrarUsuario: async function(_, {registroInput}, context) {
            return context.dataSources.usuariosAPI.createUser(registroInput);
        },

        actualizarUsuario: async function(_, {idUsuario, actualizacionInput}, context) {
            return context.dataSources.usuariosAPI.update(idUsuario, actualizacionInput);
        },

        eliminarUsuario: async function(_, {idUsuario}, context) {
            return context.dataSources.usuariosAPI.delete(idUsuario);
        }
    }
}

module.exports = usuariosResolvers