import type { NextApiRequest, NextApiResponse } from 'next'
import getData from '../../util/data'
import { PriceData } from '../../util/interfaces'

export default async function handler(req: NextApiRequest, res: NextApiResponse<PriceData[]>) {
  const { province, district } = req.query
  if (typeof province === 'string' && typeof district === 'string') {
    const { prices } = await getData(province, district)
    res.status(200).json(prices)
  } else {
    res.status(400).end()
  }
}
