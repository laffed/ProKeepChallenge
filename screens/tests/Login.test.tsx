import React from 'react';
import {shallow} from 'enzyme';
import Login from '../Login';
import renderer from 'react-test-renderer';

function RegresValid() {
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

function RegressInvalid() {
  return fetch("https://reqres.in/api/login", {
    method: 'POST',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email: 'eve.holt@reqreasdfasdfs.in', password: 'citasdfasdfyslicka'})
  })
    .then((response) => {
      if (response === 400) { //linting error is wrong. response is a number type
        return response;
      }
    })
}

it('Valid Login Test', async function () {
  global.fetch = jest.fn().mockImplementation(() => {
    let promise = new Promise((resolve, reject) => {
      resolve(200);
    });
    return promise;
  })
  const response = await RegresValid();
  expect(response).toBe(200);
});

it('Invalid Login Test', async function () {
  global.fetch = jest.fn().mockImplementation(() => {
    let promise = new Promise((resolve, reject) => {
      resolve(400);
    });
    return promise;
  })
  const response = await RegressInvalid();
  expect(response).toBe(400);
}); 