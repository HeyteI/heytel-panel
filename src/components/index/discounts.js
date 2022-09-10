export function Discounts(props) {
    return (
        <div className="discounts">
            <div className="flex items-center">
                <div className="flex relative h-16 w-16 bg-white">
                    <div className={`absolute flex items-center justify-center top-3 left-0 h-12 w-12 bg-[#FF904F] text-white rounded-full ml-3`}>
                        {props.discount}%
                    </div>
                </div>
                <div className="flex">
                    <div className="flex mt-1 ml-3">
                        <p className="text-lg leading-6 font-thin text-center text-gray-500">{props.text}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}