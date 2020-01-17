const assert = require('assert')
const api = require('../api')
const Context = require('./../db/strategies/base/contextStrategy')
const Postgres = require('./../db/strategies/postgres/postgres')
const UsuarioSchema = require('./../db/strategies/postgres/schemas/usuarioSchema')

let app = {}
const USER = {
    username:'brucewayne',
    password:'123'
}

const USER_DB = {
    username:USER.username.toLowerCase(),
    password:'$2b$04$IwbxLtRPvFYI.4VzglHIMe0ID392glfadDX8UtkUubh35krZ3Y3Ri'
    //...USER,
    //password:'$2b$04$JZm2c2wLFti8aorD6BcxPuIUV7/TGHTVPNQJVbgMHJmtR1LIBNpS.'
}

describe('Auth test suite', function() {
    this.beforeAll(async() => {
        app = await api

        const connectionPostgres = await Postgres.connect()
        const model = await Postgres.defineModel(connectionPostgres, UsuarioSchema)
        const postgres = new Context(new Postgres(connectionPostgres, model))
        await model.update(null, USER_DB, true) 
    })

    it('Obter um token', async() => {
        const result = await app.inject({
            method:'POST',
            url:'/login',
            payload: USER
        })

        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)

        assert.deepEqual(statusCode, 200)
        assert.ok(dados.token.length > 10)
    })

    it('Retorna não autorizado ao tentar obter um login incorreto', async() => {
        const result = await app.inject({
            method:'POST',
            url:'/login',
            payload: {
                username:'jgazal',
                password:'123'
            }
        })

        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)

        assert.deepEqual(statusCode, 401)
        assert.deepEqual(dados.error, "Unauthorized")
    })
})