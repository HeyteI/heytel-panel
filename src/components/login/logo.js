import React from "react"

export function Logo() {
    return (
        <div className="Logo">
            <div className="flex items-center justify-center pt-10 pb-20">
                <svg width="155" height="155" viewBox="0 0 145 139" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M85.4166 46.8959H59.5833V72.7292H85.4166V46.8959Z" stroke="#7B49EA" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" />
                    <path d="M1.45831 59.8125L72.5 1.6875L143.542 59.8125" stroke="#7B49EA" strokeWidth="2" strokeMiterlimit="10" />
                    <path d="M56.3541 137.313V98.5625H88.6458V137.313" stroke="#7B49EA" strokeWidth="2" strokeMiterlimit="10" />
                    <path d="M17.6041 69.5V137.313H127.396V69.5" stroke="#7B49EA" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" />
                    <path d="M24.0625 41.319V14.6041" stroke="#7B49EA" strokeWidth="2" strokeMiterlimit="10" />
                </svg>
                <span className="text-7xl pt-10 pl-5">Heytel</span>
            </div>
        </div>
    )
}