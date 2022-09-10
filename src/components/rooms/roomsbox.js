import React, { useState, useContext } from "react"

import AuthContext from "../../context/AuthProvider";
import axios from "../../api/axios";

import { FormRow } from ".././formrow"

function CreateRoomModal(props) {
    const user = useContext(AuthContext);

    const createRoom = async (data) => {
        return axios.post(`/api/secured/room/`, data, {
            withCredentials: true,
            proxy: "http://localhost:8080",
            headers: {
                "Content-Type": "application/json",
                Authorization: user.auth.accessToken,
            },
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        let roomData = { ...props.data, available: true }

        createRoom(roomData)

        // todo make it refresh itself without refreshing entire window 
        // let elem = <RoomsCard key={props.data.ID} id={props.data.ID} number={props.data.number} available={props.data.available} title={props.data.title} />
        // let parent = document.getElementById("rooms")

        props.setShowModal(false)
        window.location.reload();
    }

    return (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none shadow-2xl" style={{ backgroundColor: `rgb(0, 0, 0, 0.5)` }}>
            <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
                <div className="relative bg-white rounded-lg shadow">
                    <form onSubmit={handleSubmit}>
                        <div className="flex justify-between items-start p-4 rounded-t border-b">
                            <h3 className="text-xl font-semibold text-gray-900">
                                Dodawanie pokoju
                            </h3>
                        </div>
                        <div className="p-6 space-y-6">
                            <FormRow handleChange={props.handleChange} title="Numer pokoju" name="number" type="number" value={props.data?.number || ""} placeholder="132" />
                            <FormRow handleChange={props.handleChange} title="Klasa pokoju" name="class" type="text" value={props.data?.class || ""} placeholder="Standard" />
                            <FormRow handleChange={props.handleChange} title="Zakres mieszkańców" name="people" type="text" value={props.data?.people || ""} placeholder="1-4" />
                            <FormRow handleChange={props.handleChange} title="Opis" name="description" type="text" value={props.data?.description || ""} placeholder="Pokój z balkonem i 4 osobnymi lóżkami" />
                            <FormRow handleChange={props.handleChange} title="Cena za dobe" name="price" type="price" value={props.data?.price || ""} placeholder="132" />
                            <FormRow handleChange={props.handleChange} title="Piętro" name="floor" type="disabled" value={props.floor || ""} />
                            <FormRow handleChange={props.handleChange} title="Nazwa" name="title" type="text" value={props.data?.title || ""} placeholder="Apartament Standard" />
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

export function RoomsBox(props) {
    const user = useContext(AuthContext);
    const [showModal, setShowModal] = useState(false)
    const [data, setData] = useState({ floor: props.floor })

    const handleChange = (event) => {


        let value = event.target.value

        if (["price"].includes(event.target.name)) {
            value = parseInt(value)
        }

        setData({ ...data, [event.target.name]: value })
    }


    let modal
    if (user.auth.data?.group === "admin") {
        modal = <>{showModal ? <CreateRoomModal floor={props.floor} setShowModal={setShowModal} data={data} handleChange={handleChange}></CreateRoomModal> : <button className="float-right mr-2" onClick={() => { setShowModal(true) }}><span>+</span></button>}</>
    } else {
        modal = <></>
    }
    return (
        <div>
            <div className="box-border h-64 w-[75vw] pt-30 border-2 rounded-md mt-9 mx-12 text-left overflow-x-scroll">
                <div>
                    <span className="text-lg my-2 ml-2">{props.title}{modal}</span>
                    <div className="h-px w-full border border-1 border-[#D9D9D9]"></div>
                </div>
                <div className="flex h-52" id="rooms">
                    {props.children}
                </div>
            </div>
        </div>
    )
}