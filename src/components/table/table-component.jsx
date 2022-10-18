import './table-component.css'
import { useEffect, useState } from 'react'
import { Field } from '../field/field-component'

export const Table = ({ size }) => {
  const [table, setTable] = useState(null)
  const [style, setStyle] = useState({})
  const [isOpointment, setIsOpointment] = useState(true)
  const [fieldId, setFieldId] = useState(null)

  useEffect(() => {
    if (!size) return
    const placeholder = []
    for (let i = 1; i <= size; i++) {
      for (let j = 1; j <= size; j++) placeholder.push({ index: `${i}-${j}`, mark: '' })
    }

    setTable(() => placeholder)
    setStyle(() => ({ display: 'grid', gridTemplateColumns: `repeat(${size}, 60px)` }))

    return () => {}
  }, [size])

  useEffect(() => {
    setStyle(() => ({ display: 'grid', gridTemplateColumns: `repeat(${size}, 60px)`, backgroundColor: `${isOpointment ? '#0a1f40' : '#6a0606'}` }))
  }, [isOpointment])

  useEffect(() => {
    if (!fieldId) return
    const findClickedField = table.map((field) => {
      if (field.index === fieldId) {
        field.mark = isOpointment ? '🔵' : '❌'
        setIsOpointment(() => !isOpointment)
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
  }

  const checkRow = (fields) => {}
  const checkColumn = (fields) => {}
  const checkDiagonalLeftToRightButton = (fields) => {}
  const checkDiagonalRightToLeftButton = (fields) => {}

  return (
    <div className='table-container' style={style}>
      {table?.map((tableField, i) => (
        <Field key={i} tableField={tableField} handleFieldClick={handleFieldClick} />
      ))}
    </div>
  )
}
