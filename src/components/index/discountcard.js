import { useState, useContext } from "react"

import AuthContext from "../../context/AuthProvider"
import axios from "../../api/axios";
import { FormRow } from "../formrow";

function CreateDiscountModal(props) {
    const user = useContext(AuthContext);
    const [data, setData] = useState({})

    const createDiscount = async (data) => {
        return axios.post(`/api/secured/discounts/`, data, {
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

        let discountData = {...data, active: true}
        console.log(discountData)
        createDiscount(discountData)

        props.setData({...props.data, master: {...props.data.master, discounts: [...props.data.master.discounts, discountData]}})

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
                                Nowa promocja
                            </h3>
                        </div>
                        <div className="p-6 space-y-6">
                            <FormRow handleChange={onChange} title="Nazwa promocji" name="name" type="text" value={data?.title || ""} placeholder="Zniżka dla seniorów" />
                            <FormRow handleChange={onChange} title="Wartość promocji" name="value" type="percentage" value={data?.value || ""} placeholder="25" />
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

export function Discountcard(props) {
    const user = useContext(AuthContext);

    const [showDiscountModal, setShowDiscountModal] = useState(false)

    let modal
    if (user.auth.data?.group === "admin") {
        modal = <>{showDiscountModal ? <CreateDiscountModal setShowModal={setShowDiscountModal} data={props.data} setData={props.setData}></CreateDiscountModal> : <button className="float-right mr-2" onClick={() => { setShowDiscountModal(true) }}><span>+</span></button>}</>
    } else {
        modal = <></>
    }

    return (
        <div className="discountcard">
            <div className="flex items-center">
                <div className="box-border w-80 h-80 mt-5 ml-5 border border-[#D9D9D9] shadow-lg rounded-md hide-scrollbar overflow-hidden hover:overflow-y-scroll">
                    <h1 className="ml-5 font-semibold py-3">Obowiązujące promocje {modal}</h1>
                    <div className="h-px w-full border border-[#D9D9D9]"></div>
                    {props.children}
                </div>
            </div>
        </div>
    )
}