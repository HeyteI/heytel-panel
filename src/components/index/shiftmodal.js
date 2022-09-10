import { useState, useContext } from "react"

import AuthContext from "../../context/AuthProvider"
import axios from "../../api/axios";
import { addHours } from "../../utils/date";
import { FormRow } from "../formrow";
import { useEffect } from "react";


export function CreateShiftModal(props) {
    const user = useContext(AuthContext);
    const [data, setData] = useState({})

    const createShift = async (data) => {
        return axios.post(`/api/secured/shifts/`, data, {
            withCredentials: true,
            proxy: "http://localhost:8080",
            headers: {
                "Content-Type": "application/json",
                Authorization: user.auth.accessToken,
            },
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        let today = new Date()
        let work_time = addHours(8)


        let shiftData = { ...data, work_time: work_time, user_id: user.auth.data.ID, shift_start: today}

        createShift(shiftData).then((res) => {
            props.setShift(res.data.data)
            props.setShowModal(false)
        }).catch((err) => {
            console.error(err)
        })
    }

    const onChange = (event) => {
        let name = event.target.name
        let value = event.target.value

        setData({ ...data, [name]: value })
    }

    return (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none shadow-2xl" style={{ backgroundColor: `rgb(0, 0, 0, 0.5)` }}>
            <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
                <div className="relative bg-white rounded-lg shadow">
                    <form onSubmit={handleSubmit}>
                        <div className="flex justify-between items-start p-4 rounded-t border-b">
                            <h3 className="text-xl font-semibold text-gray-900">
                                Rozpocznij zmianę {user.auth.data.firstname}
                            </h3>
                        </div>
                        <div className="p-6 space-y-6">
                            <FormRow handleChange={onChange} title="Oczekiwany czas pracy" name="work_time" type="hour" value={data?.title || ""} placeholder="8" />
                            <FormRow handleChange={onChange} title="Dodatkowe informacje" name="start_description" type="text" value={data?.description || "Brak"}/>
                        </div>
                        <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200">
                            <button type="submit" className="bg-[#7B49EA] text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">Zapisz</button>
                            <button onClick={() => { props.setShowModal(false) }} type="button" className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">Anuluj</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export function EndShiftModal(props) {
    const user = useContext(AuthContext);
    const [data, setData] = useState({})

    const [worked, setWorked] = useState("") // unnecessary feature but why not

    const endShift = async (shiftId, shiftData) => {
        console.log(shiftId, shiftData)
        return axios.patch(`/api/secured/shifts/${shiftId}`, shiftData, {
            withCredentials: true,
            proxy: "http://localhost:8080",
            headers: {
                "Content-Type": "application/json",
                Authorization: user.auth.accessToken,
            },
        })
    }

    useEffect(() => {
        const getFormatedWorkTime = () => {
            let shift = props.shift
            let shift_start = new Date(shift.shift_start)
            let shift_end = new Date()
            let worked = shift_end - shift_start
            worked = `${Math.floor(worked / 1000 / 60 / 60)} godzin ${Math.floor(worked / 1000 / 60) % 60} minut ${Math.floor(worked / 1000) % 60} sekund`
            return worked
        }

        const interval = setInterval(() => setWorked(getFormatedWorkTime()), 1000);
        return () => {
            clearInterval(interval);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    })

    const handleSubmit = (event) => {
        event.preventDefault()

        // calc time user worked
        let shift = props.shift
        let shift_end = new Date()
        let shift_start = new Date(shift.shift_start)
        let work_time = new Date(shift.work_time)

        let workedToDate = shift_end - shift_start

        let shiftData = {
            shift_start: shift_start, 
            work_time: work_time, 
            shift_end: shift_end, 
            worked: new Date(workedToDate), 
            start_description: shift.start_description,
            end_description: data.end_description || ""
        }

        console.log(shiftData)
        endShift(shift.ID, shiftData)

        props.setShift({})

        props.setShowModal(false)
    }

    const onChange = (event) => {
        let name = event.target.name
        let value = event.target.value

        setData({ ...data, [name]: value })
    }

    return (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none shadow-2xl" style={{ backgroundColor: `rgb(0, 0, 0, 0.5)` }}>
            <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
                <div className="relative bg-white rounded-lg shadow">
                    <form onSubmit={handleSubmit}>
                        <div className="flex justify-between items-start p-4 rounded-t border-b">
                            <h3 className="text-xl font-semibold text-gray-900">
                                Zakończ zmianę {user.auth.data.firstname}
                            </h3>
                        </div>
                        <div className="p-6 space-y-6">
                            <FormRow handleChange={onChange} title="Przepracowane" name="worked" type="disabled" value={worked} />
                            <FormRow handleChange={onChange} title="Dodatkowe informacje" name="end_description" type="text" value={data?.description || "Brak"} />
                        </div>
                        <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200">
                            <button type="submit" className="bg-[#7B49EA] text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">Zapisz</button>
                            <button onClick={() => { props.setShowModal(false) }} type="button" className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">Anuluj</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}