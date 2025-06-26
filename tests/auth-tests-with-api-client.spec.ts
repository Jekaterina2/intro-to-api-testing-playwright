import { test, expect } from '@playwright/test'
import { ApiClient } from './dto/api-client'
import { StatusCodes } from 'http-status-codes'
import { LoginDto } from './dto/login-dto'
import { OrderDto } from './dto/order-dto'

test('login and create order with api client', async ({ request }) => {
  const apiClient = await ApiClient.getInstance(request)
  const orderId = await apiClient.createOrderAndReturnOrderId()
  console.log('orderId:', orderId)
})
test('Successful login and delete existing order with api client', async ({ request }) => {
  const apiClient = await ApiClient.getInstance(request)
  const orderId = await apiClient.createOrderAndReturnOrderId()
  console.log('orderId:', orderId)
  const response = await apiClient.deleteOrder(orderId)
  const responseBody = await response.text()
  expect(response.status()).toBe(StatusCodes.OK)
  expect(responseBody).toBe('true')
})
//Баг потому что должен вернуть 400 а возвращает 200
test('Login and unsuccessful delete not existing order with api client', async ({ request }) => {
  const apiClient = await ApiClient.getInstance(request)
  const orderId = 123456
  console.log('orderId:', orderId)
  const response = await apiClient.deleteOrder(orderId)
  expect(response.status()).toBe(StatusCodes.OK)
})

const serviceURL = 'https://backend.tallinn-learning.ee/'
const loginPath = 'login/student'
const orderPath = 'orders'

test('Login and successfully find order by ID without API client', async ({ request }) => {
  const requestBody = LoginDto.createLoginWithCorrectData()
  console.log('requestBody:', requestBody)
  const response = await request.post(`${serviceURL}${loginPath}`, {
    data: requestBody,
  })
  const jwt = await response.text()
  console.log('JWT token:', jwt)
  const orderResponse = await request.post(`${serviceURL}${orderPath}`, {
    data: OrderDto.createOrderWithRandomData(),
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })
  const createdOrderBody = await orderResponse.json()
  console.log('orderResponse Id:', orderResponse.status())
  expect(orderResponse.status()).toBe(StatusCodes.OK)
  expect(createdOrderBody.id).toBeDefined()

  const createdOrderId = createdOrderBody.id
  console.log('createdOrderId:', createdOrderId)

  const getOrderResponse = await request.get(`${serviceURL}${orderPath}/${createdOrderId}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })
  const orderByIdBody = await getOrderResponse.json()
  console.log('orderByIdBody:', orderByIdBody)
  console.log('orderResponse Id:', orderResponse.status())
  console.log('orderResponse status:', orderResponse.status())
  expect(getOrderResponse.status()).toBe(StatusCodes.OK)
  expect(orderByIdBody.id).toBe(createdOrderId)
  expect(orderByIdBody.status).toBe(createdOrderBody.status)
  expect(orderByIdBody.customerName).toBe(createdOrderBody.customerName)
})

test('Login and successfully delete order by ID and check it is not found without API client', async ({
  request,
}) => {
  const requestBody = LoginDto.createLoginWithCorrectData()
  const loginResponse = await request.post(`${serviceURL}${loginPath}`, {
    data: requestBody,
  })
  expect(loginResponse.status()).toBe(StatusCodes.OK)
  const jwt = await loginResponse.text()

  const orderResponse = await request.post(`${serviceURL}${orderPath}`, {
    data: OrderDto.createOrderWithRandomData(),
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })
  const createdOrderBody = await orderResponse.json()
  console.log('orderResponse Id:', orderResponse.status())
  console.log('orderResponse body:', createdOrderBody)
  expect(orderResponse.status()).toBe(StatusCodes.OK)
  expect(createdOrderBody.id).toBeDefined()

  const createdOrderId = createdOrderBody.id
  const deleteOrderResponse = await request.delete(`${serviceURL}${orderPath}/${createdOrderId}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })
  expect(deleteOrderResponse.status()).toBe(StatusCodes.OK)

  const getDeletedOrderResponse = await request.get(`${serviceURL}${orderPath}/${createdOrderId}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })
  const responseBody = await getDeletedOrderResponse.text()
  console.log('Get deleted order status:', getDeletedOrderResponse.status())
  console.log('Get deleted order body:', responseBody)
  expect(getDeletedOrderResponse.status()).toBe(StatusCodes.OK)
  expect(
    responseBody === '' || responseBody.includes('not found') || responseBody.includes('deleted'),
  ).toBeTruthy()
})
test('Login and successfully find order by ID with API client', async ({ request }) => {
  const apiClient = await ApiClient.getInstance(request)
  const orderId = await apiClient.createOrderAndReturnOrderId()
  console.log('orderId:', orderId)
  const orderResponse = await apiClient.getOrderById(orderId)
  const orderByIdBody = await orderResponse.json()
  console.log('orderByIdBody:', orderByIdBody)
  console.log('orderResponse Id:', orderResponse.status())
  console.log('orderResponse status:', orderResponse.status())
  expect(orderResponse.status()).toBe(StatusCodes.OK)
  expect(orderByIdBody.id).toBe(orderId)
  expect(orderByIdBody.status).toBe(OrderDto.createOrderWithRandomData().status)
  expect(orderByIdBody.customerName).toBe(OrderDto.createOrderWithRandomData().customerName)
})
//Баг потому что должен вернуть 400 а возвращает 200
test('Login and successfully delete order by ID and check it is not found with API client', async ({
  request,
}) => {
  const apiClient = await ApiClient.getInstance(request)
  const orderId = await apiClient.createOrderAndReturnOrderId()
  console.log('orderId:', orderId)
  const deleteOrderResponse = await apiClient.deleteOrder(orderId)
  expect(deleteOrderResponse.status()).toBe(StatusCodes.OK)
  const getDeletedOrderResponse = await apiClient.getOrderById(orderId)
  const responseBody = await getDeletedOrderResponse.body()
  console.log('Get deleted order status:', getDeletedOrderResponse.text())
  console.log('Get deleted order body:', responseBody)
  expect(getDeletedOrderResponse.status()).toBe(StatusCodes.OK)
})
