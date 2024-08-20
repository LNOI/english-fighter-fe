import ButtonCustom from '../ButtonCustom';
import { Link } from '@/navigation';
import Image from 'next/image';
import { useAppSelector } from '@/lib/hook';
function Banner({ title, desc, btn_name, btn_href, type }) {
  const themeColor = useAppSelector((state) => state.themeColor)
  // console.log(themeColor.)
  return (
    <div
      className={`flex dark:text-white h-full w-full justify-center items-${type ? type : 'center'} my-4  flex-col md:flex-row`}
    >
      
      <div className="flex w-full md:w-2/4 flex-col items-center justify-center py-8 text-center space-y-4">
        <p className="text-balance text-[36px] md:text-[3rem] font-bold">{title}</p>
        <p className="line-clamp-3 dark:text-slate-200 text-balance md:text-base lg:w-4/5">
          {desc}
        </p>

        <div className="my-4 w-full md:w-1/6">
          <Link href={btn_href}>
            <ButtonCustom
              content={btn_name}
              type={3}
              onClick={null}
            ></ButtonCustom>
          </Link>
        </div>
        
      </div>
      <div className='flex w-full md:w-2/4 flex-col items-center justify-center py-8 text-center space-y-4'>
          {
            themeColor.is_dark ? <Image src="./gif/export_btc_dark.gif" width={0} height={0} alt='BTC_SMC GIF' className='w-auto h-auto' unoptimized={true}></Image> : 
            <Image src="./gif/export_btc_light.gif" width={0} height={0} alt='BTC_SMC GIF' className='w-auto h-auto' unoptimized={true}></Image>
          }
          
      </div>
    </div>
  );
}

export default Banner;
