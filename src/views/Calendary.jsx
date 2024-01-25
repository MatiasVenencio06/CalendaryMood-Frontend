import React, {useCallback, useState} from 'react'
import Matrix from "../matrix"

function Calendary() {
  
  const initialMatrix = new Matrix({x: 12, y: 32}).solid().print()
  
  const [matrix, setMatrix] = useState(initialMatrix)
  
  function cantDays(year, month) {
    month--
    const monthDay = new Date(year, month + 1, 0)
    return monthDay.getDate()
  }
  const onClick = useCallback((indexX, indexY) => {
    const newMatrix = new Matrix().create(matrix).fill({x: indexX + 1, y: indexY + 1}, 1)
    const body = newMatrix.print()
    setMatrix(body)
  }, []) 

  console.log(matrix)

  const CalendaryCell = useCallback(({axisY, indexY}) => 
  axisY.map((axisX, indexX) => {
    if (indexY === 0) {
      return (<p key={`header-${indexX}`} className='w-9 h-9 border capitalize text-center flex items-center justify-center'>{new Date(2024, indexX + 1, 0).toLocaleDateString('ES-AR', { month: 'short' })}</p>)
    } else {
      return cantDays(2024, indexX + 1) >= indexY ? <p key={`cell-${indexX}-${indexY}`} onClick={() => onClick(indexX, indexY)} className='w-9 h-9 border'>{axisX}</p> : <p key={`empty-${indexX}-${indexY}`} className='w-9 h-9 border bg-slate-300'></p>
    }
  }), [matrix])

  const CalendaryMap = useCallback(() => 
  matrix.map((axisY, indexY) => {
    return ( 
      <div key={`row-${indexY}`} className='flex flex-row'>
        <p className='w-9 h-9 border text-center flex justify-center items-center'>{indexY}</p>
        <div className='flex flex-row'>
         <CalendaryCell axisY={axisY} indexY={indexY}/>
        </div>
      </div>
    )
  }), [matrix])

  return (
    <>
      <div className='flex flex-col'>
        <CalendaryMap/> 
      </div>
    </>
    )
  }

export default Calendary