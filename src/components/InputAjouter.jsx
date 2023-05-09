const InputAjouter = ({
  label,
  id,
  type,
  state,
  setState,
  textArea,
  placeholder,
}) => {
  return (
    <div className="form3">
      <label htmlFor={id}>{label}</label>
      {!textArea ? (
        <input
          placeholder={placeholder}
          id={id}
          type={type}
          value={state}
          onChange={(event) => {
            setState(event.target.value);
          }}
        />
      ) : (
        <textarea
          placeholder={placeholder}
          id={id}
          value={state}
          onChange={(event) => {
            setState(event.target.value);
          }}
        ></textarea>
      )}
    </div>
  );
};

export default InputAjouter;
