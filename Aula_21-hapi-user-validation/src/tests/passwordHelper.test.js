const assert = require('assert')
const PasswordHelper = require('../helpers/passwordHelper')

// const SENHA = 'adasd786AGUIJ&'
const SENHA = '123'
const HASH = '$2b$04$KKw20N.lzEgfUpmo4.cyouGF4CnbA3Jk7LGSsxlcqa.7Ko0mSJfey'

describe('UserHelper test suite', function() {
    it('Gerar um hash a partir de uma senha', async() => {
        const result = await PasswordHelper.hashPassword(SENHA)
        console.log('result', result)
        assert.ok(result.length > 10)
    })

    it('Comparar senha e seu hash', async() => {
        const result = await PasswordHelper.comparePassword(SENHA, HASH)
        assert.ok(result)
    })
})