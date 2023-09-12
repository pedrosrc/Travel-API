const randomUUID = require('node:crypto');
const sql = require('../db/db.js');

module.exports = class DataBasePostgres{
    
    async list(search) {
       let trips

       if(search){
        trips = await sql`select * from trips where title ilike ${"%" + search + "%"}`
       }else{
        trips = await sql`select * from trips`
       }

       return trips
    }
    async one(id){
        let trip 

        trip = await sql`select * from trips where id = ${id}`
    
        return trip
    }

    async create(trip){
        const tripId = randomUUID()
        const {title,
            description,
            status,
            amount,
            note,
            price,
            img,} = trip

        await sql`insert into trips (id, title, description, status, amount, note, price, img) VALUES (${tripId}, ${title}, ${description}, ${status}, ${amount}, ${note}, ${price}, ${img})`
    }

    async update(id, trip){
        const {title, description, duration} = trip

        await sql`update trips set title = ${title}, description = ${description}, duration = ${duration} where id = ${id}`
    }

    async delete(id){
        await sql`delete from trips where id = ${id}`
    
    }
}