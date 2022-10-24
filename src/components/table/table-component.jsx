import './table-component.css'
import { useEffect, useState, useContext } from 'react'
import { OpponentContexts, ActualTurnContext, TableSizeContext, WinnerContext, SameInALineContext } from '../contexts/opoinment-contexts'

import { Field } from '../field/field-component'
import { WinnerHelper, WinnerHelper_temp } from '../../configs/config'
import { SignalCellularNullSharp } from '@mui/icons-material'

export const Table = ({}) => {
  const burnedTableSize = 3

  const [helper, setHelper] = useState('')
  const [helperTemp, setHelperTemp] = useState('')

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
  const { winner, setWinner } = useContext(WinnerContext)
  const { sameInALine } = useContext(SameInALineContext)

  useEffect(() => {
    setHelper(WinnerHelper(size))
    // setHelperTemp(WinnerHelper_temp(size))

    return () => {}
  }, [size])

  useEffect(() => {
    if (!size) return
    const placeholder = []
    for (let i = 1; i <= size; i++) {
      for (let j = 1; j <= size; j++) placeholder.push({ index: [i, j], mark: '' })
    }

    setTable(() => placeholder)
    setStyle(() => ({ display: 'grid', gridTemplateColumns: `repeat(${size}, 40px)` }))

    return () => {}
  }, [size])

  useEffect(() => {
    setStyle(() => ({ display: 'grid', gridTemplateColumns: `repeat(${size}, 40px)`, backgroundColor: `${isOpointment ? '#0a1f40' : '#6a0606'}` }))
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
    const isBlueWon = CheckSteps(bluePartySteps, helper, sameInALine)
    setWinner((prev) => ({ ...prev, blue: isBlueWon }))

    return () => {}
  }, [bluePartySteps])

  useEffect(() => {
    setStep((prev) => ({ ...prev, red: redPartySteps }))
    const isRedWon = CheckSteps(redPartySteps, helper, sameInALine)
    setWinner((prev) => ({ ...prev, red: isRedWon }))

    return () => {}
  }, [redPartySteps])

  useEffect(() => {
    if (!winner) return
    if (winner.red) console.log(winner)
    if (winner.blue) console.log(winner)

    return () => {}
  }, [winner])

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

const CheckSteps_temp = (fields, help) => {
  if (!help) return
  const sameMarkInALane = 3

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
    str = sorted.map(([r, c]) => `${r}-${c}`).join('')
    // const isContains = help.some((lane) => lane === str)

    let isContains = null
    const len = sorted.length
    const final = len - sameMarkInALane
    // console.log(help, sorted)
    let lanes = []

    // console.log(sorted)
    for (let start = 0; start < final; start++) {
      const end = start + sameMarkInALane
      let laneSteps = []
      for (let val = start; val < end; val++) {
        laneSteps.push(`${sorted[val][0]}-${sorted[val][1]}`)
      }
      // console.log(laneSteps.join(''))
      isContains = help.some((lanes) => lanes.includes(laneSteps))
      if (isContains) break
    }

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

const CheckSteps = (initField, help, sameMarkInALane) => {
  if (!help) return

  console.log(sameMarkInALane)

  const CheckLanesIncludes = (sorted) => {
    let isContains = false
    const len = sorted.length
    const final = len - sameMarkInALane
    let lanes = []

    for (let start = 0; start <= final; start++) {
      const end = start + sameMarkInALane
      let laneSteps = []
      for (let val = start; val < end; val++) {
        laneSteps.push(`${sorted[val][0]}-${sorted[val][1]}`)
      }
      const laneStr = laneSteps.join('')
      isContains = help.some((lanes) => lanes.includes(laneStr))
      if (isContains) break
    }

    console.log(isContains)
    return isContains
  }

  const checkRow = (fields) => {
    const copyFields = [...fields]
    const sortedRO = copyFields.sort((a, b) => {
      if (a[0] < b[0]) return -1
      if (a[0] > b[0]) return 1
      if ((a[0] = b[0])) {
        if (a[1] < b[1]) return -1
        if (a[1] > b[1]) return 1
      }
      return 0
    })

    return CheckLanesIncludes(sortedRO)
  }

  const checkColumn = (fields) => {
    const copyFields = [...fields]
    const sortedCL = copyFields.sort((a, b) => {
      if (a[1] < b[1]) return -1
      if (a[1] > b[1]) return 1
      if ((a[1] = b[1])) {
        if (a[0] < b[0]) return -1
        if (a[0] > b[0]) return 1
      }
      return 0
    })

    // console.log('Column', sortedCL)

    return CheckLanesIncludes(sortedCL)
  }
  const checkDiagonalLeftToRightButton = (fields) => {
    const copyFields = [...fields]
    const sortedDLR = copyFields.sort((a, b) => {
      if (a[0] < b[0] && a[1] < b[1]) return -1
      if (a[0] > b[0] && a[1] > b[1]) return 1
      if (a[0] === b[0] && a[1] < b[1]) return -1
      if (a[0] === b[0] && a[1] > b[1]) return 1
      return 0
    })
    // const sortedDLR = copyFields.sort((a, b) => {
    //   if (a[0] < b[0] && a[1] < b[1]) return -1
    //   if (a[0] > b[0] && a[1] > b[1]) return 1
    //   return 0
    // })

    //console.log('DiagonalLeftToRight', sortedDLR)

    return CheckLanesIncludes(sortedDLR)
  }
  const checkDiagonalRightToLeftButton = (fields) => {
    const copyFields = [...fields]
    // const sortedDRL = copyFields.sort((a, b) => {
    //   if (a[0] < b[0] && a[1] > b[1]) return -1
    //   if (a[0] > b[0] && a[1] < b[1]) return 1
    //   return 0
    // })
    const sortedDRL = copyFields.sort((a, b) => {
      if (a[0] < b[0] && a[1] > b[1]) return -1
      if (a[0] > b[0] && a[1] < b[1]) return 1
      return 0
    })

    //console.log('DiagonalRightToLeft', sortedDRL)

    return CheckLanesIncludes(sortedDRL)
  }

  const rowContains = checkRow([...initField])
  const columnContains = checkColumn([...initField])
  // const leftToRightButtonContains = checkDiagonalLeftToRightButton([...initField])
  // const rigthToLeftButtonContains = checkDiagonalRightToLeftButton([...initField])

  return rowContains || columnContains
  // return rowContains || columnContains || leftToRightButtonContains || rigthToLeftButtonContains
}
