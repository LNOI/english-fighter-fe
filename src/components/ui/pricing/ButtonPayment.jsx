'use client'
import React,{useState,useEffect} from 'react'
import { useSession } from 'next-auth/react';
import { createCharge } from '@/app/actions/payment';
import Paypal from '@/components/ui/pricing/Paypal'
import { doLogout, doSocialLogin } from '@/app/actions';

function ButtonPayment({plan}) {
  const { data: session, status, update } = useSession();
  const [hostedUrl, setHostedUrl] = useState('');


  useEffect(() => {
    const fetchChargeData = async () => {
      console.log(plan)
      if(plan){
        const chargeData = await createCharge(plan);
        if (chargeData && chargeData.data && chargeData.data.hosted_url) {
          setHostedUrl(chargeData.data.hosted_url);
        }
      }
    };

    fetchChargeData();
  }, []);

  const handleClick = () => {
    console.log(handleClick)
    if (hostedUrl) {
      window.location.href = hostedUrl;
    }
  };

  return (
    <>
    {
      status !== 'authenticated' ? (
        <form action={doSocialLogin}>
     <button className="mt-5 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Login Now</button>
        </form>
   
      ):<div>
                <button disabled={!hostedUrl} onClick={handleClick} className="mt-5 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Pay with crypto</button>

                <Paypal></Paypal>                
                {/* <button  className="mt-5 block w-full rounded-md bg-red-400 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Paypal(Credit,Debit Card)</button> */}
               
      </div>
    }
    </>
    
   
  )
}

export default ButtonPayment