const types = {
    "info": <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 28C13 28.7956 13.3161 29.5587 13.8787 30.1213C14.4413 30.6839 15.2044 31 16 31C16.7956 31 17.5587 30.6839 18.1213 30.1213C18.6839 29.5587 19 28.7956 19 28" stroke="#732DDD" strokeWidth="2" strokeMiterlimit="10" />
        <path d="M29 25C29 25 26 20 26 16V11C26 8.34784 24.9464 5.8043 23.0711 3.92893C21.1957 2.05357 18.6522 1 16 1C13.3478 1 10.8043 2.05357 8.92893 3.92893C7.05357 5.8043 6 8.34784 6 11V16C6 20 3 25 3 25H29Z" stroke="#732DDD" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" />
    </svg>,
    "alert": <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.248 27L14.2 3.07102C14.3765 2.74782 14.6368 2.47812 14.9535 2.29022C15.2703 2.10233 15.6317 2.00317 16 2.00317C16.3683 2.00317 16.7297 2.10233 17.0465 2.29022C17.3632 2.47812 17.6235 2.74782 17.8 3.07102L30.752 27C30.919 27.3107 31.0024 27.6594 30.9941 28.0121C30.9858 28.3647 30.886 28.7091 30.7045 29.0115C30.5231 29.314 30.2661 29.5641 29.9589 29.7374C29.6517 29.9107 29.3047 30.0012 28.952 30H3.05C2.69711 30.0015 2.34989 29.9113 2.04239 29.7381C1.73489 29.565 1.47768 29.3149 1.29597 29.0124C1.11426 28.7099 1.0143 28.3653 1.00589 28.0126C0.997479 27.6598 1.08091 27.3108 1.248 27V27Z" stroke="#FF0000" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" />
        <path d="M16 10V20" stroke="black" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" />
        <path d="M16 26C16.8284 26 17.5 25.3284 17.5 24.5C17.5 23.6716 16.8284 23 16 23C15.1716 23 14.5 23.6716 14.5 24.5C14.5 25.3284 15.1716 26 16 26Z" fill="black" />
    </svg>,
    "warning": <svg width="32" height="30" viewBox="0 0 32 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.248 26L14.2 2.07102C14.3765 1.74782 14.6368 1.47812 14.9535 1.29022C15.2703 1.10233 15.6317 1.00317 16 1.00317C16.3683 1.00317 16.7297 1.10233 17.0465 1.29022C17.3632 1.47812 17.6235 1.74782 17.8 2.07102L30.752 26C30.919 26.3107 31.0024 26.6594 30.9941 27.0121C30.9858 27.3647 30.886 27.7091 30.7045 28.0115C30.5231 28.314 30.2661 28.5641 29.9589 28.7374C29.6517 28.9107 29.3047 29.0012 28.952 29H3.05C2.69711 29.0015 2.34989 28.9113 2.04239 28.7381C1.73489 28.565 1.47768 28.3149 1.29597 28.0124C1.11426 27.7099 1.0143 27.3653 1.00589 27.0126C0.997479 26.6598 1.08091 26.3108 1.248 26V26Z" stroke="#F7BF26" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" />
        <path d="M16 9V19" stroke="black" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" />
        <path d="M16 25C16.8284 25 17.5 24.3284 17.5 23.5C17.5 22.6716 16.8284 22 16 22C15.1716 22 14.5 22.6716 14.5 23.5C14.5 24.3284 15.1716 25 16 25Z" fill="black" />
    </svg>,
}

function SkeletonLoadingNotification() {
    return (
        <div className="notifications">
            <div className="flex flex-row items-center ml-3 my-1.5 animate-pulse">
                <div className="float-left">
                    <div className="flex items-center">
                        <div className="flex relative h-9 w-9 bg-white">
                            <div className="absolute flex items-center justify-center h-9 w-9 bg-slate-200 rounded-full"></div>
                        </div>
                    </div>
                </div>
                <h1 className="ml-5 text-center font-thin py-3">
                    <div className="h-2.5 w-[56rem] bg-slate-200 rounded"></div>
                </h1>
            </div>
            <div className="h-px w-full border border-[#D9D9D9]"></div>
        </div>
    )
}

export function Notifications(props) {
    return (
        <>
            {props.loading ? <SkeletonLoadingNotification />
                : <div className="notifications">
                    <div className="flex">
                        <h1 className="flex mt-2 ml-2">{types[props.type]}</h1>
                        <h1 className="ml-2 py-3 font-thin flex">{props.text}</h1>
                    </div>
                    <div className="h-px w-full border border-[#D9D9D9]"></div>
                </div>
            }
        </>
    )
}