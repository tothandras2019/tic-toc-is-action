import './table-component.css'
import { useEffect, useState } from 'react'
import { fieldEnds } from 'tar'

export const Table = ({ size }) => {
  const [table, setTable] = useState(null)
  const [style, setStyle] = useState({})
  const [isOpointment, setIsOpointment] = useState(true)
  const [fieldId, setFieldId] = useState(null)

  useEffect(() => {
    if (!size) return
    const placeholder = []
    for (let i = 1; i <= size; i++) {
      for (let j = 1; j <= size; j++) placeholder.push({ index: `${i}-${j}`, val: '' })
    }

    setTable(() => placeholder)
    setStyle(() => ({ display: 'grid', gridTemplateColumns: `repeat(${size}, 70px)` }))

    return () => {}
  }, [size])

  useEffect(() => {
    // const findClickedField = table.map(({ index, val }) => {
    //   if (index === fieldID) {
    //     return (val = isOpointment ? '❌' : '🔵')
    //   }
    // })
    return () => {}
  }, [fieldId])

  const handleFieldClick = (event) => {
    console.log(event.target.id)
    const fieldID = event.target.id
    setFieldId(fieldID)
    // setIsOpointment(() => !isOpointment)
  }

  return (
    <div className='table-container' style={style}>
      {/* {table?.map((val, i) => (
        <div key={`${i}`} className={`table`}>
          <button id={`${i}`} onClick={handleFieldClick}>
            {isOpointment ? '❌' : '🔵'}
          </button>
        </div>
      ))} */}
    </div>
  )
}

// {
//   table?.map((_, i) => {
//     return table.map((_, j) => (
//       <div key={`${i}-${j}`} className={`table`}>
//         <button id={`${i}-${j}`} onClick={handleFieldClick}>
//           {isOpointment ? '❌' : '🔵'}
//         </button>
//       </div>
//     ))
//   })
// }
