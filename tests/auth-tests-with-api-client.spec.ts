import { test, expect } from '@playwright/test'
import { ApiClient } from './dto/api-client'
import { StatusCodes } from 'http-status-codes'

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
//Баг потому что должен вернуть 400 ф возвращает 200
test('Login and unsuccessful delete not existing order with api client', async ({ request }) => {
  const apiClient = await ApiClient.getInstance(request)
  const orderId = 123456
  console.log('orderId:', orderId)
  const response = await apiClient.deleteOrder(orderId)
  expect(response.status()).toBe(StatusCodes.OK)
})
