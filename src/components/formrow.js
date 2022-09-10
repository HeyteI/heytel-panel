export function FormRow(props) {
    let isDisabled = ""
    let s = ""
    let cursor = ""
    let textColor = "text-gray-900"

    let type = props.type


    // TODO: fix this code because its terrible
    if (props.type === "disabled") {
        isDisabled = "disabled"
        cursor = "cursor-not-allowed"
        textColor = "text-gray-400"
    }
    if (props.type === "hour") {
        s = <span className="text-slate-400">h</span>
        type = "number"
    }
    if (props.type === "price") {
        s = <span className="text-slate-400">PLN</span>
    }
    if (props.type === "percentage") {
        s = <span className="text-slate-400">%</span>
    }
    if (props.type === "price-percentage") {
        s = <span className="text-slate-400">%/PLN</span>
    }

    let text = props.value

    return (
        <div className="relative z-0 mb-5 w-full group">
            <label for={props.title} className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-violet-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">{props.title} {s}</label>
            <input type={type} name={props.name} id={props.title} onChange={props.handleChange} defaultValue={text} disabled={isDisabled} placeholder={props.placeholder} className={`${cursor} block py-2.5 px-0 w-11/12 text-sm ${textColor} bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer`} required />
        </div>
    )
}