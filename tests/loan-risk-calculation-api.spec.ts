import {expect,test} from '@playwright/test'
import {StatusCodes} from 'http-status-codes'
import {LoanRiskCalculationDto} from './dto/loanRiskCalculation-dto'

const serviceURL = 'https://backend.tallinn-learning.ee/api/loan-calc/decision'

  test.describe('Loan Risk Calculation API', () => {
    test('Unsuccessful loan risk score calculation with empty data should return 400', async ({request}) => {
      const requestBody = LoanRiskCalculationDto.CreateLoanRiskCalculationDtoWithEmptyData()
      const response = await request.post(serviceURL, { data: requestBody })
      expect.soft(response.status()).toBe(StatusCodes.BAD_REQUEST)
      console.log(await response.text());
    })
    test('Successful Low loan risk score calculation with correct data should return 200', async ({request}) => {
      const requestBody = LoanRiskCalculationDto.CreateLowLoanRiskCalculationDtoWithCorrectData()
      const response = await request.post(serviceURL, { data: requestBody })
      expect.soft(response.status()).toBe(StatusCodes.OK)
      console.log(await response.json());
    })
    test('Successful  Medium loan risk score calculation with correct data should return 200', async ({request}) => {
      const requestBody = LoanRiskCalculationDto.CreateMediumLoanRiskCalculationDtoWithCorrectData()
      const response = await request.post(serviceURL, { data: requestBody })
      expect.soft(response.status()).toBe(StatusCodes.OK)
      console.log(await response.json());
    })
    test('Successful  High loan risk score calculation with correct data should return 200', async ({request}) => {
      const requestBody = LoanRiskCalculationDto.CreateHighLoanRiskCalculationDtoWithCorrectData()
      const response = await request.post(serviceURL, { data: requestBody })
      expect.soft(response.status()).toBe(StatusCodes.OK)
      console.log(await response.json());
    })
    })
