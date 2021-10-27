function Select({name, id, text, handleOnChange, value, className, values}){
    return (
        <>
            <label htmlFor={name}>{text}</label>
            <select 
                id={id}
                name={name}
                onChange={handleOnChange}
                value={value}
                className={className}
            > 
            <option value="">Selecione a opção</option>
            <option value="Aberto">Aberto</option>
            <option value="Concluído">Concluído</option>
            <option value="Cancelado">Cancelado</option>
            </select>
        </>
    )
}

export default Select