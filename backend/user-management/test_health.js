const axios = require('axios');

test('health endpoint', async () => {
  const resp = await axios.get('http://localhost:8081/health');
  expect(resp.status).toBe(200);
  expect(resp.data.status).toBe('ok');
});
