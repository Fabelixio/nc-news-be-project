const app = require("./../db/app/app")
const request = require("supertest")
const {topicData, userData, commentData, articleData} = require("./../db/data/test-data/index")
const db = require("./../db/connection")
const seed = require("./../db/seeds/seed")

beforeEach(() => seed({ topicData, userData, commentData, articleData }))
afterAll(() => db.end())
//articles
describe("GET /api/articles",() => {
    test("status: 200, responds with an array of article objects, sorted in descending order", () => {
        return request(app)
        .get('/api/articles')
        .expect(200)
        .then(({ body: { articles }}) => {
            articles.forEach((article) => {
                expect(article.article_id).toEqual(expect.any(Number));
                expect(article.topic).toEqual(expect.any(String));
                expect(article.title).toEqual(expect.any(String));;
                expect(article.votes).toEqual(expect.any(Number));
                expect(article.author).toEqual(expect.any(String));
                expect(article.created_at).toEqual(expect.any(String))
                expect(article.comment_count).toEqual(expect.any(String))
                expect(article.article_img_url).toEqual(expect.any(String))
                expect(article.hasOwnProperty('body')).toBe(false)
            })
            expect(articles.length).toBe(13)
            expect(articles).toBeSortedBy('created_at', {
                descending: true
            })
        })
    })
})

describe("GET /api/articles/:article_id",() => {
    test("status: 200, responds with article by id request", () => {
        return request(app)
        .get('/api/articles/1')
        .expect(200)
        .then(( { body: { article }}) => {
            expect(article).toMatchObject({
                article_id: 1,
                title: "Living in the shadow of a great man",
                topic: "mitch",
                author: "butter_bridge",
                body: "I find this existence challenging",
                created_at: "2020-07-09T20:11:00.000Z",
                votes: 100,
            })
        })
    })
    test("status: 400, responds with error for invalid id", () => {
        return request(app)
        .get('/api/articles/invalid_id')
        .expect(400)
        .then(({ body }) => {
            expect(body.msg).toBe("bad request")
        })
    })
    test("status: 404, responds with error for article that doesn't exist", () => {
        return request(app)
        .get('/api/articles/1234')
        .expect(404)
        .then(({ body }) => {
            expect(body.msg).toBe('article does not exist')
        })
    })
})

describe("GET /api/articles/:article_id/comments", () => {
    test("200: responds with an array of comments that relate to the chosen article", () => {
        return request(app)
        .get('/api/articles/1/comments')
        .expect(200)
        .then(({body: { comments }}) => {
            expect(comments).toHaveLength(11)
            expect(comments).toBeSortedBy('created_at', {descending: true})
            comments.forEach((comment) => {
                expect(comment.article_id).toBe(1)
                expect(comment).toMatchObject({
                    comment_id: expect.any(Number),
                    votes: expect.any(Number),
                    created_at: expect.any(String),
                    author: expect.any(String),
                    body: expect.any(String),})
            })
        })
    })
    test("200: responds with empty array if article exists but has no comments",() => {
        return request(app)
        .get('/api/articles/2/comments')
        .expect(200)
        .then(({ body: { comments }}) => {
            expect(comments).toEqual([])
        })
    })
    test("400: responds with error if id is invalid", () => {
        return request(app)
        .get('/api/articles/notarticle/comments')
        .expect(400)
        .then(({ body }) => {
            expect(body.msg).toBe('bad request')
        })
    })
    test("404: responds with error if id is valid but article does not exist", () => {
        return request(app)
        .get('/api/articles/999/comments')
        .expect(404)
        .then(({ body }) => {
            expect(body.msg).toBe('path not found')
        })
    })
})

describe("POST /api/articles/:article_id/comments", () => {
    test("201: responds with the posted comment", () => {
        const newComment = {
            username: "icellusedkars",
            body: "comment test",
        };
        return request(app)
        .post('/api/articles/1/comments')
        .send(newComment)
        .expect(201)
        .then(({ body: { comment } }) => {
            const expectedComment = {
                body: "comment test",
                author: "icellusedkars",
                article_id: 1,
                votes: 0,
                created_at: expect.any(String),
            }
            expect(comment).toMatchObject(expectedComment)
            })
        })
    test("400: responds with error when missing required information", () => {
        return request(app)
        .post('/api/articles/9/comments')
        .send({})
        .expect(400)
        .then(({ body }) => {
            expect(body.msg).toBe('bad request')
        })
    })
    test("404: responds with error when article id is valid but non-existant", () => {
        return request(app)
        .post('/api/article/100/comments')
        .send({username: 'icellusedkars', body: 'comment test.'})
        .expect(404)
        .then(({ body }) => {
            expect(body.msg).toBe('path not found')
        })
    })
    test("400: responds with error when article id is invalid", () => {
        return request(app)
        .post('/api/article/notAnArticle/comments')
        .send({username: 'icellusedkars', body: 'comment test.'})
        .expect(404)
        .then(({ body }) => {
            expect(body.msg).toBe('path not found')
        })
    })
})

//topics
describe("GET /api/topics", () => {
    test("responds with status code 200", () => {
        return request(app).get('/api/topics').expect(200)
    })
    test("returns an array of all topic objects with required properties", () => {
        return request(app)
        .get('/api/topics')
        .expect(200)
        .then(({ body }) => {
            const topicObj = {
                description: expect.any(String),
                slug: expect.any(String)
            }
            expect(body.topics).toHaveLength(3)
            body.topics.forEach((topicItem) => {
                expect(topicItem).toMatchObject(topicObj)
            })
        })
    })
    test("status: 404, responds with error message for invalid file path", () => {
        return request(app)
        .get('/api/wrongpath')
        .expect(404)
        .then(({ body }) => {
            expect(body.msg).toBe("path not found")
        })
    })
})

//api
describe("GET /api", () => {
    test("status: 200, responds with JSON object containing all available endpoints in the API", () => {
        return request(app)
        .get('/api')
        .expect(200)
        .then(({ body: { endpoints } }) => {
            expect(endpoints).toHaveProperty('GET /api/topics')
            expect(endpoints).toHaveProperty('GET /api/articles')
            expect(endpoints).toHaveProperty('GET /api/articles/:article_id')
            expect(endpoints).toHaveProperty('GET /api/articles/:article_id/comments')
            expect(endpoints).toHaveProperty('POST /api/articles/:article_id/comments')
        })
    })
})