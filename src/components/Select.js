const Select = ({ label, name, options, handleOnChange, enabledKey, optionsState }) => {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <select name={name} onChange={handleOnChange} value={optionsState}>
        {options.map(opt => {
          const enabled = enabledKey === undefined || !!opt[enabledKey];
          return <option key={name + opt.value} value={opt.value} disabled={!enabled}>{opt.text}</option>
        })}
      </select>
    </>
  )
}

export default Select