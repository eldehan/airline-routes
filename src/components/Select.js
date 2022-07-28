const Select = ({ label, name, options, handleOnChange, optionsState }) => (
  <div>
    <label htmlFor={name}>{label}</label>
    <select name={name} onChange={handleOnChange} value={optionsState}>
      {options.map(opt => {
        return <option key={name + opt.value} value={opt.value}>{opt.text}</option>
      })}
    </select>
  </div>
)

export default Select