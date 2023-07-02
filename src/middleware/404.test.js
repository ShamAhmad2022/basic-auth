'use strict'

const supertest = require('supertest');
const { app } = require('../server');

const req = supertest(app);


describe('Paage not Found', ()=>{
    it('Handle not foound page route', async ()=> {
        const res = await req.get('/about');
        expect(res.status).toEqual(404);
    });

    it('Handle not foound page method', async ()=> {
        const res = await req.put('/person');
        expect(res.status).toEqual(404);
    });
});