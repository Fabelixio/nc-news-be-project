const app = require("./../db/app/app")
const request = require("supertest")
const {topicData, userData, commentData, articleData} = require("./../db/data/test-data/index")
const db = require("./../db/connection")
const seed = require("./../db/seeds/seed")

beforeEach(() => seed({ topicData, userData, commentData, articleData }))
afterAll(() => db.end())

//api
describe("GET /api", () => {
    test("status: 200, responds with JSON object containing all available endpoints in the API", () => {
        return request(app)
        .get('/api')
        .expect(200)
        })
        test("status: 404, responds with error for invalid file path", () => {
            return request(app)
            .get('/apf')
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe("path not found")
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
