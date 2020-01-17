const BaseRoute = require('./base/baseRoute')
const Joi = require('joi')
const Boom = require('boom')

const failAction = (request, headers, erro) => {
    throw erro;
}

class HeroRoutes extends BaseRoute {
    constructor(db) {
        super()
        this.db = db
    }

    list() {
       return {
           path:'/herois',
           method:'GET',
           config: {
               validate: {
                   failAction,
                   query: {
                       skip: Joi.number().integer().default(0),
                       limit: Joi.number().integer().default(10),
                       nome: Joi.string().min(3).max(100).default('')
                   }
               }
           },
           handler:(request, headers) => {
               try {
                   const {
                       skip, 
                       limit, 
                       nome
                    } = request.query
                   
                    const query = nome ? {nome:{$regex:`.*${nome}*.`}} : {}

                   return this.db.read(nome ? query : {}, skip, limit)

               } catch (error) {
                   console.log('Erro', error) 
                   //return "Erro interno no servidor"
                   return Boom.internal()
               }
           }
       } 
    }

    create() {
        return {
            path:'/herois',
            method:'POST',
            config: {
                validate: {
                    failAction,
                    payload: {
                        nome:Joi.string().required().min(3).max(100),
                        poder:Joi.string().required().min(2).max(100)
                    }
                }
            },
            handler:async(request) => {
                try {
                    const {nome, poder} = request.payload
                    const result = await this.db.create({nome, poder})
                    return {
                        message:'Heroi cadastrado com sucesso',
                        _id:result._id
                    }
                } catch (error) {
                    console.log('Erro', error)
                    //return 'Internal error'
                    return Boom.internal()
                }
            }
        }
    }

    update() {
        return {
            path:'/heroi/{id}',
            method:'PATCH',
            config: {
                validate: {
                    params: {
                        id:Joi.string().required()
                    },
                    payload: {
                        nome:Joi.string().min(3).max(100),
                        poder:Joi.string().min(2).max(100)
                    }
                }
            },
            handler:async(request) => {
                try {
                    const {id} = request.params;  
                    const {payload} = request
                    const dadosString = JSON.stringify(payload)
                    const dados = JSON.parse(dadosString)
                    
                    const result = await this.db.update(id, dados)
                    /* if(result.nModified !== 1) return {
                        message:'Não foi possível atualizar'
                    } */
                    if(result.nModified !== 1) return Boom.preconditionFailed('Id não encontrado no banco')

                    return {
                        message:'Heroi atualizado com sucesso'
                    }
                } catch (error) {
                    console.error('Erro', error)
                    //return 'Erro interno'
                    return Boom.internal()
                }
            }
        }
    }

    delete() {
        return {
            path:'/herois/{id}',
            method:'DELETE',
            config: {
                validate: {
                    failAction,
                    params: {
                        id:Joi.string().required()
                    }
                }
            },
            handler:async(request) => {
                try {
                    const {id} = request.params  
                    const result = await this.db.delete(id)
                    /* if(result.n !== 1) return {
                        message:'Não foi possível remover o item'
                    } */ 
                    if(result.n !== 1) return Boom.preconditionFailed('Id não encontrado no banco')
                    return {
                        message:'Heroi removido com sucesso'
                    }
                } catch (error) {
                    console.log('Erro', error)
                    //return 'Erro interno'
                    return Boom.internal()
                }
            }
        }
    }
}

module.exports = HeroRoutes