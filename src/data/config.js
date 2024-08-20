// Mock data
export const ConfigSetting = [
  {
    id: 'id',
    name: 'Trading Mode',
    type: 'option',
    key: 'trading_mode',
    value: [
      {
        id: 'id_value',
        name: 'Futures',
        key: 'futures'
      },
      {
        id: 'id_value',
        name: 'Spot',
        key: 'spot'
      }
    ]
  },
  {
    id: 'id',
    name: 'Margin Mode',
    type: 'option',
    key: 'margin_mode',
    value: [
      {
        id: 'id_value',
        name: 'Isolated',
        key: 'isolated'
      },
      {
        id: 'id_value',
        name: 'Cross',
        key: 'cross'
      }
    ]
  },
  {
    id: 'id',
    name: 'Max open trades',
    type: 'input',
    key: 'max_open_trades',
    value: 'max_open_trades'
  },
  {
    id: 'id',
    name: 'Stake currency',
    type: 'option',
    key: 'stack_currency',
    value: [
      {
        id: 'id_value',
        name: 'Isolated',
        key: 'isolated'
      },
      {
        id: 'id_value',
        name: 'Cross',
        key: 'cross'
      }
    ]
  },
  {
    id : 'id',
    name : 'Stake amount',
    key: 'tradable_balance_ratio',
    type : "input",
    value: 'stake_amount',

  },
  {
    id : 'id',
    name : 'Tradable Balance Ratio',
    key: 'tradable_balance_ratio',
    type : "input",
    value: 'tradable_balance_ratio',

  }

];

