import React from 'react';
import {shallow} from 'enzyme';
import Login from '../Login';
import renderer from 'react-test-renderer';

function RegresTest() {
  return fetch("https://reqres.in/api/login", {
    method: 'POST',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email: 'eve.holt@reqres.in', password: 'cityslicka'})
  })
    .then((response) => {
      if (response === 200) { //linting error is wrong. response is a number type
        return response;
      }
    })
}

it('Api Test', async function () {
  global.fetch = jest.fn().mockImplementation(() => {
    let promise = new Promise((resolve, reject) => {
      resolve(200);
    });
    return promise;
  })
  const response = await RegresTest();
  expect(response).toBe(200);
}); 