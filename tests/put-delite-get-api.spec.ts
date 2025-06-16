import { expect, test } from '@playwright/test'
//Put
test('Put order request with correct data should receive code 200', async ({ request }) => {
  const requestBody = {
    status: 'OPEN',
    courierId: 0,
    customerName: 'Ilya',
    customerPhone: '56222',
    comment: 'string',
    id: 10,
  }
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/10', {
    data: requestBody,
    headers: {
      api_key: '1234567890123456',
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
  })
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect(response.status()).toBe(200)
})
test('Put order request with incorrect data lenght should receive code 400', async ({
  request,
}) => {
  const requestBody = {
    status: 'OPEN',
    courierId: 0,
    customerName: 'Mike',
    customerPhone: '55555',
    comment: 'string',
    id: 101010,
  }
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/101010', {
    data: requestBody,
    headers: {
      api_key: '1234567890123456',
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
  })
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect(response.status()).toBe(400)
})
test('Put order request with incorrect string should receive code 400', async ({ request }) => {
  const requestBody = {
    status: 'OPEN',
    courierId: 0,
    customerName: 'string',
    customerPhone: 'string',
    comment: 'string',
    id: 'string',
  }
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/kkk', {
    data: requestBody,
    headers: {
      api_key: '1234567890123456',
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
  })
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect(response.status()).toBe(400)
})
//Delete
test('Delete order request with correct data should receive code 204', async ({ request }) => {
  const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/9', {
    headers: {
      api_key: '1234567890123456',
      accept: '*/*',
    },
  })
  console.log('response status:', response.status())
  expect(response.status()).toBe(204)
})
test('Delete order request with incorrect data should receive code 400', async ({ request }) => {
  const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/101010', {
    headers: {
      api_key: '1234567890123456',
      accept: '*/*',
    },
  })
  console.log('response status:', response.status())
  expect(response.status()).toBe(400)
})
//GET
test('Get order request with correct id should receive code 200', async ({ request }) => {
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders/10')
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect(response.status()).toBe(200)
})
test('Get order request with incorrect id should receive code 400', async ({ request }) => {
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders/101010')
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect(response.status()).toBe(400)
})
