import Image from "next/image"
const collections = [
    "/brand/Binance_logo.svg",
    "/brand/bybit_logo.svg",
    "/brand/OKX_logo.svg"
]
export default function BannerBrand() {
  return (
    <div className="w-full text-center bg-white text-gray-900 dark:text-black">
        <p className="font-bold uppercase text-xl md:text-2xl ">Support Many Exchanges</p>
        <div className="flex flex-row w-full justify-center items-center space-x-4">
            {
                collections.map((item, index)=>{
                    return <Image src={item} key={index} width={100} height={20}></Image>
                })
            }
        </div>
    </div>
)
}
