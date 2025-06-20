| Name                                                                                 | Data                                                                    |
|--------------------------------------------------------------------------------------|-------------------------------------------------------------------------|
| Successful order change with correct ID should receive code 200                      | ID:10                                                                   |
| Unsuccessful order change with incorrect ID length should receive code 400           | ID:101010                                                               |
| Unsuccessful order change with incorrect ID with string data should receive code 400 | ID:kkk                                                                  |
| Successful order delete with correct ID should receive code 204                      | ID:9                                                                    |
| Unsuccessful order delete with incorrect ID should receive code 400                  | ID:101010                                                               |
| Successful order data request with correct ID should receive code 200                | ID:10                                                                   |
| Unsuccessful order data request with incorrect ID should receive code 400            | ID:101010                                                               |
| Unsuccessful loan risk score calculation with empty data                             | income:,debt:,age:,employd:true,loanAmount:,loanPeriod:                 |
| Successful loan low risk score calculation                                           | income:10000,debt:50,age:30,employd:true,loanAmount:10000,loanPeriod:18 |
| Successful loan medium risk score calculation                                        | income:10000,debt:50,age:25,employd:true,loanAmount:10000,loanPeriod:9  |
| Successful loan high risk score calculation                                          | income:10000,debt:100,age:20,employd:true,loanAmount:1000,loanPeriod:3  |