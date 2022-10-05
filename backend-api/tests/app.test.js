const request = require('supertest')
const app = require('./app')
const mongoose = require('mongoose')
// const Post = require('../models/post')

// dummy data has been uploaded before running these
// connect to Mongo db
async function connectToDB(){
    const mongoDB = process.env.DB_STRING_TEST;
    await mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
}

describe("/post", () => {
    beforeAll(async () => {
        await connectToDB()
    })

    afterAll(() => {
        mongoose.connection.close()
    })

    describe("given a get request", () => {
        it("should return a 200 status code", async () => {
            const response = await request(app)
                .get('/post')
                .set('Accept','application/json')
            expect(response.statusCode).toBe(200)
            
        })
    })
})