function SkeletonLoadingDiscounts() {
    return (
        <div className="closestcheckins">
            <div className="flex flex-row items-center ml-3 my-1.5 animate-pulse">
                <div className="float-left">
                    <div className="flex items-center">
                        <div className="flex relative h-16 w-16 bg-white">
                            <div className="absolute flex items-center justify-center h-16 w-16 bg-slate-200 rounded-full"></div>
                        </div>
                    </div>
                </div>
                <h1 className="ml-5 text-center font-thin py-3">
                    <div className="h-2.5 w-52 bg-slate-200 rounded"></div>
                </h1>
            </div>
            <div className="h-px w-full border border-[#D9D9D9]"></div>
        </div>
    )
}

export function Discounts(props) {
    return (
        <>
            {props.loading ? <SkeletonLoadingDiscounts></SkeletonLoadingDiscounts>
                : <div className="discounts">
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
            }
        </>
    )
}