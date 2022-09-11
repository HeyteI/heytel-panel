const icons = {
    "guests": <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 17.3334C20.4 17.3334 17.9067 17.7867 16 18.6667C14.0934 17.7734 11.6 17.3334 10 17.3334C7.10671 17.3334 1.33337 18.7734 1.33337 21.6667V25.3334H30.6667V21.6667C30.6667 18.7734 24.8934 17.3334 22 17.3334ZM16.6667 23.3334H3.33337V21.6667C3.33337 20.9467 6.74671 19.3334 10 19.3334C13.2534 19.3334 16.6667 20.9467 16.6667 21.6667V23.3334ZM28.6667 23.3334H18.6667V21.6667C18.6667 21.0534 18.4 20.52 17.9734 20.04C19.1467 19.64 20.5867 19.3334 22 19.3334C25.2534 19.3334 28.6667 20.9467 28.6667 21.6667V23.3334ZM10 16C12.5734 16 14.6667 13.9067 14.6667 11.3334C14.6667 8.76002 12.5734 6.66669 10 6.66669C7.42671 6.66669 5.33337 8.76002 5.33337 11.3334C5.33337 13.9067 7.42671 16 10 16ZM10 8.66669C11.4667 8.66669 12.6667 9.86669 12.6667 11.3334C12.6667 12.8 11.4667 14 10 14C8.53337 14 7.33337 12.8 7.33337 11.3334C7.33337 9.86669 8.53337 8.66669 10 8.66669ZM22 16C24.5734 16 26.6667 13.9067 26.6667 11.3334C26.6667 8.76002 24.5734 6.66669 22 6.66669C19.4267 6.66669 17.3334 8.76002 17.3334 11.3334C17.3334 13.9067 19.4267 16 22 16ZM22 8.66669C23.4667 8.66669 24.6667 9.86669 24.6667 11.3334C24.6667 12.8 23.4667 14 22 14C20.5334 14 19.3334 12.8 19.3334 11.3334C19.3334 9.86669 20.5334 8.66669 22 8.66669Z" fill="#7B49EA" />
    </svg>,
    "checkins": <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 18L8 24L24 4" stroke="#46B5FD" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" />
        <path d="M30.6667 9.33331H28" stroke="#46B5FD" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" />
        <path d="M30.6666 15.3333H23.3333" stroke="#46B5FD" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" />
        <path d="M30.6667 21.3333H18.6667" stroke="#46B5FD" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" />
        <path d="M30.6667 27.3333H14" stroke="#46B5FD" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" />
    </svg>,
    "restaurant": <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.6667 12H12V2.66669H9.33333V12H6.66667V2.66669H4V12C4 14.8267 6.21333 17.12 9 17.2934V29.3334H12.3333V17.2934C15.12 17.12 17.3333 14.8267 17.3333 12V2.66669H14.6667V12ZM21.3333 8.00002V18.6667H24.6667V29.3334H28V2.66669C24.32 2.66669 21.3333 5.65335 21.3333 8.00002Z" fill="#FF8B4B" />
    </svg>,
    "clock": <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 1.33331V6.66665" stroke="black" strokeWidth="2" strokeMiterlimit="10" />
        <path d="M30.6667 16H25.3333" stroke="black" strokeWidth="2" strokeMiterlimit="10" />
        <path d="M16 30.6666V25.3333" stroke="black" strokeWidth="2" strokeMiterlimit="10" />
        <path d="M1.33333 16H6.66666" stroke="black" strokeWidth="2" strokeMiterlimit="10" />
        <path d="M16 30.6666C24.1002 30.6666 30.6667 24.1002 30.6667 16C30.6667 7.8998 24.1002 1.33331 16 1.33331C7.89982 1.33331 1.33333 7.8998 1.33333 16C1.33333 24.1002 7.89982 30.6666 16 30.6666Z" stroke="black" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" />
        <path d="M10.6667 8L16 16H21.3333" stroke="black" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" />
    </svg>
}

const colors = {
    "guests": "bg-[#CDB7FB]",
    "checkins": "bg-[#EDFAFF]",
    "restaurant": "bg-[#FEBE98]",
    "clock": "bg-[#D9D9D9]"
}


export function SkeletonLoadingCard() {
    return (
        <div className="card">
            <div className="box-border w-[20.313rem] h-40 mt-5 ml-4 border border-[#D9D9D9] shadow-lg rounded-md">
                <div className="animate-pulse flex items-center">
                    <div className="flex relative h-24 w-24 bg-white">
                        <div className="absolute flex items-center justify-center top-10 left-0 h-16 w-16 bg-slate-200 rounded-full ml-3"></div>
                    </div>
                    <div className="flex">
                        <div className="flex flex-col mt-10 ml-3">
                            <div className="space-y-3">
                                <div className="h-2 w-7 bg-slate-200 rounded col-span-2"></div>
                                <div className="h-2 w-20 bg-slate-200 rounded col-span-1"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function Card(props) {
    return (
        <>
            {props.loading
                ? <><SkeletonLoadingCard /></>
                : <>
                    <div className="card">
                        <div className="box-border w-[20.313rem] h-40 mt-5 ml-4 border border-[#D9D9D9] shadow-lg rounded-md">
                            <div className="flex items-center">
                                <div className="flex relative h-24 w-24 bg-white">
                                    <div className={`absolute flex items-center justify-center top-10 left-0 h-16 w-16 ${colors[props.color]} rounded-full ml-3`}>
                                        {icons[props.icon]}
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="flex flex-col mt-10 ml-5">
                                        <p className="text-2xl leading-6 font-medium">{props.info}</p>
                                        <p className="text-lg leading-4 font-thin text-gray-500 mt-1">{props.text}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}