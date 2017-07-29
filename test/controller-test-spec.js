require('should');
const supertest = require('supertest');
const express = require('express');
const app = require('../app');
const request = supertest(app);
const constant = require('../minxin/constant');

describe('Test user controller', () => {

    it('POST user', (done) => {
        request
            .post('/users')
            .type('application/json')
            .send({
                name:"zhangpei",
                age:20
            })
            .expect(constant.httpCode.CREATED)
            .expect((res)=>{
                res.body.uri.should.equal('/users/1')
            })
            .end(done)
    });

    it(' GET  /users', (done) => {
        request
            .get('/users')
            .expect(constant.httpCode.OK)
            .expect((res)=>{
                res.body.length.should.equal(1);
            })
            .end(done);
    });

    it('PUT send users from mysql', (done) => {
        request
            .put('/users/1')
            .send({
                name:"zhangpei",
                age:3
            })
            .expect(constant.httpCode.NO_CONTENT)
            .end(done)
    });

    it('DELETE users from mysql', (done) => {
        request
            .delete('/users/1')
            .expect(204)
            .end(done)
    })

});
