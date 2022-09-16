import type { NextApiRequest, NextApiResponse } from 'next'
import { getOpetData } from '../../util/data'
import { LocationData } from '../../util/interfaces'

export default async function handler(req: NextApiRequest, res: NextApiResponse<LocationData[]>) {
  const { province } = req.query
  if (typeof province === 'string') {
    const opet = await getOpetData(province)
    const districts = [
      ...opet.map((item) => {
        return { name: item.districtName, code: item.districtCode }
      }),
    ]
    res.status(200).json(districts)
  } else {
    res.status(400).end()
  }
}
