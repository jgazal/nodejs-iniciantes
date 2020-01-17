const EventEmitter = require('events')

class MeuEmissor extends EventEmitter {

}
const meuEmissor = new MeuEmissor()
const nomeEvento = 'usuario:click'
meuEmissor.on(nomeEvento, function(click) {
    console.log('um usuário clicou', click)
})

const stdin = process.openStdin()

function main() {
    return new Promise(function(resolve, reject) {
        stdin.addListener('data', function(value) {
            //console.log(`Você digitou: ${value.toString().trim()}`)
            return resolve(value)
        })
    })
}
main().then(function(resultado) {
    console.log('resultado', resultado.toString())
})


/*
meuEmissor.emit(nomeEvento, 'barra de rolagem')
meuEmissor.emit(nomeEvento, 'ok')

let count = 0
setInterval(function() {
    meuEmissor.emit(nomeEvento, 'ok' + count++)
}, 1000) 
*/