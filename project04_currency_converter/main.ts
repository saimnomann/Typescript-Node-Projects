#! /usr/bin/env node
import inquirer from "inquirer";


interface CurrencyRates {
    [key: string]: number;
  }
  
  const currency: { [key: string]: CurrencyRates }={

    "PKR":{
"USD":0.0036,




"EUR":0.0034,
"GBP":.0029,
"AED":0.013,
"CAD":.0049
     },
"USD":{
"PKR":278.05,
"EUR":.94,
"GBP":.82,
"AED":3.67,
"CAD":1.37
},
"EUR":{
"PKR":278.05,
"USD":1.07,
"GBP":.87,
"AED":3.92,
"CAD":1.46,
},
"GBP":{
"PKR":340.33,
"USD":1.22,
"EUR":1.15,
"AED":4.49,
"CAD":1.67
},
"AED":{
    "PKR":75.69,
"USD":1.07,
"GBP":.22,
"EUR":.26,
"CAD":.37,
},
"CAD":{
    "PKR":203.24,
"USD":.73,
"GBP":.60,
"AED":2.68,
"EUR":.68
}
}



let currencyConvertor=async ()=>{
let questions=await inquirer.prompt([{
name:"fromCurrency",
type:"list",
choices:Object.keys(currency),
message:"Select the currency you want to convert"
},{
name:"ToCurrency",
type:"list",
choices:Object.keys(currency),
message:"Select the current you want to convet into"
}])
let amount_Convert=await inquirer.prompt({
    name:"Amount",
    type:"number",
    message:"How much amount you want to convert"
})

let into:string=questions.ToCurrency;
let from:string=questions.fromCurrency;
let amount=parseInt(amount_Convert.Amount)

if(from===into){
    console.log(`No need to convert ${from}${amount} into ${into}${amount},it will be same.`)
}
else{
    let conversionRate=currency[into][from]
    let convertedvalue=conversionRate*amount
    console.log(`${into} ${convertedvalue}`)
}
}

currencyConvertor()
