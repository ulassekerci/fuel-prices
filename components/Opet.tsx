import Image from 'next/image'
import { FC } from 'react'
import { PriceData } from '../util/interfaces'

const Opet: FC<{ priceData: PriceData[] }> = ({ priceData }) => {
  return (
    <div className='bg-sky-600 w-60 h-[600px] p-4 hidden lg:flex flex-col items-center rounded'>
      <div className='w-48 h-20 grid place-items-center'>
        <Image src='/opet.svg' width={192} height={60} alt='opet logo' />
      </div>
      <div className='w-36 h-16 grid place-items-center'>
        <Image src='/aygaz.svg' width={144} height={32} alt='aygaz logo' />
      </div>
      <div className='w-40 h-8 m-4 grid place-items-center bg-amber-600 rounded'>
        <span className='text-white italic text-lg font-semibold'>ultramarket</span>
      </div>

      <div className='w-40 p-2 text-white bg-black'>
        <div className='w-full h-full flex flex-col justify-center'>
          {priceData.map((item, index) => (
            <div key={item.name} className={index ? 'mt-4' : ''}>
              <div className='flex justify-between items-center'>
                <div>
                  <span>{item.type}</span>
                  <span className='block text-xs text-yellow-500'>{item.name}</span>
                </div>
                <span className='text-2xl font-price'>{item.price % 1 ? item.price : item.price + '.00'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='w-40 h-12 m-4 flex items-center bg-green-800'>
        <div className='ml-2 flex'>
          <Image src='/sbucks.svg' alt='aygaz logo' height={36} width={36} />
        </div>
        <div className='text-white w-full ml-3'>
          <span className='font-bold tracking-wider'>STARBUCKS</span>
          <span className='block italic -mt-1 mr-2 text-sm text-right leading-none'>on the go</span>
        </div>
      </div>
      <span className='text-white mt-5 text-lg font-semibold'>ulaş petrol</span>
    </div>
  )
}

export default Opet
