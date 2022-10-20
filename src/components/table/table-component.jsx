import './table-component.css'
import { useEffect, useState, useContext } from 'react'
import { OpponentContexts, ActualTurnContext } from '../contexts/opoinment-contexts'

import { Field } from '../field/field-component'
import { WinnerHelper } from '../../configs/config'

export const Table = ({ size }) => {
  const WinnerHelpArray = WinnerHelper(4)

  const [table, setTable] = useState(null)
  const [style, setStyle] = useState({})
  const [isOpointment, setIsOpointment] = useState(true)
  const [fieldId, setFieldId] = useState([])
  const [redPartySteps, setRedPartySteps] = useState([])
  const [bluePartySteps, setBluePartySteps] = useState([])

  const { step, setStep } = useContext(OpponentContexts)
  const { turn, setTurn } = useContext(ActualTurnContext)

  // placeholder.push({ index: `${i}-${j}`, mark: '' })

  useEffect(() => {
    if (!size) return
    const placeholder = []
    for (let i = 1; i <= size; i++) {
      for (let j = 1; j <= size; j++) placeholder.push({ index: [i, j], mark: '' })
    }

    setTable(() => placeholder)
    setStyle(() => ({ display: 'grid', gridTemplateColumns: `repeat(${size}, 60px)` }))

    return () => {}
  }, [size])

  useEffect(() => {
    setStyle(() => ({ display: 'grid', gridTemplateColumns: `repeat(${size}, 60px)`, backgroundColor: `${isOpointment ? '#0a1f40' : '#6a0606'}` }))
  }, [isOpointment])

  useEffect(() => {
    if (fieldId.length === 0) return
    const findClickedField = table.map((fields) => {
      if (fields.index[0] === fieldId[0] && fields.index[1] === fieldId[1]) {
        fields.mark = isOpointment ? '🔵' : '❌'
        if (isOpointment) {
          setBluePartySteps((prevSteps) => [...prevSteps, fieldId])
          setTurn('red')
        } else {
          setRedPartySteps((prevSteps) => [...prevSteps, fieldId])
          setTurn('blue')
        }

        setIsOpointment(() => !isOpointment)
        return fields
      }
      return fields
    })
    setTable(() => findClickedField)
    return () => {}
  }, [fieldId])

  useEffect(() => {
    setStep((prev) => ({ ...prev, blue: bluePartySteps }))
    CheckSteps(bluePartySteps)

    return () => {}
  }, [bluePartySteps])

  useEffect(() => {
    setStep((prev) => ({ ...prev, red: redPartySteps }))
    return () => {}
  }, [redPartySteps])

  const handleFieldClick = (event) => {
    const row = parseInt(event.target.dataset.row)
    const column = parseInt(event.target.dataset.column)

    setFieldId(() => [row, column])
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

const CheckSteps = (fields) => {
  const checkRow = (fields) => {
    const sorted = fields.sort((a, b) => {
      if (a[0] < b[0]) return -1
      if (a[0] > b[0]) return 1
      if ((a[0] = b[0])) {
        if (a[1] < b[1]) return -1
        if (a[1] > b[1]) return 1
      }
      return 0
    })
  }
  const checkColumn = (fields) => {
    const sorted = fields.sort((a, b) => {
      if (a[1] < b[1]) return -1
      if (a[1] > b[1]) return 1
      if ((a[1] = b[1])) {
        if (a[0] < b[0]) return -1
        if (a[0] > b[0]) return 1
      }
      return 0
    })
  }
  const checkDiagonalLeftToRightButton = (fields) => {
    const sorted = fields.sort((a, b) => {
      if (a[0] < b[0] && a[1] < b[1]) return -1
      if (a[0] > b[0] && a[1] > b[1]) return 1
      return 0
    })
  }
  const checkDiagonalRightToLeftButton = (fields) => {
    const sorted = fields.sort((a, b) => {
      if (a[0] < b[0] && a[1] > b[1]) return -1
      if (a[0] > b[0] && a[1] < b[1]) return 1
      return 0
    })
  }

  checkRow(fields)
  checkColumn(fields)
  checkDiagonalLeftToRightButton(fields)
  checkDiagonalRightToLeftButton(fields)
}
