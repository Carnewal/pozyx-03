import test from 'ava'
import api from '../../src/route/api'
import model from '../../src/model'
import request from 'supertest'


test("GET /map/:id", async (t) => {
  const result = request(api)
  .get('/map/1')
  .expect('Content-Type', /json/)
  .expect(200)
  .expect('body.id', '1');
t.pass();

});

test("GET /labels", async (t) => {
  const result = request(api)
  .get('/labels')
  .expect('Content-Type', /json/)
  .expect(200)
t.pass();

});

test("GET /map/:mapId/zones", async (t) => {
  const result = request(api)
  .get('/map/1/zones')
  .expect('Content-Type', /json/)
  .expect(200)

t.pass();

});
