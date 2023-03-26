import { FC, useState, ChangeEvent } from 'react'
import { LocationData, Locations } from '../util/interfaces'

const LocationSelector: FC<{
  locationData: Locations
  updatePrices: (province: string, district: string) => Promise<void>
}> = ({ locationData, updatePrices }) => {
  const [province, setProvince] = useState('6')
  const [district, setDistrict] = useState('006019')

  const [districts, setDistricts] = useState(locationData.districts)

  const getDistricts = async (province: string) => {
    const req = await fetch(`/api/districts?province=${province}`)
    const districts = (await req.json()) as LocationData[]
    setDistricts(districts)
    updatePrices(province, districts[0].code)
  }

  const handleProvinceSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setProvince(e.target.value)
    getDistricts(e.target.value)
  }
  const handleDistrictSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setDistrict(e.target.value)
    updatePrices(province, e.target.value)
  }

  return (
    <div className='text-white bg-slate-800 h-[160px] lg:rounded-xl lg:mt-4 flex flex-col justify-start'>
      <span className='text-2xl font-semibold m-4 mt-6'>Konum</span>
      <div className='flex justify-around mt-2'>
        <select className='locationSelect' value={province} onChange={handleProvinceSelect}>
          {locationData.provinces.map((item) => (
            <option value={item.code} key={item.code} className='text-black'>
              {item.name}
            </option>
          ))}
        </select>

        <select className='locationSelect' value={district} onChange={handleDistrictSelect}>
          {districts.map((item) => (
            <option value={item.code} key={item.code} className='text-black'>
              {item.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default LocationSelector
