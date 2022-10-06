const request = require('supertest')
const app = require('./app')
const mongoose = require('mongoose')
const Post = require('../models/post')
const User = require('../models/user')
const Comment = require('../models/comment')
const utils = require('../lib/utils');

// connect to Mongo db
// dummy data has been uploaded before running these
async function connectToDB(){
    const mongoDB = process.env.DB_STRING_TEST;
    await mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
}

// create a new user
const createUser = async () => {
    const userPassword = 'password';
    const saltHash = utils.genPassword(userPassword);
    const salt = saltHash.salt;
    const hash = saltHash.hash;
    
    const testUser = new User({
        username: 'testuser',
        hash: hash,
        salt: salt,
        admin: true
    });
    
    await User.create(testUser, (err, user) => {
        if (err) {
            console.log(err);
        }
        // console.log(`user created: ${user}`);
        return user;
    });
}

const createPosts = async () => {
    const authorID = new mongoose.Types.ObjectId();
    const testPosts = [
        {
            title: 'test post1',
            content: 'test content',
            author: authorID,
            date: Date.now(),
            published: true,
            comments: []
        },
        {
            title: 'test post2',
            content: 'test content',
            author: authorID,
            date: Date.now(),
            published: true,
            comments: []
        }
    ];
    await Post.create(testPosts, (err, posts) => {
        if (err) {
            console.log(err);
        }
        return posts;
    });
}

const user = createUser();
createPosts();
const tokenObject = utils.issueJWT(user);
const token = tokenObject.token;
// console.log(`token: ${token}`);

// clear database
beforeAll(async() => {
    await User.deleteMany()
    await Post.deleteMany()
})
afterAll(() => {
    mongoose.connection.close()
})

describe("/post", () => {
    beforeAll(async () => {
        await connectToDB()
    })

    describe("given a simple get request", () => {
        it("should return a 200 status code", async () => {
            const response = await request(app)
                .get('/post')
                .set('Accept','application/json')
            expect(response.statusCode).toBe(200)
        })
    })
    
    describe("given a GET to /post/all", () => {
        it("should return a 200 status code", async () => {
            const response = await request(app)
            .get('/post/all')
            .set('Content-Type','application/json')
            .set('Authorization', token)
            expect(response.statusCode).toBe(200)
        })
    })

    describe("given a valid request to post a new post", () => {
        it("should return a 200 status code", async () => {
            const response = await request(app)
            .post('/post')
            .set('Accept','application/json')
            .set('Authorization', token)
            .send({
                title: 'test post3',
                content: 'test content',
                author: authorID
            })
            expect(response.statusCode).toBe(200)
            expect(response.body.post.title).toBe('test post3')
            expect(response.body.post.content).toBe('test content')
        })
    })
})