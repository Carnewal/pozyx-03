import test from 'ava'
import api from '../../src/route/api'
import model from '../../src/model'
import request from 'supertest'


test("GET /map/:id", async (t) => {
t.plan(1)

    const result = await request(api)
    .get('/map/1');
t.is(res.json,({map:map}));
t.snapshot(result);
});
// This is an express app
/*
test('signup:Success', async t => {
	t.plan(2);

	const res = await request(makeApp())
		.post('/signup')
		.send({email: 'ava@rocks.com', password: '123123'});

	t.is(res.status, 200);
	t.is(res.body.email, 'ava@rocks.com');
});
test.cb("GET /map/map_id/tag/:tag_id", t => {
  request(api)
    .get('/map/1/tag/1')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function (err, res) {
      t.is(res.body.id, 1);
      t.end();
    });
});
*/
