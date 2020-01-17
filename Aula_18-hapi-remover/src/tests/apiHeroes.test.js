const assert = require('assert')
const api = require('./../api')

let app = {}

const MOCK_HEROI_CADASTRAR = {
    nome:'Chapolin',
    poder:'Marreta biônica'
}

const MOCK_HEROI_INICIAL = {
    nome:'Dr. Strange',
    poder:'Magia'
}

let MOCK_ID = ''

describe('Suite de testes da API Heroes', function() {
    this.beforeAll(async() => {
        app = await api
        const result = await app.inject({
            method:'POST',
            url:'/herois',
            payload:JSON.stringify(MOCK_HEROI_INICIAL)
        }) 
        const dados = JSON.parse(resul.payload)
        MOCK_ID = dados._id
    })

    it('listar /herois', async() => {
        const result = await app.inject({
            method:'GET',
            url:'/herois?skip=0&limit=10'
        })

        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode

        assert.deepEqual(statusCode, 200)
        assert.ok(Array.isArray(dados))
    })

    it('listar/herois - deve retornar somente 3 registros', async() => {
        const TAMANHO_LIMITE = 3
        const result = await app.inject({
            method:'GET',
            url:`/herois?skip=0&limit=${TAMANHO_LIMITE}`
        })

        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode

        assert.deepEqual(statusCode, 200)
        assert.ok(dados.length === TAMANHO_LIMITE)
    })

    it('listar/herois - deve retornar um erro com limit incorreto', async() => {
        const TAMANHO_LIMITE = 'A'
        const result = await app.inject({
            method:'GET',
            url:`/herois?skip=0&limit=${TAMANHO_LIMITE}`
        })
        const errorResult = {
            "statusCode": 400,
            "error":"Bad Request",
            "message":"child \"limit\" fails because [\limit\" must be a number]",
            "validation": {
                "source":"query",
                "keys":["limit"]
            }
        }
        assert.deepEqual(result.statusCode, 400)
        assert.deepEqual(result.payload, JSON.stringify(errorResult))
    })

    it('listar GET - /herois - deve filtrar um item', async() => {
        const TAMANHO_LIMITE = 1000
        const NAME = 'Batman'
        const result = await app.inject({
            method:'GET',
            url:`/herois?skip=0&limit=${TAMANHO_LIMITE}&nome=${NAME}`
        })

        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode

        assert.deepEqual(statusCode, 200)
        assert.deepEqual(dados[0].nome, NAME)
    })

    it('cadastrar POST - /herois', async() => {
        const result = await app.inject({
            method:'POST',
            url:`/herois`,
            payload:JSON.stringify(MOCK_HEROI_CADASTRAR)
        })

        const statusCode = result.statusCode
        const {message, _id} = JSON.parse(result.payload)

        assert.ok(statusCode === 200)
        assert.notStrictEqual(_id, undefined)
        assert.deepEqual(message === "Heroi cadastrado com sucesso")
    }) 

    it('atualizar PATCH - /herois/:id', async() => {
        const _id = MOCK_ID
        const expected =  {
            poder:'Super força'
        }

        const result = await app.inject({
            method:'PATCH',
            url:`/herois/${_id}`,
            payload:JSON.stringify(expected)
        })

        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)

        assert.ok(statusCode === 200)
        assert.deepEqual(dados.message === "Heroi atualizado com sucesso")
    })

    it('atualizar PATCH - /herois/:id - não deve atualizar com ID incorreto', async() => {
        //const _id = `${MOCK_ID}01`
        const _id = `5e0bb55f99985e21142fd0b0`

        const result = await app.inject({
            method:'PATCH',
            url:`/herois/${_id}`,
            payload:JSON.stringify({poder:'Super força'})
        })

        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)
        const expected = {
            statusCode:412,
            error:'Precondition Failed',
            message:'Id não encontrado no banco'
        }

        assert.ok(statusCode === 200)
        assert.deepEqual(dados, expected)
        //assert.deepEqual(dados.message, 'Não foi possível atualizar')
    })

    it('remover - DELETE /herois/:id', async() => {
        const _id = MOCK_ID
        const result = await app.inject({
            method:'DELETE',
            url:`/herois/${_id}`
        })

        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)

        assert.ok(statusCode === 200)
        assert.deepEqual(dados.message, 'Heroi removido com sucesso')
    })

    it('remover - DELETE /herois/:id - não deve remover', async() => {
        const _id = '5e0bb55f99985e21142fd0b0'
        const result = await app.inject({
            method:'DELETE',
            url:`/herois/${_id}`
        })

        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)
        const expected = {
            statusCode:412,
            error:'Precondition Failed',
            message:'Id não encontrado no banco'
        }

        assert.ok(statusCode === 412)
        assert.deepEqual(dados, expected)
        //assert.deepEqual(dados.message, 'Heroi removido com sucesso')
    })

    it('remover - DELETE /herois/:id - não deve remover com id inválido', async() => {
        const _id = 'ID_INVALIDO'
        const result = await app.inject({
            method:'DELETE',
            url:`/herois/${_id}`
        })

        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)
        const expected = {
            statusCode:500,
            error:'Internal Server Error',
            message:'An internal server error occurred'
        }

        assert.ok(statusCode === 500)
        assert.deepEqual(dados, expected)
        //assert.deepEqual(dados.message, 'Heroi removido com sucesso')
    })
})