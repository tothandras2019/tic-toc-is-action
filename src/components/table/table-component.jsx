import './table-component.css'
import { useEffect, useState, useContext } from 'react'
import {
  OpponentContexts,
  ActualTurnContext,
  TableSizeContext,
  WinnerContext,
  SameInALineContext,
  ResetContext,
  HelperContext,
} from '../contexts/opoinment-contexts'
import { WinnerHelper } from './../../configs/config.jsx'
import { Field } from '../field/field-component'
import { SignalCellularNullSharp } from '@mui/icons-material'

export const Table = () => {
  // const [helper, setHelper] = useState('')

  const [table, setTable] = useState(null)
  const [style, setStyle] = useState({})
  const [isOpointment, setIsOpointment] = useState(true)

  const [fieldId, setFieldId] = useState([])

  const [redPartySteps, setRedPartySteps] = useState([])
  const [bluePartySteps, setBluePartySteps] = useState([])

  const { step, setStep } = useContext(OpponentContexts)
  const { turn, setTurn } = useContext(ActualTurnContext)
  const { size } = useContext(TableSizeContext)
  const { winner, setWinner } = useContext(WinnerContext)
  const { sameInALine } = useContext(SameInALineContext)
  const { helper, setHelper } = useContext(HelperContext)

  useEffect(() => {
    if (!size) return

    let LToRB_Index = null
    let RToLB_Index = null
    setHelper(WinnerHelper(size))
    setRedPartySteps([])
    setBluePartySteps([])

    const placeholder = []
    const leftToRightBottomIndex_10X10 = [
      [1, 11, 20, 28, 35, 41, 46, 50, 53, 55],
      [56, 2, 12, 21, 29, 36, 42, 47, 51, 54],
      [65, 57, 3, 13, 22, 30, 37, 43, 48, 52],
      [73, 66, 58, 4, 14, 23, 31, 38, 44, 49],
      [80, 74, 67, 59, 5, 15, 24, 32, 39, 45],
      [86, 81, 75, 68, 60, 6, 16, 25, 33, 40],
      [91, 87, 82, 76, 69, 61, 7, 17, 26, 34],
      [95, 92, 88, 83, 77, 70, 62, 8, 18, 27],
      [98, 96, 93, 89, 84, 78, 71, 63, 9, 19],
      [100, 99, 97, 94, 90, 85, 79, 72, 64, 10],
    ]
    const rightToLeftBottomIndex_10X10 = JSON.parse(JSON.stringify(leftToRightBottomIndex_10X10)).map((lane) => lane.reverse())
    const leftToRightBottomIndex_5X5 = [
      [1, 6, 110, 13, 15],
      [16, 2, 7, 11, 14],
      [20, 17, 3, 8, 12],
      [23, 21, 18, 4, 9],
      [25, 24, 22, 19, 5],
    ]

    const rightToLeftBottomIndex_5X5 = JSON.parse(JSON.stringify(leftToRightBottomIndex_5X5)).map((lane) => lane.reverse())

    const leftToRightBottomIndex_3X3 = [
      [1, 4, 6],
      [7, 2, 5],
      [9, 8, 3],
    ]
    const rightToLeftBottomIndex_3X3 = JSON.parse(JSON.stringify(leftToRightBottomIndex_3X3)).map((lane) => lane.reverse())

    if (size === 3) {
      LToRB_Index = leftToRightBottomIndex_3X3
      RToLB_Index = rightToLeftBottomIndex_3X3
    } else if (size === 5) {
      LToRB_Index = leftToRightBottomIndex_5X5
      RToLB_Index = rightToLeftBottomIndex_5X5
    } else {
      LToRB_Index = leftToRightBottomIndex_10X10
      RToLB_Index = rightToLeftBottomIndex_10X10
    }

    for (let i = 1; i <= size; i++) {
      for (let j = 1; j <= size; j++)
        placeholder.push({ diaRToL: RToLB_Index[i - 1][j - 1], diaLToR: LToRB_Index[i - 1][j - 1], index: [i, j], mark: '' })
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

  const handleFieldClick = (event) => {
    const row = parseInt(event.target.dataset.row)
    const column = parseInt(event.target.dataset.column)
    const diaLToR = parseInt(event.target.dataset.dialtor)
    const diaTToL = parseInt(event.target.dataset.diartol)

    setFieldId(() => [row, column, diaLToR, diaTToL])
  }

  return (
    <div className='table-container' style={style}>
      {table?.map((tableField, i) => (
        <Field key={i} tableField={tableField} handleFieldClick={handleFieldClick} />
      ))}
    </div>
  )
}

const CheckSteps = (initField, help, sameMarkInALane) => {
  if (!help) return

  const CheckLanesIncludes = (sorted) => {
    let isContains = false
    const len = sorted.length
    const final = len - sameMarkInALane

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

    return isContains
  }

  const DiagonalLaneChecker = (sortedDiagonal) => {}

  const checkRow = (fields) => {
    const copyFields = JSON.parse(JSON.stringify(fields))
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
    const copyFields = JSON.parse(JSON.stringify(fields))
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
    const copyFields = JSON.parse(JSON.stringify(fields))
    const sortedDLR = copyFields.sort((a, b) => {
      if (a[2] < b[2]) return -1
      if (a[2] > b[2]) return 1
      return 0
    })

    return DiagonalLaneChecker(sortedDLR)
  }

  const checkDiagonalRightToLeftButton = (fields) => {
    const copyFields = JSON.parse(JSON.stringify(fields))
    const sortedDRL = copyFields.sort((a, b) => {
      if (a[3] < b[3]) return -1
      if (a[3] > b[3]) return 1
      return 0
    })
    return DiagonalLaneChecker(sortedDRL)
  }

  const rowContains = checkRow(initField)
  const columnContains = checkColumn(initField)
  const leftToRightButtonContains = checkDiagonalLeftToRightButton(initField)
  const rigthToLeftButtonContains = checkDiagonalRightToLeftButton(initField)

  return rowContains || columnContains
  // return rowContains || columnContains || leftToRightButtonContains || rigthToLeftButtonContains
}
