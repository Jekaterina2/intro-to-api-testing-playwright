export class LoanRiskCalculationDto {
  income: number
  debt: number
  age: number
  employed: boolean
  loanAmount: number
  loanPeriod: number

  private constructor(
    income: number,
    debt: number,
    age: number,
    employed: boolean,
    loanAmount: number,
    loanPeriod: number,
  ) {
    this.income = income
    this.debt = debt
    this.age = age
    this.employed = employed
    this.loanAmount = loanAmount
    this.loanPeriod = loanPeriod
  }
  static CreateLoanRiskCalculationDtoWithEmptyData() {
    return new LoanRiskCalculationDto(0, 0, 0, false, 0, 0)
  }
  static CreateLowLoanRiskCalculationDtoWithCorrectData() {
    return new LoanRiskCalculationDto(10000, 10000, 25, true, 10000, 18)
  }
  static CreateMediumLoanRiskCalculationDtoWithCorrectData() {
    return new LoanRiskCalculationDto(1000, 10000, 25, true, 10000, 12)
  }
  static CreateHighLoanRiskCalculationDtoWithCorrectData() {
    return new LoanRiskCalculationDto(10000, 10000, 25, true, 10000, 3)
  }
}
