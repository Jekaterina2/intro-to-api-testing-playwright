import { expect, test } from '@playwright/test'

import { StatusCodes } from 'http-status-codes'
import { OrderDto } from './dto/order-dto'

test('Get order details with correct id should receive code 200', async ({ request }) => {
  // Build and send a GET request to the server
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders/1')
  // Log the response status, body and headers
  console.log('response body:', await response.json())
  console.log('response headers:', response.headers())
  // Check if the response status is 200
  expect(response.status()).toBe(200)
})

test('Change order by post method with correct data should receive code 201', async ({
  request,
}) => {
  const requestBody = OrderDto.createOrderWithRandomData()
  const response = await request.post('https://backend.tallinn-learning.ee/test-orders', {
    data: requestBody,
  })
  console.log('response status:', response.status())
  console.log('request body:', requestBody)
  expect.soft(response.status()).toBe(StatusCodes.OK)
})
test('Get order details with incorrect id 0 should receive code 400 Bad request', async ({
  request,
}) => {
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders/0')
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('Get order details with incorrect id 11 should receive code 400 Bad request', async ({
  request,
}) => {
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders/11')
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('Get order details with incorrect id test should receive code 400 Bad request', async ({
  request,
}) => {
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders/test')
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('Change order by post method with incorrect data should receive code 415', async ({
  request,
}) => {
  const response = await request.post('https://backend.tallinn-learning.ee/test-orders', {
    data: 'test',
  })
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect(response.status()).toBe(StatusCodes.UNSUPPORTED_MEDIA_TYPE)
})

test('Change order by post method with correct data should receive code 200', async ({
  request,
}) => {
  // prepare request body
  const requestBody = {
    status: 'OPEN',
    courierId: 0,
    customerName: 'string',
    customerPhone: 'string',
    comment: 'string',
    id: 0,
  }
  // Send a POST request to the server
  const response = await request.post('https://backend.tallinn-learning.ee/test-orders', {
    data: requestBody,
  })
  // Log the response status and body
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect(response.status()).toBe(StatusCodes.OK)
})
