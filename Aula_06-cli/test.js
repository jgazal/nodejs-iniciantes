const {deepEqual, ok} = require('assert')
const database = require('./database')
const DEFAULT_ITEM_CADASTRAR = {
    nome: 'Flash', 
    poder: 'Speed', 
    id: 1
}
const DEFAULT_ITEM_ATUALIZAR = {
    nome: 'Lanterna Verde',
    poder:  'Energia',
    id: 2
}

describe('Suite de manipulação de Herois', () => {
    before(async() => {
        await database.cadastrar(DEFAULT_ITEM_CADASTRAR)
        await database.cadastrar(DEFAULT_ITEM_ATUALIZAR)
    }) 
    it('pesquisar um herói usando arquivos', async() => {
        const expected = DEFAULT_ITEM_CADASTRAR
        //const resultado = await database.listar(expected.id) 
        const [resultado, posicao2, posicao3] = await database.listar(expected.id)
        const posicaoUm = resultado[0]
        //ok(resultado, expected)
        deepEqual(resultado, expected)
    })
    it('cadastrar um herói, usando arquivos', async() => {
        const expected = DEFAULT_ITEM_CADASTRAR
        /* const expected = {
            ...DEFAULT_ITEM_CADASTRAR,
            id: 2,
            nome: 'Batman'
        } */
        const resultado = await database.cadastrar(DEFAULT_ITEM_CADASTRAR)
        const [actual] = await database.listar(DEFAULT_ITEM_CADASTRAR.id)

        deepEqual(actual, expected)
    }) 
    //it.only('remover um herói por id', async () => {
    it('remover um herói por id', async() => {
        const expected = true
        const resultado = await database.remover(DEFAULT_ITEM_CADASTRAR.id)
        deepEqual(resultado, expected)
    })
    it('atualizar herói pelo id', async() => {
        const expected = {
            ...DEFAULT_ITEM_ATUALIZAR,
            nome: 'Batman',
            poder: 'Dinheiro'
        }
        const novoDado = {
            nome: 'Batman',
            poder: 'Dinheiro'
        }
        await database.atualizar(DEFAULT_ITEM_ATUALIZAR.id, novoDado)
        const [resultado] = await database.listar(DEFAULT_ITEM_ATUALIZAR.id)
        deepEqual(resultado, expected)
    })
})