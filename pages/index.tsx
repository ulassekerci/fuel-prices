import type { NextPage } from 'next'
import Opet from '../components/Opet'
import { Locations, PriceData } from '../util/interfaces'
import getData from '../util/data'
import Calculator from '../components/Calculator'
import LocationSelector from '../components/LocationSelector'
import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'

export const getServerSideProps = async () => {
  const { prices, locations } = await getData('6', '006019')
  return {
    props: { prices, locations },
  }
}

const Home: NextPage<{ prices: PriceData[]; locations: Locations }> = ({ prices, locations }) => {
  const [priceData, setPriceData] = useState(prices)

  const updatePrices = async (province: string, district: string) => {
    const req = await fetch(`/api/prices?province=${province}&district=${district}`)
    const prices = await req.json()
    setPriceData(prices)
  }

  return (
    <div className='max-w-5xl mx-auto lg:mt-4 flex flex-col lg:flex-row justify-around'>
      <Head>
        <title>Akaryakıt Ücretleri</title>
      </Head>
      <Opet priceData={priceData} />
      <div className='lg:w-1/2'>
        <Calculator priceData={priceData} />
        <LocationSelector locationData={locations} updatePrices={updatePrices} />
      </div>
      <a href='https://github.com/ulassekerci/fuel-prices' className='absolute right-4 bottom-4 hidden lg:inline'>
        <Image src='/github.png' width={32} height={32} />
      </a>
    </div>
  )
}

export default Home
