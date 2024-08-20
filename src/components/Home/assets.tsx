import React from 'react'
import ccxt from 'ccxt'

async function getData(pair:String) {
    // const ohlcv = await new ccxt.binance().fetchOHLCV(pair,"1d",undefined,7)
    // return {ohlcv}
}

async function  Assets({pair}:{pair:String}) {
    //  const {ohlcv} = await getData(pair)
    //  //console.log(ohlcv)
  return (
    <div></div>
  )
}

export default Assets