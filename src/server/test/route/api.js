import test from 'ava'
import api from '../../src/route/api'

test('GET /tag/:id', async t => {
    t.plan(2)

    const res = await request(api).get('/tag/5')

    t.is(res.status, 200)
    t.is(res.body.id, 5)
});
