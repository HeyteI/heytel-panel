import { NavLink } from "react-router-dom"
import { CreateShiftModal, EndShiftModal } from "./index/shiftmodal"

import React, { useEffect, useState, useContext } from "react"
import axios from "../api/axios"
import AuthContext from "../context/AuthProvider"
import { ShiftContext } from "../context/AuthProvider"

import { isToday } from "../utils/date"
import { LoadingSpinner } from "./loading"

export function Navbar(props) {
    const user = useContext(AuthContext);
    const [shift, setShift] = useContext(ShiftContext)

    const [showCreateShiftModal, setShowCreateShiftModal] = useState(false)
    const [showEndShiftModal, setShowEndShiftModal] = useState(false)

    const [loading, setLoading] = useState(false)

    const fetchAllShifts = async (user_id) => {
        return axios.get(`/api/secured/shifts/employee/${user_id}`, {
            withCredentials: true,
            proxy: "http://localhost:8080",
            headers: {
                "Content-Type": "application/json",
                Authorization: user.auth.accessToken,
            },
        })
    }

    useEffect(() => {
        const fetchShift = async () => {
            try {
                setLoading(true)

                let employeeShifts = (await fetchAllShifts(user.auth.data.ID)).data.data

                let TodayShift = employeeShifts.filter(shift => (isToday(new Date(shift.shift_start)) && shift.shift_end === null))

                if (TodayShift.length > 0) {
                    setShift(TodayShift[0])
                }

            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        fetchShift()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function toggleSidebarVisibility() {
        var sidebarElem = document.getElementById("sidebar")
        sidebarElem.classList.toggle("hidden")
    }

    let shiftModal, shiftModalButton

    const ModalButton = (props) => {
        return (
            <span className="relative inline-flex mr-4">
                <div className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-violet-500 bg-white transition ease-in-out duration-150 ring-1 ring-slate-900/10">
                    {props.children}
                    <span className="flex absolute h-3 w-3 top-0 right-0 -mt-1 -mr-1">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-purple"></span>
                    </span>
                </div>
            </span>
        )
    }

    if (Object.keys(shift).length === 0) {
        shiftModal = showCreateShiftModal ? <CreateShiftModal showModal={showCreateShiftModal} setShowModal={setShowCreateShiftModal} setShift={setShift}></CreateShiftModal> : <></>
        shiftModalButton = showCreateShiftModal ? <></> : <button onClick={() => setShowCreateShiftModal(true)} className=""><ModalButton>Rozpocznij zmianę</ModalButton></button>
    } else {
        shiftModal = showEndShiftModal ? <EndShiftModal showModal={showEndShiftModal} setShowModal={setShowEndShiftModal} shift={shift} setShift={setShift}></EndShiftModal> : <></>
        shiftModalButton = showEndShiftModal ? <></> : <button onClick={() => setShowEndShiftModal(true)} className=""><ModalButton>Zakończ zmianę</ModalButton></button>
    }


    return (
        <>
            {loading
                ? <LoadingSpinner></LoadingSpinner>
                : <>
                    <nav className="bg-white drop-shadow-md w-full">
                        <div className="mx-auto px-2 sm:px-6 lg:px-8">
                            <div className="relative flex items-center justify-between h-20">
                                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                    <button type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                                    </button>
                                </div>
                                <div className="flex-1 ml-2 justify-center sm:items-stretch sm:justify-start">
                                    <div className="flex-shrink-0 flex items-center">
                                        <div className="flex flex-row">
                                            <NavLink to="/" className='bl flex flex-row'>
                                                <svg xmlns="http://www.w3.org/2000/svg" height="41" width="41" viewBox="0 0 32 32"><title>home 3</title><g strokeWidth="1.5" fill="#9CA38F" stroke="#9CA38F" className="nc-icon-wrapper"><polyline data-cap="butt" data-color="color-2" points="1 14 16 2 31 14" fill="none" strokeMiterlimit="10"></polyline> <polyline data-cap="butt" points="13 30 13 22 19 22 19 30" fill="none" stroke="#9CA38F0" strokeMiterlimit="10"></polyline> <polyline points="5 16 5 30 27 30 27 16" fill="none" stroke="#9CA38F0" strokeLinecap="square" strokeMiterlimit="10"></polyline> <rect data-color="color-2" x="14" y="13" width="4" height="4" fill="none" strokeLinecap="square" strokeMiterlimit="10"></rect> <line data-cap="butt" data-color="color-2" x1="7" y1="9.2" x2="7" y2="4" fill="none" strokeMiterlimit="10"></line></g></svg>
                                                <span className="font-sans font-normal text-2xl ml-2 mt-2">Heytel</span>
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="max-w-sm h-auto mx-auto my-20 flex items-center ">
                                        {shiftModalButton}
                                        <img className="mr-2 h-10 w-10 rounded-full" src={user.auth.data.photo} alt={`${user.auth.data.firstname} ${user.auth.data.lastname}`} />
                                        <button id="sidebar-toggle" onClick={toggleSidebarVisibility}>
                                            <svg className="w-8 md:hidden" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>more_vert</title><g fill="none" className="nc-icon-wrapper"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" fill="#000000"></path></g></svg>
                                        </button>
                                        <div className="hidden md:block">
                                            <span>{`${user.auth.data.firstname} ${user.auth.data.lastname}`}</span>
                                            <p className="text-slate-500">{props.group}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                    {shiftModal}
                </>
            }
        </>
    )
}