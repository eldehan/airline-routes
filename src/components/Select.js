const Select = ({ label, name, options, handleOnChange, enabledKey, optionsState }) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <select name={name} onChange={handleOnChange} value={optionsState}>
        {options.map(opt => {
          const enabled = enabledKey === undefined || !!opt[enabledKey];
          console.log(opt)
          return <option key={name + opt.value} value={opt.value} disabled={!enabled}>{opt.text}</option>
        })}
      </select>
    </div>
  )
}

export default Select