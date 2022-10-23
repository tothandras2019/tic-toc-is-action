import './table-component.css'
import { useEffect, useState, useContext } from 'react'
import { OpponentContexts, ActualTurnContext, TableSizeContext } from '../contexts/opoinment-contexts'

import { Field } from '../field/field-component'
import { WinnerHelper } from '../../configs/config'

export const Table = ({}) => {
  const burnedTableSize = 3
  const [helper, setHelper] = useState('')

  const [table, setTable] = useState(null)
  const [style, setStyle] = useState({})
  const [isOpointment, setIsOpointment] = useState(true)

  const [fieldId, setFieldId] = useState([])
  const [tempFieldId, setTempFieldId] = useState([])

  const [redPartySteps, setRedPartySteps] = useState([])
  const [bluePartySteps, setBluePartySteps] = useState([])

  const { step, setStep } = useContext(OpponentContexts)
  const { turn, setTurn } = useContext(ActualTurnContext)
  const { size } = useContext(TableSizeContext)

  useEffect(() => {
    setHelper(WinnerHelper(size))

    return () => {}
  }, [size])

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
    const isBlueWon = CheckSteps(bluePartySteps, helper)
    console.log('Blue WON', isBlueWon)

    return () => {}
  }, [bluePartySteps])

  useEffect(() => {
    setStep((prev) => ({ ...prev, red: redPartySteps }))
    const isRedWon = CheckSteps(redPartySteps, helper)
    console.log('Red Won', isRedWon)
    return () => {}
  }, [redPartySteps])

  const handleFieldClick = (event) => {
    const row = parseInt(event.target.dataset.row)
    const column = parseInt(event.target.dataset.column)

    setFieldId(() => [row, column])
  }

  return (
    <div className='table-container' style={style}>
      {table?.map((tableField, i) => (
        <Field key={i} tableField={tableField} handleFieldClick={handleFieldClick} />
      ))}
    </div>
  )
}

const CheckSteps = (fields, help) => {
  if (!help) return

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

    let str = ``
    let tmpStr = ''
    str = sorted.map(([r, c]) => `${r}-${c}`).join('')
    tmpStr = sorted.map(([r, c]) => `${r}-${c}`).join(',')
    console.log(tmpStr)
    const isContains = help.some((lane) => lane === str)

    console.log(help)
    console.log(str)

    return isContains
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

    let str = ``
    str = sorted.map(([r, c]) => `${r}-${c}`).join('')
    const isContains = help.some((lane) => lane === str)

    return isContains
  }
  const checkDiagonalLeftToRightButton = (fields) => {
    const sorted = fields.sort((a, b) => {
      if (a[0] < b[0] && a[1] < b[1]) return -1
      if (a[0] > b[0] && a[1] > b[1]) return 1
      return 0
    })

    let str = ``
    str = sorted.map(([r, c]) => `${r}-${c}`).join('')
    const isContains = help.some((lane) => lane === str)

    return isContains
  }
  const checkDiagonalRightToLeftButton = (fields) => {
    const sorted = fields.sort((a, b) => {
      if (a[0] < b[0] && a[1] > b[1]) return -1
      if (a[0] > b[0] && a[1] < b[1]) return 1
      return 0
    })

    let str = ``
    str = sorted.map(([r, c]) => `${r}-${c}`).join('')
    const isContains = help.some((lane) => lane === str)

    return isContains
  }

  const rowContains = checkRow(fields)
  const columnContains = checkColumn(fields)
  const leftToRightButtonContains = checkDiagonalLeftToRightButton(fields)
  const rigthToLeftButtonContains = checkDiagonalRightToLeftButton(fields)

  return rowContains || columnContains || leftToRightButtonContains || rigthToLeftButtonContains
}
