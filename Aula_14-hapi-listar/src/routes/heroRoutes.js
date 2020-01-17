const BaseRoute = require('./base/baseRoute')

class HeroRoutes extends BaseRoute {
    constructor(db) {
        super()
        this.db = db
    }

    list() {
       return {
           path:'/herois',
           method:'GET',
           handler:(request, headlers) => {
               try {
                   const {skip, limit, nome} = request.query
                   
                   let query = {}
                   if(nome) {
                       query.nome = nome
                   }

                   if(isNaN(skip)) {
                       throw Error('Tipo do skip incorreto')
                   }
                   if(isNaN(limit)) {
                        throw Error('Tipo do limit incorreto')
                   }

                   return this.db.read(query, parseInt(skip), parseInt(limit))

               } catch (error) {
                   console.log('Erro', error) 
                   return "Erro interno no servidor"
               }
           }
       } 
    }
}

module.exports = HeroRoutes