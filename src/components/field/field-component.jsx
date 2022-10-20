import './field-component.css'

export const Field = ({ tableField, handleFieldClick }) => {
  const { index, mark } = tableField
  const [row, column] = index

  return (
    <div className={`table`}>
      <button className={mark ? 'appear' : ''} data-row={row} data-column={column} onClick={handleFieldClick}>
        <p>{mark}</p>
      </button>
    </div>
  )
}
