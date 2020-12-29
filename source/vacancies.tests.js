require('dotenv').config();
const token = process.env.TOKEN || '';
const server = 'https://api.hh.ru';

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);

describe('GET /vacancies', () => {
    it('Request without authorization token and filters\n\tShould be HTTP status 403 Forbidden', function(done) {
        chai.request(server)
            .get(encodeURI(''))            
            .end((err, res) => {
                res.should.have.status(403);
                done();
            });
    });
    it('Request without authorization token with fliter \'/vacancies\'\n\tShould be HTTP status 403 Forbidden', function(done) {
        chai.request(server)
            .get(encodeURI('/vacancies'))
            .end((err, res) => {
                res.should.have.status(403);
                done();
            });
    });
    it('Request with authorization token with text \'junior c++ developer\'\n\tShould be HTTP status 200', function(done) {
        chai.request(server)
            .get(encodeURI('/vacancies?text=junior c++ developer'))
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.found.should.be.greaterThan(0);
                done();
            });
    });
    it('Request with authorization token with text \'qa engineer\'\n\tShould be  HTTP status 200', function(done) {
        chai.request(server)
            .get(encodeURI('/vacancies?text=qa engineer'))
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.found.should.be.greaterThan(0);
                done();
            });
    });
    it('Request with authorization token with text \'Уборщик\'\n\tShould be HTTP status 200', function(done) {
        chai.request(server)
            .get(encodeURI('/vacancies?text=Уборщик'))
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.found.should.be.greaterThan(0);
                done();
            });
    });
    it('Request with authorization token with text \'React\'\n\tShould be HTTP status 200', function(done) {
        chai.request(server)
            .get(encodeURI('/vacancies?text=React'))
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.found.should.be.greaterThan(0);
                done();
            });
    });
    it('Request with authorization token with text \'Senior Fullstack WEB dev\'\n\tShould be HTTP status 200', function(done) {
        chai.request(server)
            .get(encodeURI('/vacancies?text=Senior Fullstack WEB dev'))
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.found.should.be.greaterThan(0);
                done();
            });
    });
    it('Request with authorization token with text \"Senior Fullstack WEB dev\"\n\tShould be HTTP status 200', function(done) {
        chai.request(server)
            .get(encodeURI('/vacancies?text=Senior \"Senior Fullstack WEB dev\"'))
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.found.should.be.greaterThan(0);
                done();
            });
    });
    it('Request with authorization token with text \'%21Senior Fullstack WEB dev\'\n\tShould be HTTP status 200', function(done) {
        chai.request(server)
            .get(encodeURI('/vacancies?text=%21Senior Fullstack WEB dev'))
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.found.should.be.greaterThan(0);
                done();
            });
    });
    it('Request with authorization token with text \'TypeScript\'\n\tShould be HTTP status 200', function(done) {
        chai.request(server)
            .get(encodeURI('/vacancies?text=TypeScript'))
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.found.should.be.greaterThan(0);
                done();
            });
    });
    it('Request with authorization token with text \'Супервайзер\'\n\tShould be HTTP status 200', function(done) {
        chai.request(server)
            .get(encodeURI('/vacancies?text=Супервайзер'))
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.found.should.be.greaterThan(0);
                done();
            });
    });
    it('Request with authorization token with text \"Супервайзер\"\n\tShould be HTTP status 200', function(done) {
        chai.request(server)
            .get(encodeURI('/vacancies?text=\"Супервайзер\"'))
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.found.should.be.greaterThan(0);
                done();
            });
    });
    it('Request with authorization token with text \'Ghjlfdtw-rjycekmnfyn\' (Продавец-консультант)\n\tShould be HTTP status 200', function(done) {
        chai.request(server)
            .get(encodeURI('/vacancies?text=Ghjlfdtw-rjycekmnfyn'))
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.found.should.be.greaterThan(0);
                done();
            });
    });
    it('Request with authorization token with text \"utqv-lbpfqyth\" (гейм-дизайнер)\n\tShould be HTTP status 200', function(done) {
        chai.request(server)
            .get(encodeURI('/vacancies?text=\"utqv-lbpfqyth\"'))
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.found.should.be.equal(0);
                done();
            });
    });
    it('Request without authorization token with text \'!utqv-lbpfqyth\' (гейм-дизайнер)\n\tShould be HTTP status 200', function(done) {
        chai.request(server)
            .get(encodeURI('/vacancies?text=%21utqv-lbpfqyth'))
            .end((err, res) => {
                res.should.have.status(200);
                res.body.found.should.be.equal(0);
                done();
            });
    });
    it('Request without authorization token with text \'hh\'\n\tShould be HTTP status 200', function(done) {
        chai.request(server)
            .get(encodeURI('/vacancies?text=hh'))
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.found.should.be.greaterThan(0);
                done();
            });
    });
    it('Request without authorization token with text \'Гео*\'\n\tShould be HTTP status 200', function(done) {
        chai.request(server)
            .get(encodeURI('/vacancies?text=Гео%2A'))
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.found.should.be.greaterThan(0);
                done();
            });
    });
    it('Request without authorization token with text \'pr-менеджер\'\n\tShould be HTTP status 200', function(done) {
        chai.request(server)
            .get(encodeURI('/vacancies?text=pr-менеджер'))
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.found.should.be.greaterThan(0);
                done();
            });
    });
    it('Request without authorization token with text \'менеджер+OR+разработчик\'\n\tShould be HTTP status 200', function(done) {
        chai.request(server)
            .get(encodeURI('/vacancies?text=менеджер+OR+разработчик'))
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.found.should.be.greaterThan(0);
                done();
            });
    });
    it('Request without authorization token with text \"менеджер по продажам\"+OR+\"разработчик по\"\n\tShould be HTTP status 200', function(done) {
        chai.request(server)
            .get(encodeURI('/vacancies?text=\"менеджер по продажам\"+OR+\"разработчик по\"'))
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.found.should.be.greaterThan(0);
                done();
            });
    });
    it('Request without authorization token with text \"менеджер проекта\"+AND+\"разработчик по\"\n\tShould be HTTP status 200', function(done) {
        chai.request(server)
            .get(encodeURI('/vacancies?text=\"менеджер проекта\"+AND+\"разработчик по\"'))
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.found.should.be.greaterThan(0);
                done();
            });
    });
    it('Request without authorization token with text \'c++ NOT c# NOT java\'\n\tShould be HTTP status 200', function(done) {
        chai.request(server)
            .get(encodeURI('/vacancies?text=c%2B%2B+NOT+c%23+NOT+java'))
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.found.should.be.greaterThan(0);
                done();
            });
    });
    it('Request without authorization token with text \'(разработка+OR+web)+AND+(react+OR+js)\'\n\tShould be HTTP status 200', function(done) {
        chai.request(server)
            .get(encodeURI('/vacancies?text=%разработка+OR+web%29+AND+%28react+OR+js%29'))
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.found.should.be.greaterThan(0);
                done();
            });
    });
    it('Request without authorization token with text \'(web AND developer) OR (react AND "front end") NOT c# NOT java NOT "full stack"\'\n\tShould be HTTP status 200', function(done) {
        chai.request(server)
            .get(encodeURI('/vacancies?text=%28web+AND+developer%29+OR+%28react+AND+"front+end"%29+NOT+c%23+NOT+java+NOT+"full+stack"'))
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.found.should.be.greaterThan(0);
                done();
            });
    });
    it('Request without authorization token with text \'NAME:(c++ OR java) and COMPANY_NAME:yandex\'\n\tShould be HTTP status 200', function(done) {
        chai.request(server)
            .get(encodeURI('/vacancies?text=NAME%3A%28c%2B%2B+OR+java%29+and+COMPANY_NAME%3Ayandex'))
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.found.should.be.greaterThan(0);
                done();
            });
    });
});
