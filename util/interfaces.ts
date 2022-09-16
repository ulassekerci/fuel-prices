export interface OpetData {
  provinceCode: number
  provinceName: string
  districtCode: string
  districtName: string
  prices: OpetPrice[]
}

interface OpetPrice {
  id: string
  productName: string
  productShortName: 'KURS' | 'MT_ULT' | 'MT_ECO'
  amount: number
  productCode: string
}

export interface PriceData {
  type: string
  name: string
  slug: string
  price: number
}

export interface LocationData {
  name: string
  code: string
}

export interface Locations {
  provinces: LocationData[]
  districts: LocationData[]
}
