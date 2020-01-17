/*
 0 Obter um usuário
 1 Obter o número de telefone de um usuário a partir de seu id
 2 Obter o endereço do usuário pelo id
 */
const util = require('util')
const obterEnderecoAsyn = util.promisify(obterEndereco)

 //function obterUsuario(callback) {
 function obterUsuario() {
     return new Promise(function resolvePromise(resolve, reject) {
        setTimeout(function() {
           // return callback(null, {
            return resolve({
                id: 1,
                nome: 'Harry Potter',
                dataNascimento: new Date()
            })
        }, 1000)
     })
 }

 //function obterTelefone(idUsuario, callback) {
 function obterTelefone(idUsuario) {
     return new Promise(function resolverPromisse(resolve, reject) {
         setTimeout(() => {
             //return callback(null, {
               return resolve({
                 telefone: '99990000',
                 ddd: 11
             })
         }, 2000);
     })
 }

 function obterEndereco(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            rua: 'dos alfeneiros',
            numero: 4
        })
    }, 2000);
 }

 main()
 async function main() {
    try {
        console.time('medida-promise')
        const usuario = await obterUsuario()
        //const telefone = await obterTelefone(usuario.id)
        //const endereco = await obterEnderecoAsyn(usuario.id)
        const resultado = await Promise.all([
            obterTelefone(usuario.id),
            obterEnderecoAsyn(usuario.id)
        ])
        const telefone = resultado[0]
        const endereco = resultado[1]

        console.log(`
            Nome: ${usuario.nome},
            Telefone: (${telefone.ddd}) ${telefone.telefone},
            Endereço: ${endereco.rua}, ${endereco.numero}
        `)
        console.timeEnd('medida-promise')
    } catch(error) {
        console.error('ERRO', error)  
    }
 }
    
 /*const usuarioPromise = obterUsuario()
 usuarioPromise
    .then(function(usuario) {
        return obterTelefone(usuario.id)
        .then(function resolverTelefone(result) {
            return {
                usuario: {
                    nome: usuario.nome,
                    id: usuario.id
                },
                telefone: result
            }
        })
    })
    .then(function(resultado) {
        const endereco = obterEnderecoAsyn(resultado.usuario.id)
        //return endereco;
        return endereco.then(function resolverEndereco(result) {
            return {
                usuario: resultado.usuario,
                telefone: resultado.telefone,
                endereco: result
            }
        })
    })
    .then(function(resultado) {
        //console.log('resultado', resultado)
        console.log(`
            Nome: ${resultado.usuario.nome}
            Endereco: ${resultado.endereco.rua}, ${resultado.endereco.numero}
            Telefone: (${resultado.telefone.ddd})${resultado.telefone.telefone}
        `)
    })
    .catch(function(error) {
        console.error('ERRO', error)
    })*/

 /*function resolverUsuario(erro, usuario) {
     console.log('usuario', usuario)
 }*/

 //obterUsuario(resolverUsuario)
 /*obterUsuario(function resolverUsuario(error, usuario) {
     if(error) {
         console.error('Erro em USUÁRIO', error)
         return;
     }
     obterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
        if(error1) {
            console.error('Erro em TELEFONE', error)
            return;
        }
        obterEndereco(usuario.id, function resolverEndereco(error2, endereco) {
            if(error2) {
                console.error('Erro em ENDEREÇO', error)
                return;
            }

            console.log(`
             Nome: ${usuario.nome},
             Endereco: ${endereco.rua}, ${endereco.numero}
             Telefone: (${telefone.ddd})${telefone.telefone}
            `)
        })
     })
 })*/

 //const usuario = obterUsuario()
 //const telefone = obterTelefone(usuario.id)

 //console.log('usuario', usuario)
 //console.log('telefone', telefone)