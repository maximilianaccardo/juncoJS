const GenericInput = ({
  handleInputChange,
  value,
  i,
  idPrefix
}) => {
  const handleFocus = e => e.target.select()

  return (
    <span>
      <label>{i}  </label>
      <input
        type="number"
        id={`${idPrefix}_${i}`}
        data-i={i}
        onChange={handleInputChange}
        value={value}
        onFocus={handleFocus}
        className="genericInput"
      >
      </input>
  </span>
  )
}

export {
  GenericInput
}