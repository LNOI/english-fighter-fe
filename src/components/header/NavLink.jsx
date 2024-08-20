import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { Link } from '@/navigation';
import Image from 'next/image';
const NavLinkData = [
  {
    name: 'Products',
    href: '#',
    subNav: [
      {
        name: 'Marketplace',
        href: '/marketplace',
        icon: '/icon/unity.svg'
      },
      {
        name: 'Bot Signal',
        href: '/bot-signal',
        icon: '/icon/unity.svg'
      },
      {
        name: 'Backtesting',
        href: '#',
        icon: '/icon/unity.svg'
      },
    ]
  },
  {
    name: 'Market News',
    href: '/blog',
    subNav: [
    ]
  },
  {
    name: 'Subscription',
    href: '/subscription',
    subNav: [
      {
        name: 'Plans',
        href: '#',
        icon: '/icon/unity.svg'
      },
      {
        name: 'FAQ',
        href: '/faq',
        icon: '/icon/unity.svg'
      }
    ]
  }
];

const NavLink = () => {
  return (
    <div className="flex flex-col md:flex-row  justify-center items-center  md:gap-8">
      {
        NavLinkData.map((item, index) => {
          return <Popover key={index}>
            <PopoverButton className="block text-sm/6 font-semibold py-1 px-2 rounded-md dark:text-white dark:focus:outline-none dark:data-[hover]:text-black dark:data-[hover]:bg-white dark:data-[focus]:outline-1  dark:data-[focus]:outline-white dark:data-[focus]:bg-white dark:data-[active]:bg-white dark:data-[focus]:text-black dark:data-[active]:text-black">
              <Link href={item.href}> {item.name}</Link>
            </PopoverButton>
            <PopoverPanel
              transition
              anchor="bottom"
              className="bg-dark dark:bg-[rgba(255,255,255)] text-white dark:text-dark divide-y divide-white/5 rounded-xl text-sm/6 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0 z-[100] mt-4"
            >
              <div className="py-3">
                {
                  item.subNav.length > 0 && item.subNav.map((subItem, subIndex) => {
                    return <Link className='flex flex-row items-center rounded-lg px-3 py-2 transition hover:border-b-2' key={subIndex} href={subItem.href}>
                      {/* <Image src={subItem.icon} className='' alt='icon' width={24} height={24} color='white'></Image> */}
                      <p className="font-semibold ml-2 ">{subItem.name}</p>
                    </Link>
                  })
                }
              </div>
            </PopoverPanel>
          </Popover>
        })
      }
    </div>
  );
};

export default NavLink;
