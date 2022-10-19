export const WinnerHelper = (sameInALine) => {
  const markInAlineRowTest = [['1-12-13-14-1']]
  const RowHelper = getRowHelper(sameInALine)
  const ColumntHelper = getColumnHelper(sameInALine)
  const LeftToButtomRightHelper = getLeftToButtomRightHelper(sameInALine)
  const RightToButtomLeftHelper = getRightToLeftBottomHelper(sameInALine)

  //console.log(RightToButtomLeftHelper)
  return [...RowHelper, ...ColumntHelper, ...LeftToButtomRightHelper, ...RightToButtomLeftHelper]
}

function getRowHelper(sameInALine) {
  let markInALineRow = []
  for (let row = 1; row <= sameInALine; row++) {
    let nextColumnt = ''
    for (let column = 1; column <= sameInALine; column++) {
      nextColumnt += `${row}-${column}`
    }
    markInALineRow.push(nextColumnt)
  }

  return markInALineRow
}
function getColumnHelper(sameInALine) {
  let markInALineColumn = []
  for (let row = 1; row <= sameInALine; row++) {
    let nextRow = ''
    for (let column = 1; column <= sameInALine; column++) {
      nextRow += `${column}-${row}`
    }
    markInALineColumn.push(nextRow)
  }

  return markInALineColumn
}

function getLeftToButtomRightHelper(sameInALine) {
  let markInALineCenter = []

  //center left to right diagonal
  let nextRow = ''
  for (let num = 1; num <= sameInALine; num++) {
    nextRow += `${num}-${num}`
  }
  markInALineCenter.push(nextRow)

  //center left to right diagonal ++ rigth
  nextRow = ''
  for (let num = 1; num <= sameInALine; num++) {
    nextRow += `${num}-${num + 1}`
  }
  markInALineCenter.push(nextRow)

  //center left to right diagonal -- left
  nextRow = ''
  for (let num = 1; num <= sameInALine; num++) {
    nextRow += `${num + 1}-${num}`
  }
  markInALineCenter.push(nextRow)
  nextRow = ''

  return markInALineCenter
}
function getRightToLeftBottomHelper(sameInALine) {
  let markInALineCenter = []

  //center right to left diagonal
  let nextRow = ''
  let rowNum = 1
  for (let num = sameInALine; num >= 1; num--) {
    nextRow += `${rowNum}-${num}`
    rowNum++
  }
  markInALineCenter.push(nextRow)

  //center right to left diagonal ++ right
  nextRow = ''
  rowNum = 2
  for (let num = sameInALine; num >= 1; num--) {
    if (rowNum > sameInALine) continue
    nextRow += `${rowNum}-${num}`
    rowNum++
  }
  markInALineCenter.push(nextRow)

  //center right to left diagonal ++ left
  nextRow = ''
  rowNum = 1
  for (let num = sameInALine; num >= 1; num--) {
    if (rowNum > sameInALine - 1) continue
    nextRow += `${rowNum}-${num - 1}`
    rowNum++
  }
  markInALineCenter.push(nextRow)

  return markInALineCenter
}
