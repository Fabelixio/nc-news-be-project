const app = require("./../db/app/app")
const request = require("supertest")
const {topicData, userData, commentData, articleData} = require("./../db/data/test-data/index")
const db = require("./../db/connection")
const seed = require("./../db/seeds/seed")

beforeEach(() => seed({ topicData, userData, commentData, articleData }))
afterAll(() => db.end())


//articles // add another request test
describe("GET /api/articles",() => {
    test("status: 200, responds with article by id request", () => {
        return request(app)
        .get('/api/articles/1')
        .expect(200)
        .then(( { body: { article }}) => {
            console.log(article)
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
            expect(body.msg).toBe("invalid data type")
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
//article comments
// describe("GET /api/articles/:article_id/comments", () => {
//     test("status: 200, responds with an array of comments that relate to the chosen article", () => {
//         return request(app)
//         .get('/api/articles/5/comments')
//         .expect(200)
//         .then(({body: { comments }}) => {
//             expect(comments).toHaveLength(2)
//             expect(Array.isArray(comments)).toBe(true)
//             const commentExample = {
//                 body: expect.any(String),
//                 votes: expect.any(Number),
//                 author: expect.any(String),
//                 article_id: 5,
//                 created_at: expect.any(String)
//             }
//             comments.forEach((comment) => {
//                 expect(comment).toMatchObject(commentExample)
//             })
//         })
//     })
//     test("200: responds with empty array if article exists but has no comments",() => {
//         return request(app)
//         .get('/api/articles/2/comments')
//         .expect(200)
//         .then(({ body: { comments }}) => {
//             expect(comments).toEqual([])
//         })
//     })
//     test("status: 200, most recent comment is served first", () => {
//         return request(app)
//         .get('/api/articles/1/comments')
//         .expect(200)
//         .then(({body: { comments }}) => {
//             expect(comments).toBeSortedBy('created_at', {descending: true})
//         })
//     })
//     test("400: responds with error if id is invalid", () => {
//         return request(app)
//         .get('/api/articles/notarticle/comments')
//         .expect(400)
//         .then(({ body }) => {
//             expect(body.msg).toBe('bad request')
//         })
//     })
//     test("404: responds with error if id is valid but article does not exist", () => {
//         return request(app)
//         .get('/api/articles/60/comments')
//         .expect(404)
//         .then(({ body }) => {
//             expect(body.msg).toBe('path not found')
//         })
//     })

// })

//api
describe("GET /api", () => {
    test("status: 200, responds with JSON object containing all available endpoints in the API", () => {
        return request(app)
        .get('/api')
        .expect(200)
        .then(({ body }) => {
            expect(body).toHaveProperty('endpoints')
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
