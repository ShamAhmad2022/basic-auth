'use strict';

require('dotenv').config();
const { app } = require('../src/server');
const supertest = require('supertest');
const req = supertest(app);
const basicAuth = require('../src/auth/middleware/basic');
const { db } = require('../src/auth/models');
const { User } = require('../src/auth/models/index');
const base64 = require('base-64');
const bcrypt = require('bcrypt');

beforeAll(async () => {
    await db.sync();
})
  
  afterAll(async () => {
    await db.drop();
})
  
describe('test the server', () => {
    it('POST to /signup to create a new user', async () => {
      const res = await req.post('/signup').send({
          username: 'sham',
          password: '12345'
        });

      expect(res.statusCode).toEqual(201);
      expect(JSON.parse(res.text).user.username).toEqual('sham');
    });
    
    it('Does the middleware function (send it a basic header)', async () => {
      const req = {
        headers: {
          authorization: 'Basic ' + Buffer.from('username:password').toString('base64')
            }
        };
        const res = {};
        const next = jest.fn();
        
        const user = {
          username: 'username',
          password: await bcrypt.hash('password', 10)
        };
        jest.spyOn(User, 'findOne').mockResolvedValue(user);
        
        await basicAuth(req, res, next);
        
        expect(next).toHaveBeenCalled();
        
      });
      
    });
    
describe.skip('Do the routes assert the requirements (signup/signin)', () => {
  
  it('POST to /signup to create a new user', async () => {
    const res = await req.post('/signup').send({
        username: 'sham',
        password: '12345'
      });

    expect(res.statusCode).toEqual(201);
  });

  it('should return a 200 status code when a valid username and password are provided', async () => {
    const response = await req
      .post('/signin')
      .set('Authorization', 'Basic ' + Buffer.from('username:password').toString('base64'));
    expect(response.status).toBe(200);
  });
  
});

describe.skip('POST to /signin to login as a user (use basic auth)', () => {
  it.skip('should return a 200 status code when a valid username and password are provided', async () => {
    const response = await req
      .post('/signin')
      .set('Authorization', 'Basic ' + Buffer.from('username:password').toString('base64'));
    expect(response.status).toBe(200);
  });

  it.skip('should return a 403 status code when an invalid username or password is provided', async () => {
    const response = await req
      .post('/signin')
      .set('Authorization', 'Basic ' + Buffer.from('invalidusername:invalidpassword').toString('base64'));
    expect(response.status).toBe(403);
  });

  it.skip('should return a JSON object with the user data when a valid username and password are provided', async () => {
    const response = await req
      .post('/signin')
      .set('Authorization', 'Basic ' + Buffer.from('username:password').toString('base64'));
    expect(response.body).toHaveProperty('user');
  });

  it.skip('should exist and accept POST requests', async () => {
    const response = await req.post('/signin');
    expect(response.status).not.toBe(404);
  });
});
