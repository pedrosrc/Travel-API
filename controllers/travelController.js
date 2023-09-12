const DataBasePostgres = require('../db/database-postgres');

const database = new DataBasePostgres


const getAll = async(req) => {
    const search = req.query.search
    const trips = await database.list(search)

    return trips
}

const getOne = async(req, reply) => {
    const id = req.params.id
    const trip = await database.one(id)
    
    return reply.status(200).send(trip[0])
}

const postTrip = async(req, reply) => {
    const {title, description, status, amount, note, price, img} = req.body 
    
    await database.create({
        title,
        description,
        status,
        amount,
        note,
        price,
        img,
    })

    return reply.status(201).send()
}

const updateTrip = async (req, reply) => {
    const videoId = req.params.id
    const {title, description, status, amount, note, price, img} = req.body 

    await database.update(videoId, {
        title,
        description,
        status,
        amount,
        note,
        price,
        img,
    })

    return reply.status(204).send()
}


const deleteTrip = async(req, reply) => {
    const videoId = req.params.id

    await database.delete(videoId)

    return reply.status(204).send()
}

module.exports = {
    getAll,
    getOne,
    postTrip,
    updateTrip,
    deleteTrip,
}