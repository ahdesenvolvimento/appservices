function Input({type, name, id, text, placeholder, handleOnChange, value, className}){
    return (
        <>
            <label htmlFor={name}>{text}</label>
            <input 
                id={id}
                name={name}
                type={type}
                placeholder={placeholder}
                onChange={handleOnChange}
                value={value}
                className={className}
            />
        </>
    )
}

export default Input