export const attr_config =[
  {
    "name": "name",
    "title": "Name",
    "type": "string",
    "default": "Hydro",
    "required": true,
    "children": []
  },
  {
    "name": "max_open_trades",
    "title": "Max Open Trades",
    "type": "integer",
    "default": 3,
    "required": true,
    "children": []
  },
  {
    "name": "stake_currency",
    "title": "Stake Currency",
    "type": "string",
    "default": 'USDT',
    "required": true,
    "children": []
  },
  {
    "name": "stake_amount",
    "title": "Stake Amount",
    "type": "number",
    "default": 1000,
    "required": true,
    "children": []
  },
  {
    "name": "tradable_balance_ratio",
    "title": "Tradable Balance Ratio",
    "type": "number",
    "default": 0.99,
    "required": true,
    "children": []
  },
  {
    "name": "fiat_display_currency",
    "title": "Fiat Display Currency",
    "type": "string",
    "default": 'USD',
    "required": true,
    "children": []
  },
  {
    "name": "dry_run",
    "title": "Dry Run",
    "type": "boolean",
    "default": true,
    "required": false,
    "children": []
  },
  {
    "name": "dry_run_wallet",
    "title": "Dry Run Wallet",
    "type": "number",
    "default": 100,
    "required": false,
    "children": []
  },
  {
    "name": "cancel_open_orders_on_exit",
    "title": "Cancel Open Orders On Exit",
    "type": "boolean",
    "default": false,
    "required": false,
    "children": []
  },
  {
    "name": "trading_mode",
    "title": null,
    "type": "select",
    "default": "futures",
    "required": false,
    "children": [],
    "menu": [
      { "id": 0, "name": "spot" },
      { "id": 1, "name": "futures" }
    ]
  },
  {
    "name": "margin_mode",
    "title": null,
    "type": "select",
    "default": "ISOLATED",
    "required": false,
    "children": [],
    "menu": [
      { "id": 0, "name": "ISOLATED" },
      { "id": 1, "name": "CROSS" }
    ]
  },
  {
    "name": "unfilledtimeout",
    "title": null,
    "type": null,
    "default": null,
    "required": true,
    "children": [
      {
        "name": "entry",
        "title": "Entry",
        "type": "integer",
        "default": 10,
        "required": false,
        "children": []
      },
      {
        "name": "exit",
        "title": "Exit",
        "type": "integer",
        "default": 10,
        "required": false,
        "children": []
      },
      {
        "name": "exit_timeout_count",
        "title": "Exit Timeout Count",
        "type": "integer",
        "default": 0,
        "required": false,
        "children": []
      },
      {
        "name": "unit",
        "title": "Unit",
        "type": "string",
        "default": "minutes",
        "required": false,
        "children": []
      }
    ]
  },
  {
    "name": "entry_pricing",
    "title": null,
    "type": null,
    "default": null,
    "required": true,
    "children": [
      {
        "name": "price_side",
        "title": "Price Side",
        "type": "string",
        "default": "same",
        "required": false,
        "children": []
      },
      {
        "name": "use_order_book",
        "title": "Use Order Book",
        "type": "boolean",
        "default": true,
        "required": false,
        "children": []
      },
      {
        "name": "order_book_top",
        "title": "Order Book Top",
        "type": "integer",
        "default": 1,
        "required": false,
        "children": []
      },
      {
        "name": "price_last_balance",
        "title": "Price Last Balance",
        "type": "number",
        "default": 0.0,
        "required": false,
        "children": []
      },
      {
        "name": "check_depth_of_market",
        "title": null,
        "type": null,
        "default": null,
        "required": true,
        "children": []
      }
    ]
  },
  {
    "name": "exit_pricing",
    "title": null,
    "type": null,
    "default": null,
    "required": true,
    "children": [
      {
        "name": "price_side",
        "title": "Price Side",
        "type": "string",
        "default": "same",
        "required": false,
        "children": []
      },
      {
        "name": "use_order_book",
        "title": "Use Order Book",
        "type": "boolean",
        "default": true,
        "required": false,
        "children": []
      },
      {
        "name": "order_book_top",
        "title": "Order Book Top",
        "type": "integer",
        "default": 1,
        "required": false,
        "children": []
      }
    ]
  },
  {
    "name": "exchange",
    "title": null,
    "type": null,
    "default": null,
    "required": true,
    "children": [
      {
        "name": "name",
        "title": "Name",
        "type": "string",
        "default": "binance",
        "required": false,
        "children": []
      },
      {
        "name": "key",
        "title": "Key",
        "type": null,
        "default": null,
        "required": false,
        "children": []
      },
      {
        "name": "secret",
        "title": "Secret",
        "type": null,
        "default": null,
        "required": false,
        "children": []
      },
      {
        "name": "ccxt_config",
        "title": "Ccxt Config",
        "type": null,
        "default": null,
        "required": false,
        "children": []
      },
      {
        "name": "ccxt_async_config",
        "title": "Ccxt Async Config",
        "type": null,
        "default": null,
        "required": false,
        "children": []
      },
      {
        "name": "pair_whitelist",
        "title": "Pair Whitelist",
        "type": "array",
        "default": [],
        "required": false,
        "children": []
      },
      {
        "name": "pair_blacklist",
        "title": "Pair Blacklist",
        "type": "array",
        "default": [],
        "required": false,
        "children": []
      }
    ]
  },
  {
    "name": "pairlists",
    "title": null,
    "type": null,
    "default": null,
    "required": true,
    "children": [
      {
        "name": "method",
        "title": "Method",
        "type": "string",
        "default": "StaticPairList",
        "required": false,
        "children": []
      },
      {
        "name": "number_assets",
        "title": "Number Assets",
        "type": "integer",
        "default": 20,
        "required": false,
        "children": []
      },
      {
        "name": "sort_key",
        "title": "Sort Key",
        "type": "string",
        "default": "quoteVolume",
        "required": false,
        "children": []
      },
      {
        "name": "min_value",
        "title": "Min Value",
        "type": "number",
        "default": 0,
        "required": false,
        "children": []
      },
      {
        "name": "refresh_period",
        "title": "Refresh Period",
        "type": "integer",
        "default": 1800,
        "required": false,
        "children": []
      }
    ]
  },
  {
    "name": "telegram",
    "title": null,
    "type": null,
    "default": null,
    "required": true,
    "children": [
      {
        "name": "enabled",
        "title": "Enabled",
        "type": "boolean",
        "default": false,
        "required": false,
        "children": []
      },
      {
        "name": "token",
        "title": "Token",
        "type": null,
        "default": null,
        "required": false,
        "children": []
      },
      {
        "name": "chat_id",
        "title": "Chat Id",
        "type": null,
        "default": null,
        "required": false,
        "children": []
      }
    ]
  },
  {
    "name": "api_server",
    "title": null,
    "type": null,
    "default": null,
    "required": true,
    "children": [
      {
        "name": "enabled",
        "title": "Enabled",
        "type": "boolean",
        "default": false,
        "required": false,
        "children": []
      },
      {
        "name": "listen_ip_address",
        "title": "Listen Ip Address",
        "type": "string",
        "default": "127.0.0.1",
        "required": false,
        "children": []
      },
      {
        "name": "listen_port",
        "title": "Listen Port",
        "type": "integer",
        "default": 8080,
        "required": false,
        "children": []
      },
      {
        "name": "verbosity",
        "title": "Verbosity",
        "type": "string",
        "default": "error",
        "required": false,
        "children": []
      },
      {
        "name": "enable_openapi",
        "title": "Enable Openapi",
        "type": "boolean",
        "default": false,
        "required": false,
        "children": []
      },
      {
        "name": "jwt_secret_key",
        "title": "Jwt Secret Key",
        "type": "string",
        "default": "1ee387df7a478ba6728fd376e2d1a3fa43c494eddc7765875c97b22a723ef53d",
        "required": false,
        "children": []
      },
      {
        "name": "ws_token",
        "title": "Ws Token",
        "type": "string",
        "default": "p8TZLmM9noPjBZV9szHEUpobgedEO7NhuQ",
        "required": false,
        "children": []
      },
      {
        "name": "CORS_origins",
        "title": "Cors Origins",
        "type": "array",
        "default": [],
        "required": false,
        "children": []
      },
      {
        "name": "username",
        "title": "Username",
        "type": null,
        "default": null,
        "required": false,
        "children": []
      },
      {
        "name": "password",
        "title": "Password",
        "type": null,
        "default": null,
        "required": false,
        "children": []
      }
    ]
  },
  {
    "name": "bot_name",
    "title": "Bot Name",
    "type": "string",
    "default": null,
    "required": true,
    "children": []
  },
  {
    "name": "initial_state",
    "title": "Initial State",
    "type": "string",
    "default": "running",
    "required": false,
    "children": []
  },
  {
    "name": "force_entry_enable",
    "title": "Force Entry Enable",
    "type": "boolean",
    "default": false,
    "required": false,
    "children": []
  },
  {
    "name": "internals",
    "title": null,
    "type": null,
    "default": null,
    "required": true,
    "children": [
      {
        "name": "process_throttle_secs",
        "title": "Process Throttle Secs",
        "type": "integer",
        "default": 5,
        "required": false,
        "children": []
      }
    ]
  }
]
