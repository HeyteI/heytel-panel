import EditCardModal from "./invoicemodal"
import React, { useState } from "react"

var icons = {
    "true": <svg className="w-8 h-auto mt-5 flex" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>check</title><g fill="none" className="nc-icon-wrapper"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="#66CC44"></path></g></svg>,
    "false": <svg className="w-8 h-auto mt-5 flex" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 21.1667L7 23.1067L9 24.9401L25 8.94006L23.12 7.06006L9 21.1667Z" fill="#FF0000" /><path d="M9 21.1667L7 23.1067L9 24.9401L25 8.94006L23.12 7.06006L9 21.1667Z" fill="#FF0000" /><path d="M9 21.1667L7 23.1067L9 24.9401L25 8.94006L23.12 7.06006L9 21.1667Z" fill="#FF0000" /><path d="M9 21.1667L7 23.1067L9 24.9401L25 8.94006L23.12 7.06006L9 21.1667Z" fill="#FF0000" /><path d="M9 21.1667L7 23.1067L9 24.9401L25 8.94006L23.12 7.06006L9 21.1667Z" fill="#FF0000" /><path d="M9 21.1667L7 23.1067L9 24.9401L25 8.94006L23.12 7.06006L9 21.1667Z" fill="#FF0000" /><path d="M10.8333 9L8.89332 7L7.05995 9L23.0599 25L24.9399 23.12L10.8333 9Z" fill="#FF0000" /><path d="M10.8333 9L8.89332 7L7.05995 9L23.0599 25L24.9399 23.12L10.8333 9Z" fill="#FF0000" /><path d="M10.8333 9L8.89332 7L7.05995 9L23.0599 25L24.9399 23.12L10.8333 9Z" fill="#FF0000" /></svg>
}

export function RoomsCard(props) {
    const [isAvailable, setAvailable] = useState(props.available)
    return (
        <div>
            <div className="box-border h-44 w-64 pt-30 border-2 rounded-md mt-2 mx-3">
                <div className="flex flex-row">
                    <div className="bg-violet-700 text-white rounded-full flex items-center justify-center mt-2 mx-2 w-14 h-14 text-2xl">
                        {props.number}
                    </div>
                    <div>
                        {icons[isAvailable]}
                    </div>
                    <div className="flex ml-auto mr-3">
                        <EditCardModal roomTitle={props.title} number={props.number} id={props.id} setAvailable={setAvailable} available={props.available} />
                    </div>
                </div>
                <div className="flex justify-center mt-7 text-gray-400 text-lg">
                    <span>{props.title}</span>
                </div>
            </div>
        </div>
    )
}