import './table-component.css'
import { useEffect, useState } from 'react'

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
    if (!fieldId) return
    const findClickedField = table.map((field) => {
      if (field.index === fieldId) {
        field.val = isOpointment ? '❌' : '🔵'
        return field
      }
      return field
    })
    setTable(() => findClickedField)
    return () => {}
  }, [fieldId])

  const handleFieldClick = (event) => {
    const fieldID = event.target.id
    setFieldId(fieldID)
    setIsOpointment(() => !isOpointment)
  }

  return (
    <div className='table-container' style={style}>
      {table?.map((tableField, i) => (
        <div key={`${i}`} className={`table`}>
          <button id={`${tableField.index}`} onClick={handleFieldClick}>
            {tableField.val}
          </button>
        </div>
      ))}
    </div>
  )
}
