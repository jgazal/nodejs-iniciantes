docker ps 
docker exec -it 374918e4a146 \
     mongo -u jgazal -p 123456 --authenticationDatabase herois

// databases
show dbs 

// mudando o contexto para uma database
use herois

// mostrar coleções
show collections

db.herois.insert({
    nome:'Flash',
    poder:'Velocidade',
    dataNascimento:'1998-01-01'
})

db.herois.find()
db.herois.find().pretty() // mostra formatado

//-----------------------------------------------

for(let i=0; i<=10000; i++) {
    db.herois.insert({
        nome:`Clone-${i}`,
        poder:'Velocidade',
        dataNascimento:'1998-01-01'
    })       
}

db.herois.count()
db.herois.findOne()
db.herois.findOne({_id: ObjectId('5e0b7464b84f2a9e277a8b08')})
db.herois.find().limit(1000).sort({nome:-1})
db.herois.find({poder:'super força'}).limit(1000).sort({nome:-1})
db.herois.find({}, {poder:1, _id:0})
db.herois.find({nome:'Flash'})

//-----------------------------------------------

// create
db.herois.insert({
    nome:'Flash',
    poder:'Velocidade',
    dataNascimento:'1998-01-01'
})

// read
db.herois.find()

// update
db.herois.update({_id:ObjectId("5e0b731eb84f2a9e277a8722")}, 
                 {nome:'Mulher Maravilha'})

db.herois.update({_id:ObjectId("5e0b7464b84f2a9e277a8b08")}, 
                 {$set:{nome:'Lanterna Verde'}})

db.herois.update({poder:'Velocidade'}, 
                 {$set:{poder:'super força'}})

// delete
db.herois.remove({}) // remove tudo
db.herois.remove({nome:'Mulher Maravilha'})