export function Notificationscard(props) {
    return (
        <div className="notificationscard">
            <div className="box-border w-[64rem] h-[18.75rem] mt-5 border border-[#D9D9D9] shadow-lg rounded-md ml-5 hide-scrollbar overflow-hidden hover:overflow-y-scroll">
                <h1 className="ml-5 py-3 font-semibold">Powiadomienia</h1>
                <div className="h-px w-full border border-[#D9D9D9]"></div>
                {props.children}
            </div>
        </div>
    )
}