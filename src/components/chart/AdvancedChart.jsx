import dynamic from 'next/dynamic';
import Script from 'next/script';

const defaultWidgetProps = {
  symbol: 'AAPL',
  interval: '1D',
  library_path:
    'https://charting-library.tradingview-widget.com/charting_library/',
  locale: 'en',
  charts_storage_url: 'https://saveload.tradingview.com',
  charts_storage_api_version: '1.1',
  client_id: 'tradingview.com',
  user_id: 'public_user_id',
  fullscreen: false,
  autosize: true
};
