const fastify = require('fastify')
const travelController = require('../controllers/travelController');
const cors = require('@fastify/cors')

const server = fastify();

server.register(cors,{
    origin: '*',
    methods: ['GET']
})

server.get('/trips', travelController.getAll)

server.get('/trips/:id', travelController.getOne)

server.post('/trips', travelController.postTrip)

server.put('/trips/:id', travelController.updateTrip)

server.delete('/trips/:id', travelController.deleteTrip)



server.listen({
    host: '0.0.0.0',
    port: process.env.PORT ?? 3333
})