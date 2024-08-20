'use server';

const url = 'https://api.commerce.coinbase.com/charges';
const subscription_payload = {
    "trial" : {
        local_price: {
            amount: '0', //price of charge
            currency: 'USD', //currency
         },
         description: "Money For People",
         name: 'Trial Plan',
         pricing_type: 'fixed_price',
         redirect_url: '/',
    },
    "backtesting" : {
        local_price: {
            amount: '20', //price of charge
            currency: 'USD', //currency
         },
         name: 'Backtesting Plan',
         pricing_type: 'fixed_price',
         redirect_url: '/',
    },
    "bot_trading" : {
        local_price: {
            amount: '200', //price of charge
            currency: 'USD', //currency
         },
         name: 'Botrading Plan',
         pricing_type: 'fixed_price',
         redirect_url: '/',
    },

}


async function createCharge(request_plan) {
  try {
    // console.log(request_plan)
    const requestBody = subscription_payload[request_plan]
    
    const payload = {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'X-CC-Api-Key': process.env.COMMERCE_API_KEY,//API key from Commerce
        },
        body: JSON.stringify(requestBody),
    };      

    const response =await fetch(url, payload);
    if (!response.ok) {
      throw new Error(`HTTP error Status: ${response.status}`);
    }
    return  await response.json();
  } catch (error) {
    console.error("Error creating charge:", error);
  }
}

export { createCharge };