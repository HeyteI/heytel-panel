import React, { useEffect, useContext, useState } from "react";
import axios from "../../api/axios";
import AuthContext from "../../context/AuthProvider";
import { FormRow } from "../formrow";
import { CardRow } from "./invoicemodal";

function CreateServiceModal(props) {
    const user = useContext(AuthContext)

    const [data, setData] = useState({})

    const createService = async () => {
        return axios.post(`/api/secured/services/`, props.data, {
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

        createService()

        props.setServices({...props.services, [data.name]: data.suggested_price})

        props.setShowModal(false)
    }

    const handleChange = (event) => {
        const name = event.target.name
        let value = event.target.value

        if (name === "suggested_price") {
            value = parseInt(value)
        }

        setData({ ...data, [name]: value })
    }

    return (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none shadow-2xl" style={{ backgroundColor: `rgb(0, 0, 0, 0.5)` }}>
            <div className="relative p-4 w-full max-w-sm h-full md:h-auto">
                <div className="relative bg-white rounded-lg shadow">
                    <div className="flex justify-between items-start p-4 rounded-t border-b">
                        <h3 className="text-xl text-[#7B49EA]">
                            Dodawnie usługi
                        </h3>
                    </div>
                    <div className="p-6 space-y-6">
                        <FormRow handleChange={handleChange} title="Nazwa" name="name" type="text" value={data?.name || ""} />
                        <FormRow handleChange={handleChange} title="Cena" name="suggested_price" type="number" value={data?.suggested_price || ""} />
                        <FormRow handleChange={handleChange} title="Opis" name="description" type="text" value={data?.description || ""} />
                    </div>
                    <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200">
                        <button onClick={handleSubmit} type="button" className="bg-[#7B49EA] text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">Zapisz</button>
                        <button onClick={() => { props.setShowModal(false) }} type="button" className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">Anuluj</button>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default function CreateBillModal(props) {
    const user = useContext(AuthContext)
    const [showModal, setShowModal] = useState(false)
    const [showServiceModal, setShowServiceModal] = useState(false)

    const [calcData, setCalcData] = useState({})

    const [services, setServices] = useState({})
    const [data, setData] = useState({})

    const handleChange = (event) => {
        const name = event.target.name;
        let value = event.target.value;

        if (name === "services") {
            value = Array.from(event.target.selectedOptions, option => option.value);
        }

        setData({ ...data, [name]: value })

        if (name !== "price") {
            console.log(name, value)
            let calcPrice = 0
            data.services.forEach((elem) => {return calcPrice+elem.split(":")[1]})
            setCalcData({...calcData, price: calcData.price+calcPrice})
        }
    }

    const fetchServices = async () => {
        return axios.get(`/api/secured/services/all`, {
            withCredentials: true,
            proxy: "http://localhost:8080",
            headers: {
                "Content-Type": "application/json",
                Authorization: user.auth.accessToken,
            },
        });
    };

    useEffect(() => {
        const fetchAllServices = async () => {
            let allServices = (await fetchServices()).data.data

            let servicesMap = {}

            allServices.forEach(service => {
                servicesMap[service["name"]] = service["suggested_price"]
            })

            setServices(servicesMap)
        }
        fetchAllServices()

        const setBillData = () => {
            let date_range = props.data.master.invoice.date_range.split("/")
            let date_1 = new Date(date_range[0])
            let date_2 = new Date(date_range[1])

            console.log(date_range)

            let difference = date_2.getTime() - date_1.getTime()
            let TotalDays = Math.ceil(difference / (1000 * 3600 * 24))

            console.log(difference)
            console.log(TotalDays)

            let apart_price = props.data.master.room.price * TotalDays
            console.log(props.data.master.room.price)

            console.log(apart_price)

            setCalcData({ ...calcData, apartment_price: apart_price })
        }

        if (Object.keys(props.data.master.invoice).length !== 0) setBillData()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const createBill = async (billData) => {
        return axios.post(`/api/secured/bill/`, billData, {
            withCredentials: true,
            proxy: "http://localhost:8080",
            headers: {
                "Content-Type": "application/json",
                Authorization: user.auth.accessToken,
            },
        })
    }

    const handleSubmit = () => {
        console.log(data)

        let servicesSub = data.services
        servicesSub.push(`place_price:${data.apartment_price}`)
        servicesSub.push(`price:${data.price}`)

        let billData = {
            invoice_id: props.data.master.invoice.ID,
            services: servicesSub
        }

        console.log(billData)

        createBill(billData)

        setShowModal(false)
    }

    let modal
    if (user.auth.data?.group === "admin") {
        modal = <>{showServiceModal ? <CreateServiceModal setShowModal={setShowServiceModal} setServices={setServices} services={services}></CreateServiceModal> : <button className="float-right mr-2" onClick={() => { setShowServiceModal(true) }}><span className="text-purple-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">Dodaj usługę</span></button>}</>
    } else {
        modal = <></>
    }

    return (
        <>
            {showModal
                ? <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none" style={{ backgroundColor: `rgb(0, 0, 0, 0.5)` }}>
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            <div className="border-2 rounded-lg shadow-2xl relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="flex items-center justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl text-[#7B49EA]">
                                        Utwórz rachunek
                                    </h3>
                                </div>
                                <div className="relative p-6 grid grid-cols-2 gap-2">
                                    <div className="flex flex-col">
                                        <div className="">
                                            <label for="services" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-violet-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Usługi</label>
                                            <select name="services" id="services" onChange={handleChange} className="mb-5 flex mt-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" multiple>
                                                <option value="none" disabled>Wybierz usługi</option>
                                                {Object.keys(services).map((key, index) => {
                                                    return <option value={`${key}:${services[key]}`} key={key}>{key} - {services[key]} PLN</option>
                                                })}
                                            </select>
                                        </div>
                                        <div className="flex flex-row">
                                            <CardRow title="Cena za mieszkanie" name="apartment_price" onChange={handleChange} type="number" data={data} value={calcData.apartment_price}></CardRow>
                                            <span className="text-slate-400">PLN</span>
                                        </div>
                                        <div className="flex flex-row">
                                            <CardRow title="Całkowita cena" name="price" onChange={handleChange} type="number" data={data} value={calcData.price}></CardRow>
                                            <span className="text-slate-400">PLN</span>
                                        </div>
                                    </div>
                                    {modal}
                                </div>
                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}>
                                        Anuluj
                                    </button>
                                    <button
                                        className="bg-[#7B49EA] text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={handleSubmit}>
                                        Zapisz
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
                : <>
                    {props.data.master.room.available
                        ? <span className="text-purple-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">Nie można utworzyć rachunku</span>
                        : <button
                            className="text-purple-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => { setShowModal(true) }}>
                            Utwórz rachunek
                        </button>
                    }
                </>
            }
        </>
    )
}