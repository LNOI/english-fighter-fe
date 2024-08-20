'use client';
import React, { useEffect, useRef, useState } from 'react';
import { generateData } from '@/lib/generateExample';
import { createChart, ColorType } from 'lightweight-charts';

const backgroundColor = 'white';
const lineColor = '#2962FF';
const textColor = 'black';
const areaTopColor = '#2962FF';
const areaBottomColor = 'rgba(41, 98, 255, 0.28)';

const upColor = '#26a69a';
const downColor = '#ef5350';
const borderVisible = false;
const wickUpColor = '#26a69a';
const wickDownColor = '#ef5350';

function* getNextRealtimeUpdate(realtimeData) {
  for (const dataPoint of realtimeData) {
    yield dataPoint;
  }
  return null;
}

const data_realtime = generateData(2500, 20, 1000);

// //console.log(data_realtime);
export default function ChartComponent({ data, candlesStickSeries }) {
  const [startRealtime, setStartRealtime] = useState(false);
  const [isFullSeries, setIsFullSeries] = useState(false);
  const chartContainerRef = useRef();
  const currentPoint = useRef(-1);
  const previousPoint = useRef(0);
  const [streamingDataProvider, setStreamingDataProvider] = useState();
  const [atIndex, setAtIndex] = useState(-1);
  const [preIndex, setPreIndex] = useState(0);

  const createChartTrading = (ref_hook) => {
    return createChart(ref_hook.current, {
      layout: {
        background: { type: ColorType.Solid, color: backgroundColor },
        textColor
      },
      width: ref_hook.current.clientWidth,
      height: 500
    });
  };

  const addCandlestickSeries = (chart) => {
    return chart.addCandlestickSeries({
      upColor: upColor,
      downColor: downColor,
      borderVisible: borderVisible,
      wickUpColor: wickUpColor,
      wickDownColor: wickDownColor
    });
  };

  const changeRealtime = () => {
    setStartRealtime(!startRealtime);
  };
  const handleSpacePress = (event) => {
    if (event.key === ' ') {
      // changeRealtime();
    }
  };

  useEffect(() => {
    const rtime = getNextRealtimeUpdate(data_realtime.realtimeUpdates);
    setStreamingDataProvider(rtime);

    window.addEventListener('keydown', handleSpacePress);

    // Cleanup function to remove event listener on component unmount
    return () => window.removeEventListener('keydown', handleSpacePress);
  }, []);

  const currentStick = () => {
    // //console.log(currentPoint.current);
    let total_candle = parseInt(currentPoint.current / 20);
    const watched_candle = data_realtime.initialData;

    const last_time = watched_candle[watched_candle.length - 1]['time'];

    const first_candle = parseInt(previousPoint.current / 20) + 1;

    // //console.log(first_candle);
    for (let i = first_candle; i <= total_candle; i++) {
      if (last_time == data_realtime.realtimeUpdates[i * 20 - 1]['time']) {
        watched_candle[watched_candle.length - 1] =
          data_realtime.realtimeUpdates[i * 20 - 1];
      } else {
        watched_candle.push(data_realtime.realtimeUpdates[i * 20 - 1]);
      }
    }
    if (currentPoint.current !== -1) {
      watched_candle.push(data_realtime.realtimeUpdates[currentPoint.current]);
    }

    data_realtime.initialData = watched_candle;

    // //console.log(watched_candle);
    previousPoint.current = currentPoint.current;
    return watched_candle;
  };

  useEffect(() => {
    if (streamingDataProvider && startRealtime) {
      const chart = createChartTrading(chartContainerRef);
      const candlestickSeries = addCandlestickSeries(chart);
      candlestickSeries.setData(data_realtime.initialData);
      const intervalID = setInterval(() => {
        const update = streamingDataProvider.next();
        currentPoint.current += 1;
        if (update.done) {
          clearInterval(intervalID);
          return;
        }
        candlestickSeries.update(update.value);
      }, 10);

      const handleResize = () => {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
      };

      chart.timeScale().fitContent();
      chart.timeScale().scrollPosition(5);
      window.addEventListener('resize', handleResize);
      return () => {
        // updateAtSeries(at_old)
        clearInterval(intervalID);
        window.removeEventListener('resize', handleResize);
        chart.remove();
      };
    }
    if (!startRealtime) {
      const chart = createChartTrading(chartContainerRef);
      const candlestickSeries = addCandlestickSeries(chart);
      const handleResize = () => {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
      };
      candlestickSeries.setData(currentStick());
      chart.timeScale().fitContent();

      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
        chart.remove();
      };
    }
  }, [startRealtime, atIndex]);

  useEffect(() => {}, [isFullSeries]);

  return (
    <>
      <div className="flex flex-row gap-4">
        <button
          className="rounded-xl bg-brand-color p-2"
          onClick={() => setStartRealtime(!isFullSeries)}
        >
          FULL
        </button>
        <button
          className="rounded-xl bg-brand-color p-2"
          onClick={() => setStartRealtime(!startRealtime)}
        >
          {startRealtime ? 'STOP' : 'START'}
        </button>
        {/* <h1> {startRealtime ? 'STOP' : 'START'}</h1> */}
      </div>
      <div ref={chartContainerRef} />
    </>
  );
}
