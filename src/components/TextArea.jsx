function TextArea({
    value,
    onChange,
    placeholder,
    rows = 6,
    id,
    className = '',
}) {
    return (
        <textarea
            id={id}
            className={`text-area ${className}`}
            rows={rows}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
        />
    )
}

export default TextArea