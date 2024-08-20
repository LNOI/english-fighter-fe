'use server';
import { signIn, signOut } from '@/auth';
import { post, put } from '@/lib/api';

export async function doSocialLogin() {
  await signIn("keycloak");
}
export async function doLogout() {
  try {
    await signOut({ redirect: false });
    return {
      success: true
    };
  } catch (err) {
    return {
      success: false
    };
  }
}


export async function doSaveConfigStrategies(_currentState, formData) {
  try {
    const data = {
      name: formData.get('name'),
      max_open_trades: parseInt(formData.get('max_open_trades')),
      stake_currency: formData.get('stake_currency'),
      stake_amount: parseFloat(formData.get('stake_amount')),
      tradable_balance_ratio: parseFloat(formData.get('tradable_balance_ratio')),
      fiat_display_currency: formData.get('fiat_display_currency'),
      dry_run: formData.get('dry_run')==="on" ? true : false,
      dry_run_wallet: parseFloat(formData.get('dry_run_wallet')),
      cancel_open_orders_on_exit: formData.get('cancel_open_orders_on_exit')==="on" ? true : false,
      trading_mode: formData.get('trading_mode'),
      margin_mode: formData.get('margin_mode'),
      unfilledtimeout: {
        entry: parseInt(formData.get('unfilledtimeout_entry')),
        exit: parseInt(formData.get('unfilledtimeout_exit')),
        exit_timeout_count: parseInt(formData.get('unfilledtimeout_exit_timeout_count')),
        unit: formData.get('unfilledtimeout_unit')
      },
      entry_pricing: {
        price_side: formData.get('entry_pricing_price_side'),
        use_order_book: formData.get('entry_pricing_use_order_book')==="on" ? true : false,
        order_book_top: parseInt(formData.get('entry_pricing_order_book_top')),
        price_last_balance: parseInt(formData.get('entry_pricing_price_last_balance')),
        check_depth_of_market: {
          enabled : false,
          bids_to_ask_delta: 1
        }
      },
      exit_pricing: {
        price_side: formData.get('exit_pricing_price_side'),
        use_order_book: formData.get('exit_pricing_use_order_book')==="on" ? true : false,
        order_book_top: parseInt(formData.get('exit_pricing_order_book_top')),
      },
      exchange: {
        name: formData.get('exchange_name'),
        key: formData.get('exchange_key'),
        secret:  formData.get('exchange_secret'),
        ccxt_config: {},
        ccxt_async_config:{},
        pair_whitelist: ["BTC/USDT:USDT","ETH/USDT:USDT","BNB/USDT:USDT"],
        pair_blacklist: []
      },
      pairlists: {
        method: formData.get('pairlists_method'),
        number_assets: parseInt(formData.get('pairlists_number_assets')),
        sort_key: formData.get('pairlists_sort_key'),
        min_value: parseInt(formData.get('pairlists_min_value')),
        refresh_period: parseInt(formData.get('pairlists_refresh_period')),
      },
      telegram: {
        enabled:formData.get('telegram_enabled')==="on" ? true : false,
        token: formData.get('telegram_token'),
        chat_id: formData.get('telegram_chat_id'),
      },
      bot_name: formData.get('bot_name'),
      initial_state: formData.get('initial_state'),
      force_entry_enable: formData.get('force_entry_enable')==="on" ? true : false,
      internals: {
        process_throttle_secs: parseInt(formData.get('internals_process_throttle_secs')),
      }
    };
    // //console.log(formData)
    const uuid_config = formData.get("uuid_config")
    if(uuid_config){
      const resp  = await put("/api/user/00000000-0000-0000-0000-000000000000/config/"+uuid_config,data)
      return resp
    }else{
      const resp = await post("/api/user/00000000-0000-0000-0000-000000000000/config",data)
      return resp
    }

  } catch (error) {
    //console.log(error)
    return {
      success: false,
      error: true
    };
  }
}
