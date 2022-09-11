export function Closestcheckinscard(props) {
    return (
        <div className="closestcheckinscard flex ">
            <div className="box-border w-80 h-[18.75rem] mt-5 ml-36 border border-[#D9D9D9] shadow-lg rounded-md hide-scrollbar overflow-hidden hover:overflow-y-scroll">
                <h1 className="ml-5 font-semibold py-3">Najbliższe zameldowania</h1>
                <div className="h-px w-full border border-[#D9D9D9]"></div>
                {props.children}
            </div>
        </div>
    )
}