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
    it('Request with authorization token with fliter \'/vacancies?text=js developer\'\n\tShould be HTTP status 200', function(done) {
        chai.request(server)
            .get(encodeURI('/vacancies?text=js developer'))
            .set('Authorization', 'Bearer ' + token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.found.should.be.greaterThan(0);
                done();
            });
    });
    it('Request with authorization token with fliter \'/vacancies?text="react developer"\'\n\tShould be HTTP status 200', function(done) {
        chai.request(server)
            .get(encodeURI('/vacancies?text="react developer"'))
            .set('Authorization', 'Bearer ' + token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.found.should.be.greaterThan(0);
                done();
            });
    });
    it('Request with authorization token with fliter \'/vacancies?text=fullstack\'\n\tShould be HTTP status 200', function(done) {
        chai.request(server)
            .get(encodeURI('/vacancies?text=fullstack'))
            .set('Authorization', 'Bearer ' + token)
            .end((err, res) => {
                const result = res.body.items.reduce(function (result, item) {
                    let iName = item.name.toLowerCase();
                    return result && iName.includes('fullstack');
                }, true)
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.found.should.be.greaterThan(0);
                should.equal(true, result);
                done();
            });
    });
    it('Request with authorization token with fliter \'/vacancies?text=!супервайзер\'\n\tShould be HTTP status 200', function(done) {
        chai.request(server)
            .get(encodeURI('/vacancies?text=!супервайзер'))
            .set('Authorization', 'Bearer ' + token)
            .end((err, res) => {
                const result = res.body.items.reduce(function (result, item) {
                    let iName = item.name.toLowerCase();
                    return result && iName.includes('супервайзер');
                }, true)
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.found.should.be.greaterThan(0);
                should.equal(true, result);
                done();
            });
    });
    it('Request with authorization token with fliter \'/vacancies?text=!"java junior"\'\n\tShould be HTTP status 200', function(done) {
        chai.request(server)
            .get(encodeURI('/vacancies?text=!"java junior"'))
            .set('Authorization', 'Bearer ' + token)
            .end((err, res) => {
                const result = res.body.items.reduce(function (result, item) {
                    let iName = item.name.toLowerCase();
                    return result && iName.includes('java') && iName.includes('junior');
                }, true)
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.found.should.be.greaterThan(0);
                should.equal(true, result);
                done();
            });
    });
    it('Request with authorization token with fliter \'/vacancies?text=Гео*"\'\n\tShould be HTTP status 200', function(done) {
        chai.request(server)
            .get(encodeURI('/vacancies?text=Гео*'))
            .set('Authorization', 'Bearer ' + token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.found.should.be.greaterThan(0);
                done();
            });
    });
    it('Request with authorization token with fliter \'/vacancies?text=java OR python"\'\n\tShould be HTTP status 200', function(done) {
        chai.request(server)
            .get(encodeURI('/vacancies?text=java OR python'))
            .set('Authorization', 'Bearer ' + token)
            .end((err, res) => {
                const result = res.body.items.reduce(function (result, item) {
                    let iName = item.name.toLowerCase();
                    return result && (iName.includes('java') || iName.includes('python'));
                }, true)
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.found.should.be.greaterThan(0);
                should.equal(true, result);
                done();
            });
    });
    it('Request with authorization token with fliter \'/vacancies?text="middle react developer" OR "senior angular developer""\'\n\tShould be HTTP status 200', function(done) {
        chai.request(server)
            .get(encodeURI('/vacancies?text="middle react developer" OR "senior angular developer"'))
            .set('Authorization', 'Bearer ' + token)
            .end((err, res) => {
                const result = res.body.items.reduce(function (result, item) {
                    let iName = item.name.toLowerCase();
                    return result && (iName.includes('react') || iName.includes('angular'));
                }, true)
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.found.should.be.greaterThan(0);
                should.equal(true, result);
                done();
            });
    });
    it('Request with authorization token with fliter \'/vacancies?text="react" AND "java developer"\'\n\tShould be HTTP status 200', function(done) {
        chai.request(server)
            .get(encodeURI('/vacancies?text="reactjs" AND "java developer"'))
            .set('Authorization', 'Bearer ' + token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.found.should.be.greaterThan(0);
                done();
            });
    });
    it('Request with authorization token with fliter \'/vacancies?text=frontend NOT angular NOT sass\'\n\tShould be HTTP status 200', function(done) {
        chai.request(server)
            .get(encodeURI('/vacancies?text=frontend NOT angular NOT sass'))
            .set('Authorization', 'Bearer ' + token)
            .end((err, res) => {
                const result = res.body.items.reduce(function (result, item) {
                    let iName = item.name.toLowerCase();
                    return result && iName.includes('frontend') && !iName.includes('angular') && !iName.includes('sass');
                }, true)
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.found.should.be.greaterThan(0);
                should.equal(true, result);
                done();
            });
    });
    it('Request with authorization token with fliter \'/vacancies?text=(разработчик OR developer) AND (python OR react)\'\n\tShould be HTTP status 200', function(done) {
        chai.request(server)
            .get(encodeURI('/vacancies?text=(разработчик OR developer) AND (python OR react)&search_field=name'))
            .set('Authorization', 'Bearer ' + token)
            .end((err, res) => {
                const result = res.body.items.reduce(function (result, item) {
                    let iName = item.name.toLowerCase();
                    return result && (iName.includes('разработчик') || iName.includes('developer')) && (iName.includes('python') || iName.includes('react'));
                }, true)
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.found.should.be.greaterThan(0);
                should.equal(true, result);
                done();
            });
    });
    it('Request with authorization token with fliter \'/vacancies?text=(frontend AND developer) OR (react AND developer) NOT junior NOT middle NOT "fullstack developer"&search_field=name\'\n\tShould be HTTP status 200', function(done) {
        chai.request(server)
            .get(encodeURI('/vacancies?text=(frontend AND developer) OR (react AND developer) NOT junior NOT middle NOT "fullstack developer"&search_field=name'))
            .set('Authorization', 'Bearer ' + token)
            .end((err, res) => {
                const result = res.body.items.reduce(function (result, item) {
                    let iName = item.name.toLowerCase();
                    return result
                    && (iName.includes('frontend') && iName.includes('developer') || iName.includes('react') && iName.includes('developer'))
                    && !iName.includes('junior') && !iName.includes('middle')/* && !iName.includes('fullstack')*/;
                }, true)
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.found.should.be.greaterThan(0);
                should.equal(true, result);
                done();
            });
    });
    it('Request with authorization token with fliter \'/vacancies?text=NAME:(python OR java) AND COMPANY_NAME:Yandex\'\n\tShould be HTTP status 200', function(done) {
        chai.request(server)
            .get(encodeURI('/vacancies?text=NAME:(python OR java) AND COMPANY_NAME:Yandex'))
            .set('Authorization', 'Bearer ' + token)
            .end((err, res) => {
                const result = res.body.items.reduce(function (result, item) {
                    let iName = item.name.toLowerCase();
                    let iCompanyName = item.employer.name.toLowerCase();
                    return result && (iName.includes('python') || iName.includes('java')) && (iCompanyName.includes('yandex') || iCompanyName.includes('яндекс'));
                }, true)
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.found.should.be.greaterThan(0);
                should.equal(true, result);
                done();
            });
    });
    it('Request with authorization token with fliter \'/vacancies?text=ghjlfdtw-rjycekmnfyn\'\n\tShould be HTTP status 200', function(done) {
        chai.request(server)
            .get(encodeURI('/vacancies?text=ghjlfdtw-rjycekmnfyn'))
            .set('Authorization', 'Bearer ' + token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.found.should.be.greaterThan(0);
                done();
            });
    });
    it('Request with authorization token with fliter \'/vacancies?text=!ghjlfdtw-rjycekmnfyn\'\n\tShould be HTTP status 200', function(done) {
        chai.request(server)
            .get(encodeURI('/vacancies?text=!ghjlfdtw-rjycekmnfyn'))
            .set('Authorization', 'Bearer ' + token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.found.should.be.greaterThan(0);
                done();
            });
    });
    it('Request with authorization token with fliter \'/vacancies?text="ghjlfdtw-rjycekmnfyn"\'\n\tShould be HTTP status 200', function(done) {
        chai.request(server)
            .get(encodeURI('/vacancies?text="ghjlfdtw-rjycekmnfyn"'))
            .set('Authorization', 'Bearer ' + token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.found.should.be.greaterThan(0);
                done();
            });
    });
    it('Request with authorization token with fliter \'/vacancies?text=ыфыфыфыфыфыфыфыфыфыфыфыфыфыфы\'\n\tShould be HTTP status 200', function(done) {
        chai.request(server)
            .get(encodeURI('/vacancies?text=ыфыфыфыфыфыфыфыфыфыфыфыфыфыфы'))
            .set('Authorization', 'Bearer ' + token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.found.should.be.equal(0);
                done();
            });
    });
    it('Request with authorization token with fliter \'/vacancies?text=утитель\'\n\tShould be HTTP status 200', function(done) {
        chai.request(server)
            .get(encodeURI('/vacancies?text=утитель'))
            .set('Authorization', 'Bearer ' + token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.found.should.be.greaterThan(0);
                done();
            });
    });
    it('Request with authorization token with fliter \'/vacancies?text=энженер\'\n\tShould be HTTP status 200', function(done) {
        chai.request(server)
            .get(encodeURI('/vacancies?text=энженер'))
            .set('Authorization', 'Bearer ' + token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.found.should.be.greaterThan(0);
                done();
            });
    });
});
