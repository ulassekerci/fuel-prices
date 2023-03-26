import { FC, useEffect, useState } from 'react'
import { PriceData } from '../util/interfaces'

const Calculator: FC<{ priceData: PriceData[] }> = ({ priceData }) => {
  const [liter, setLiter] = useState(0)
  const [cost, setCost] = useState(0)
  const [input, setInput] = useState<'liter' | 'cost'>('liter')
  const [selectedFuel, setSelectedFuel] = useState('ecoforce')

  const handleKeypad = (key: number | 'del') => {
    if (key === 'del') {
      input === 'liter' ? setLiter(Math.floor(liter / 10)) : setCost(Math.floor(cost / 10))
    } else {
      if (input === 'liter' && liter <= 99) {
        setLiter(liter * 10 + key)
      }
      if (input === 'cost' && cost <= 9999) {
        setCost(cost * 10 + key)
      }
    }
  }

  const handleTabs = () => {
    input === 'liter' ? setInput('cost') : setInput('liter')
  }

  const updatePrice = () => {
    const fuelIndex = priceData.findIndex((item) => item.slug === selectedFuel)
    setCost(priceData[fuelIndex].price * liter)
  }
  const updateLiter = () => {
    const fuelIndex = priceData.findIndex((item) => item.slug === selectedFuel)
    setLiter(cost / priceData[fuelIndex].price)
  }

  useEffect(() => {
    input === 'liter' ? updatePrice() : updateLiter()
  }, [selectedFuel, liter, cost, priceData])

  return (
    <div className='text-white bg-slate-800 lg:h-[420px] pb-4 lg:rounded-xl'>
      <div className='grid place-items-center'>
        <div className='flex justify-center relative w-64 lg:w-full'>
          <div className='bg-blue-900 flex flex-col text-right mt-6 px-2 w-56 lg:w-96'>
            <span className='font-price text-6xl lg:text-8xl'>{(Math.round(cost * 100) / 100).toFixed(2)}</span>
            <span className='font-price text-4xl lg:text-6xl mr-2'>{(Math.round(liter * 100) / 100).toFixed(2)}</span>
          </div>
          <span className='absolute -right-2 lg:right-10 top-14 lg:top-20'>TL</span>
          <span className='absolute -right-5 lg:right-6 bottom-0 lg:bottom-2'>Litre</span>
        </div>
      </div>

      <div className='lg:w-96 flex flex-col lg:flex-row items-center justify-between mt-4 lg:m-auto mx-auto'>
        <div>
          <span>Yakıt Tipi</span>
          {priceData.map((item) => {
            return (
              <div
                key={item.name}
                onClick={() => {
                  setSelectedFuel(item.slug)
                }}
                className={selectedFuel === item.slug ? 'fuel bg-sky-600' : 'fuel hover:bg-slate-600'}
              >
                {item.name}
              </div>
            )
          })}
        </div>
        <div className='select-none mt-6'>
          <div className='flex justify-around mb-4'>
            <span
              className={input === 'liter' ? 'litercost' : 'opacity-50 hover:opacity-90 cursor-pointer'}
              onClick={handleTabs}
            >
              Litre
            </span>
            <span
              className={input === 'cost' ? 'litercost' : 'opacity-50  hover:opacity-90 cursor-pointer'}
              onClick={handleTabs}
            >
              Ücret
            </span>
          </div>
          <div>
            {Array.from(Array(10).keys()).map((item) => {
              return (
                <div className='inline' key={item}>
                  {item !== 0 && (
                    <span
                      className='text-4xl m-3 font-mono cursor-pointer'
                      onClick={() => {
                        handleKeypad(item)
                      }}
                    >
                      {item}
                    </span>
                  )}
                  {item !== 0 && item % 3 === 0 && <br />}
                </div>
              )
            })}
            <span
              className='text-4xl font-mono ml-14 cursor-pointer'
              onClick={() => {
                handleKeypad(0)
              }}
            >
              0
            </span>
            <span
              className='text-4xl ml-5 cursor-pointer'
              onClick={() => {
                handleKeypad('del')
              }}
            >
              ←
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Calculator
