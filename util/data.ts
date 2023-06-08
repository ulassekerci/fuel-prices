import { OpetData, PriceData, LocationData } from './interfaces'

const getData = async (province: string, district: string) => {
  const opetData = await getOpetData(province)
  const aygazData = await getAygazData(province)

  const districtIndex = opetData.findIndex((item) => item.districtCode === district)
  const prices = {
    ecoforce: opetData[districtIndex].prices.filter((item) => item.productShortName === 'MT_ECO')[0],
    ultraforce: opetData[districtIndex].prices.filter((item) => item.productShortName === 'MT_ULT')[0],
    gasoline: opetData[districtIndex].prices.filter((item) => item.productShortName === 'KURS')[0],
  }

  const priceData = [
    { type: 'Motorin', name: 'Ecoforce', slug: 'ecoforce', price: prices.ecoforce.amount },
    { type: 'Motorin', name: 'Ultraforce', slug: 'ultraforce', price: prices.ultraforce.amount },
    { type: 'Benzin', name: 'Kurşunsuz 95', slug: 'gasoline', price: prices.gasoline.amount },
    { type: 'Otogaz', name: 'Aygaz Otogaz', slug: 'lpg', price: Number(aygazData.substring(1, 6)) },
  ]

  return {
    prices: priceData as PriceData[],
    locations: {
      provinces: await getProvinces(),
      districts: [
        ...opetData.map((item) => {
          return { name: item.districtName, code: item.districtCode }
        }),
      ],
    },
  }
}

const getProvinces = async () => {
  const opetRequest = await fetch('https://api.opet.com.tr/api/fuelprices/provinces')
  return (await opetRequest.json()) as LocationData[]
}

const getOpetData = async (province: string) => {
  const opetRequest = await fetch('https://api.opet.com.tr/api/fuelprices/prices?ProvinceCode=' + province)
  return (await opetRequest.json()) as OpetData[]
}

const getAygazData = async (province: string) => {
  const aygazDateRequest = await fetch('https://kurumsal.aygaz.com.tr/otogaz/otogazapi.aspx/gecerlilikTarihleriGetir', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ il: province }),
  })
  const aygazDates = await aygazDateRequest.json()
  const latest = JSON.parse(aygazDates.d)[0]
  const aygazPriceRequest = await fetch('https://kurumsal.aygaz.com.tr/otogaz/otogazapi.aspx/fiyatGetir', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ il: province, tarih: latest }),
  })
  const aygazPrice = (await aygazPriceRequest.json()).d as string
  return aygazPrice
}

export default getData
export { getOpetData }
