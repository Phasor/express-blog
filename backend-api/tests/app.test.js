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
    const userPassword = 'test';
    const saltHash = utils.genPassword(userPassword);
    const salt = saltHash.salt;
    const hash = saltHash.hash;
    
    const userPayload = 
    {
        username: 'a@test.com',
        hash: hash,
        salt: salt,
        admin: true
    }
    // const testUser = new User(userPayload);
    
    await User.create(userPayload, (err, user) => {
        if (err) {
            console.log(err);
        }
        // console.log(`user created: ${user}`);
        return user;
    });
}

const user = createUser();


// create some dummy posts 
const postPayload = [
    {
        title: 'test post1',
        content: 'test content',
        author: new mongoose.Types.ObjectId(),
        date: Date.now(),
        published: true,
        comments: []
    },
    {
        title: 'test post2',
        content: 'test content',
        author: new mongoose.Types.ObjectId(),
        date: Date.now(),
        published: true,
        comments: []
    }
];

const createPosts = async (posts) => {
    await Post.create(posts, (err, posts) => {
        if (err) {
            console.log(err);
        }
        return posts;
    });
}

// use to save JWT token below
var token = '';

// clear database
beforeAll(async() => {
    await User.deleteMany()
    await Post.deleteMany()
    await createPosts(postPayload);
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
    
    describe("given correct login credentials, try and login", () => {
        it("should return a 200 status code", async () => {
            const response = await request(app)
                .post('/login')
                .set('Content-Type','application/json')
                .send({
                    username: 'a@test.com',
                    password: 'test'
                })
                .expect(200)
                .then(response => {
                    token = response.body.token;
                })
        })
    })

    describe("given user is logged in, posting a post", () => {
        it("should return a 200 status code", async () => {
            const response = await request(app)
            .post('/post')
            .set('Accept','application/json')
            .set('Authorization', token)
            .send({
                title: 'test post3',
                content: 'test content',
                author: new mongoose.Types.ObjectId()
            })
            expect(response.statusCode).toBe(200)
            console.log(response.body);
            expect(response.body.post.title).toBe('test post3')
            expect(response.body.post.content).toBe('test content')
        })
    })

})