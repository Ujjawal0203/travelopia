const supertest = require('supertest');
let name = ['Faizan Alam' , 'Nikhil', 'Nilesh', 'Rehan','Aditya'];
let email = ['faizan@gmail.com','nikhil@gmail.com','nilesh@gmail.com','rehan@gmail.com','aditya@gmail.com'];
let country = ['India' , 'Europe',' Africa']
const app = require('../src/index');
const request = supertest(app);
describe('GET /' , ()=>{
    describe('Api should be working fine' , ()=>{
        test('give true status code while open server' , async()=>{
            const res = await request.get('/form')
            expect(res.status).toBe(200)
        })
    })
})

describe('POST /posts' , ()=>{
    describe('given details' , ()=>{
        test('should create a new post with status code 200' , async()=>{
            let num = Math.floor(Math.random() * 4);
            const res = await request.post('/form').send({
                name:name[num],
                email:email[num],
                travelors:4,
                destination:country[Math.floor(Math.random() * 3)],
                per_person:5000,
                budget:20000
            })
            expect(res.status).toBe(200)
        })
    })
})
