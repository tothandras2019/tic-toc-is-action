import './field-component.css'

export const Field = ({ tableField, handleFieldClick }) => {
  const { index, mark } = tableField

  return (
    <div className={`table`}>
      <button className={mark ? 'appear' : ''} id={`${index}`} onClick={handleFieldClick}>
        <p>{mark}</p>
      </button>
    </div>
  )
}
