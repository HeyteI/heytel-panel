import { Roomscard } from "./roomscard"


export function Roomsbox(props) {
    return (
        <div className="Roomsbox">
            <div class="box-border h-64 w-11/12 pt-30 border-2 rounded-md mt-9 mx-16 text-left">
                <h1 class="p-2">{ props.title }</h1>
                <div class="h-px w-full border border-2 border-gray-400"></div>
                <Roomscard number="102"></Roomscard>
            </div>
        </div>
    )
}