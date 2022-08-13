export function Roomscard(props) {
    return (
        <div className="roomscard">
            <div class="box-border h-[18vh] w-2/12 pt-30 border-2 rounded-md mt-2 mx-3">
                <div class="rounded-full bg-violet-700 w-[4vw] h-[8vh] mt-2 mx-3 text-white flex items-center justify-center text-2xl">{ props.number }</div>
            </div>
        </div>
    )
}