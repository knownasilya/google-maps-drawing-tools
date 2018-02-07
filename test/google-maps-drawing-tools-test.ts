import hello from 'google-maps-drawing-tools';

QUnit.module('google-maps-drawing-tools tests');

QUnit.test('hello', assert => {
  assert.equal(hello(), 'Hello from google-maps-drawing-tools');
});
