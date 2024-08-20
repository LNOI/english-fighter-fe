'use client';
import { useState, useEffect } from 'react';
import { get } from '@/lib/api';
import { useSession } from 'next-auth/react';
import ButtonCustom from '@/components/ui/ButtonCustom';
import Image from 'next/image';
function MarketPlacePage() {
  const { data: session, status, update } = useSession();
  const [popStrategies, setPopStrategies] = useState([]);
  useEffect(() => {
    const fetchPopularStrategies = async () => {
      console.log('go go');
      const resp = await get('/strategy/popular');
      console.log(resp);
      setPopStrategies(resp);
    };
    fetchPopularStrategies().catch(console.error);
    // if (status === 'authenticated') {
    //   fetchPopularStrategies().catch(console.error);
    // }
  }, [session]);
  return (
    <div className="flex w-full flex-col">
      <div className="mt-4 flex w-full justify-center">
        <p className="text-2xl font-bold">Market Place</p>
      </div>
      <div className="item-center m-auto flex w-full flex-wrap justify-center gap-2">
        {popStrategies.map((item, index) => {
          return (
            <div
              key={index}
              className="flex w-1/4 flex-col items-center justify-center"
            >
              <p className="font-bold">{item.name}</p>
              {/* <Image src={}></Image> */}

              <Image
                src="/images/thumbnail.jpg"
                width={250}
                height={100}
                alt="thumbnail"
              ></Image>
              <p>{item.description}</p>
              <div className="flex flex-col justify-around space-y-2">
                <ButtonCustom
                  content={'Backtesting Now'}
                  type={4}
                  onClick={null}
                ></ButtonCustom>

                <ButtonCustom
                  content={'Trading Now'}
                  type={3}
                  onClick={null}
                ></ButtonCustom>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MarketPlacePage;
