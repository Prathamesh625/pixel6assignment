

export default function InputComponent(props) {

    const { name, placeholder, value, onchange } = props
    
    return <input
        name={name}
        placeholder={placeholder}
        value={value}
        onchange={onchange}
    />
}