import React, { useEffect, useContext, useState } from "react";
import AuthContext from "../../context/AuthProvider";
import axios from "../../api/axios";
import { LoadingSpinner } from "../loading";

import CreateBillModal from "./billmodal";

var icons = {
    "person": <svg className="flex h-5 ml-2 w-auto" width="32" height="32" viewBox="0 0 36 43" fill="none" xmlns="http://www.w3.org/2000/svg" ><path d="M22.5 26.3499H13.5C9.91958 26.3499 6.4858 27.7722 3.95406 30.3039C1.42232 32.8357 0 36.2694 0 39.8499C0 39.8499 6.75 42.8499 18 42.8499C29.25 42.8499 36 39.8499 36 39.8499C36 36.2694 34.5777 32.8357 32.0459 30.3039C29.5142 27.7722 26.0804 26.3499 22.5 26.3499Z" fill="#7B49EA" /><path d="M8.25 9.90015C8.25 7.31429 9.27723 4.83434 11.1057 3.00586C12.9342 1.17738 15.4141 0.150146 18 0.150146C20.5859 0.150146 23.0658 1.17738 24.8943 3.00586C26.7228 4.83434 27.75 7.31429 27.75 9.90015C27.75 15.3121 23.385 21.0999 18 21.0999C12.615 21.0999 8.25 15.3121 8.25 9.90015Z" fill="#7B49EA" /></svg>,
    "cash": <svg className="flex h-5 ml-2 w-auto" width="48" height="49" viewBox="0 0 48 49" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M23.6 22.3C19.06 21.12 17.6 19.9 17.6 18C17.6 15.82 19.62 14.3 23 14.3C26.56 14.3 27.88 16 28 18.5H32.42C32.28 15.06 30.18 11.9 26 10.88V6.5H20V10.82C16.12 11.66 13 14.18 13 18.04C13 22.66 16.82 24.96 22.4 26.3C27.4 27.5 28.4 29.26 28.4 31.12C28.4 32.5 27.42 34.7 23 34.7C18.88 34.7 17.26 32.86 17.04 30.5H12.64C12.88 34.88 16.16 37.34 20 38.16V42.5H26V38.2C29.9 37.46 33 35.2 33 31.1C33 25.42 28.14 23.48 23.6 22.3Z" fill="#7B49EA" /></svg>,
    "location": <svg className="flex h-5 ml-2 w-auto" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 4C16.26 4 10 10.26 10 18C10 21.48 11 24.74 12.82 27.68C14.72 30.76 17.22 33.4 19.14 36.48C20.08 37.98 20.76 39.38 21.48 41C22 42.1 22.42 44 24 44C25.58 44 26 42.1 26.5 41C27.24 39.38 27.9 37.98 28.84 36.48C30.76 33.42 33.26 30.78 35.16 27.68C37 24.74 38 21.48 38 18C38 10.26 31.74 4 24 4ZM24 23.5C22.6739 23.5 21.4021 22.9732 20.4645 22.0355C19.5268 21.0979 19 19.8261 19 18.5C19 17.1739 19.5268 15.9021 20.4645 14.9645C21.4021 14.0268 22.6739 13.5 24 13.5C25.3261 13.5 26.5979 14.0268 27.5355 14.9645C28.4732 15.9021 29 17.1739 29 18.5C29 19.8261 28.4732 21.0979 27.5355 22.0355C26.5979 22.9732 25.3261 23.5 24 23.5Z" fill="#7B49EA" /></svg>,
    "transactions": <svg className="flex h-5 ml-2 w-auto" width="48" height="49" viewBox="0 0 48 49" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M44.1615 32.3285C43.0643 31.697 41.7758 31.4832 40.5335 31.7266C39.2911 31.9699 38.1785 32.654 37.4006 33.6527C36.6227 34.6515 36.232 35.8977 36.3002 37.1619C36.3685 38.426 36.8913 39.6229 37.7722 40.532C34.3069 44.0093 29.6546 46.0472 24.7491 46.2365C19.8436 46.4258 15.048 44.7526 11.325 41.5528C10.9711 41.918 10.5768 42.2418 10.1497 42.518C14.1755 46.0671 19.4103 47.9351 24.7734 47.7364C30.1366 47.5376 35.2187 45.2873 38.9707 41.45C40.1772 42.0914 41.5861 42.2372 42.8983 41.8565C44.2105 41.4757 45.3225 40.5984 45.9983 39.4109C46.674 38.2234 46.8601 36.8192 46.5172 35.4966C46.1742 34.174 45.3292 33.0373 44.1615 32.3278V32.3285Z" fill="#7B49EA" /><path d="M29.2455 6.41307C29.2261 5.08467 28.7044 3.81289 27.7854 2.85351C26.8663 1.89414 25.6181 1.31832 24.2918 1.24187C22.9655 1.16542 21.6594 1.59402 20.6362 2.44145C19.613 3.28888 18.9487 4.4923 18.7768 5.80967C18.6048 7.12704 18.9381 8.46065 19.7095 9.54228C20.481 10.6239 21.6333 11.3733 22.9349 11.6398C24.2364 11.9063 25.5906 11.6701 26.725 10.9787C27.8595 10.2873 28.6901 9.192 29.0498 7.91307C33.7967 9.17987 37.8893 12.1943 40.5069 16.352C43.1245 20.5097 44.0737 25.5032 43.164 30.3313C43.6579 30.4567 44.136 30.6378 44.589 30.8713C45.6437 25.6057 44.6411 20.1362 41.7873 15.5871C38.9335 11.0379 34.4453 7.75497 29.2455 6.41307Z" fill="#7B49EA" /><path d="M5.16599 31.7923C3.89286 27.0492 4.45789 22.0002 6.748 17.6559C9.0381 13.3115 12.8843 9.99223 17.517 8.3623C17.3775 7.87333 17.294 7.37011 17.268 6.8623C12.181 8.57925 7.9459 12.1812 5.43454 16.9265C2.92319 21.6719 2.32674 27.1995 3.76799 32.3713C2.62758 33.0518 1.78715 34.1389 1.41571 35.4139C1.04428 36.6889 1.16939 38.0572 1.7659 39.2437C2.36241 40.4302 3.38605 41.3468 4.63096 41.8092C5.87586 42.2716 7.24968 42.2455 8.47609 41.7361C9.7025 41.2267 10.6905 40.2718 11.2415 39.0634C11.7924 37.8551 11.8654 36.483 11.4457 35.223C11.0261 33.9631 10.1449 32.9088 8.97942 32.2721C7.81395 31.6355 6.45066 31.4638 5.16374 31.7916L5.16599 31.7923Z" fill="#7B49EA" /></svg>,
}

function Checkbox(props) {
    return (
        <div className="relative z-0 mb-5 w-full group">
            <input type="checkbox" name={props.name} id={props.title} onChange={props.onChange} defaultChecked={props.data[props.name] || props.value || false}></input>
            <label for={props.title} className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-violet-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 ml-1">{props.title}</label>
        </div>
    )
}

function Select(props) {
    return (
        <div className="relative z-0 mb-5 w-full group">
            <label for={props.title} className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-violet-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">{props.title}</label>
            <select id={props.title} onChange={props.onChange} name={props.name} data={props.data} value={props.data[props.name] || props.value} className="bg-white mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5">
                {props.children}
            </select>
        </div>
    )
}

function DatePicker(props) {

    const onChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        if (name === "date_start") {
            props.setDateStart(value)
        } else if (name === "date_end") {
            props.setDateEnd(value)
        }
    }

    return (
        <>
            <div className="relative z-0 mb-5 w-full group">
                <div className="mt-2">
                    <label for="date_start" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-violet-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Od</label>
                    <input type="date" id="date_start" name="date_start" className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500" value={props.date_start} onChange={onChange} />
                    <label for="date_end" className="ml-5 peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-violet-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Do</label>
                    <input type="date" id="date_end" name="date_end" className="ml-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500" value={props.date_end} onChange={onChange} />
                </div>
            </div>
        </>
    )
}

export function CardRow(props) {
    let isDisabled = ""
    let limit_min = ""
    let limit_max = ""

    if (props.type === "datepicker") {
        return (
            <>
                <DatePicker value={props.value} setDateRange={props.setDateRange} date_start={props.date_start} setDateStart={props.setDateStart} date_end={props.date_end} setDateEnd={props.setDateEnd}></DatePicker>
            </>
        )
    } else if (props.type === "checkbox") {
        return (
            <Checkbox name={props.name} title={props.title} state={props.data[props.name] || props.value || false} data={props.data} onChange={props.onChange}></Checkbox>
        )
    } else if (props.type === "disabled") {
        isDisabled = "disabled"
    } else if (props.type === "select") {
        return (
            <Select name={props.name} title={props.title} value={props.data[props.name] || props.value} data={props.data} children={props.children} onChange={props.onChange}></Select>
        )
    }

    if (props.name === "people_count") {
        if (props.roomData.people !== undefined) {
            let people_range = props.roomData.people.split("-")
            limit_min = `min=${people_range[0]} `
            limit_max = `max=${people_range[1]}`
        }
    }

    return (
        <div key={props.title} className="relative z-0 mb-5 w-full group">
            <input type={props.type} name={props.name} id={props.title} onChange={props.onChange} defaultValue={props.value || props.data[props.name]} disabled={isDisabled} min={limit_min} max={limit_max} className="block py-2.5 px-0 w-11/12 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" required />
            <label for={props.title} className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-violet-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">{props.title}</label>
        </div>
    )
}

function Card(props) {
    return (
        <div className="border-2 border-gray-300 rounded-lg" style={{ height: (props.height || 12) + "rem", width: (props.height || 20) + "rem" }}>
            <header className="w-full flex items-center">
                {icons[props.icon]}
                <span className="flex flex-col text-xl ml-1">{props.cardTitle}</span>
            </header>
            <div className="w-full h-px bg-gray-300"></div>
            <div className="flex flex-col pt-3 mx-2">
                {props.children}
            </div>
        </div>
    )
}

export default function EditCardModal(props) {
    const user = useContext(AuthContext);

    const [showModal, setShowModal] = React.useState(false);
    const [loading, setLoading] = React.useState(false)

    const [data, setData] = React.useState({ master: { user: {}, room: {}, invoice: {}, method: "", bill: {} } })

    const [invoice_register_number, setInvoiceRegisterNumber] = React.useState("")

    const [date_range, setDateRange] = React.useState("")

    const [date_start, setDateStart] = useState("")
    const [date_end, setDateEnd] = useState("")

    const fetchBillData = async (invoiceId) => {
        return axios.get(`/api/secured/bill/invoice/${invoiceId}`, {
            withCredentials: true,
            proxy: "http://localhost:8080",
            headers: {
                "Content-Type": "application/json",
                Authorization: user.auth.accessToken,
            },
        })
    }

    const fetchInvoiceData = async (roomId) => {
        return axios.get(`/api/secured/invoice/room/${roomId}`, {
            withCredentials: true,
            proxy: "http://localhost:8080",
            headers: {
                "Content-Type": "application/json",
                Authorization: user.auth.accessToken,
            },
        })
    }

    const updateData = async (data) => {
        return axios.patch(`/api/secured/filtered_update`, data, {
            withCredentials: true,
            proxy: "http://localhost:8080",
            headers: {
                "Content-Type": "application/json",
                Authorization: user.auth.accessToken,
            },
        })
    }

    const createUser = async (user_data) => {
        return axios.post(`/api/user/register`, user_data, {
            withCredentials: true,
            proxy: "http://localhost:8080",
            headers: {
                "Content-Type": "application/json",
                Authorization: user.auth.accessToken,
            },
        })
    }

    const createInvoice = async (invoice) => {
        return axios.post(`/api/secured/invoice/`, invoice, {
            withCredentials: true,
            proxy: "http://localhost:8080",
            headers: {
                "Content-Type": "application/json",
                Authorization: user.auth.accessToken,
            },
        })
    }

    const updateRoom = async (room_id, updateData) => {
        return axios.patch(`/api/secured/room/${room_id}`, updateData, {
            withCredentials: true,
            proxy: "http://localhost:8080",
            headers: {
                "Content-Type": "application/json",
                Authorization: user.auth.accessToken,
            },
        })
    }

    const deleteInvoice = async (invoice_id) => {
        return axios.delete(`/api/secured/invoice/${invoice_id}`, {
            withCredentials: true,
            proxy: "http://localhost:8080",
            headers: {
                "Content-Type": "application/json",
                Authorization: user.auth.accessToken,
            },
        })
    }

    const fetchRoomData = async (roomId) => {
        return axios.get(`/api/secured/room/${roomId}`, {
            withCredentials: true,
            proxy: "http://localhost:8080",
            headers: {
                "Content-Type": "application/json",
                Authorization: user.auth.accessToken,
            },
        })
    }

    const fetchUserData = async (userId) => {
        return axios.get(`/api/secured/user/id/${userId}`, {
            withCredentials: true,
            proxy: "http://localhost:8080",
            headers: {
                "Content-Type": "application/json",
                Authorization: user.auth.accessToken,
            },
        })
    }

    const createData = async (data) => {
        console.log(data)
        let new_user = data.master.user // email firstname lastname phone
        new_user.group = "customer"
        new_user.username = `${Math.floor(100000 + Math.random() * 900000)}`

        data.master.room.available = false

        let newUser = await createUser(new_user)
        data.master.user = newUser.data.data

        data.master.room = (await fetchRoomData(data.master.room.ID)).data.data

        let invoice = {
            room_id: data.master.room.ID,
            user_id: data.master.user.ID,
            register_number: invoice_register_number,
            date_range: `${date_start}/${date_end}`,
            ...data.master.invoice
        }

        data.master.invoice = (await createInvoice(invoice)).data.data

        await updateRoom(data.master.room.ID, {
            "invoice_id": data.master.invoice.ID,
            "available": false
        })

        data.master.room = (await fetchRoomData(data.master.room.ID)).data.data
        props.setAvailable(false)
    }

    const clearData = async (data) => {
        if (props.available) return

        let roomData = (await fetchRoomData(props.id)).data.data
        console.log(roomData)

        await updateRoom(props.id, {
            "invoice_id": "",
            "available": true
        })

        await deleteInvoice(roomData.invoice_id)

        data.master.room = (await fetchRoomData(data.master.room.ID)).data.data
        data.master.user = {}
        data.master.invoice = {}
        data.master.bill = {}

        setDateStart("")
        setDateEnd("")

        props.setAvailable(true)
    }

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                setLoading(true)

                let user = {}
                let invoice = {}
                let bill = {}

                let roomData = (await fetchRoomData(props.id)).data.data

                if (!roomData.available && roomData.ID !== "00000000-0000-0000-0000-000000000000") {
                    try {
                        invoice = (await fetchInvoiceData(props.id)).data.data
                    } catch (e) {
                        invoice = {}
                    }

                    setDateStart(invoice.date_range.split("/")[0])
                    setDateEnd(invoice.date_range.split("/")[1])

                    user = (await fetchUserData(invoice.user_id)).data.data

                    let billData = {}
                    try {
                        billData = (await fetchBillData(invoice.ID)).data.data
                        console.log(billData)
                        billData.services.forEach((elem) => {
                            let key = elem.split(":")[0]
                            let value = elem.split(":")[1]
                            bill[key] = value
                        })
                    } catch (e) {
                        console.log(e)
                    }
                }

                setData({
                    ...data, master: {
                        user: user,
                        room: roomData,
                        invoice: invoice,
                        bill: bill
                    }
                })

            } catch (e) {
                console.log(e)
            } finally {
                setLoading(false);
            }
        }
        fetchAllData()
        setInvoiceRegisterNumber(data.master.invoice?.register_number || `PO-${Math.floor(100000 + Math.random() * 900000)}`)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleChange = (method) => (event) => {
        const name = event.target.name;
        let value = event.target.value;

        if (name === "paid") {
            value = event.target.checked
        }

        if (name === "people_count") {
            value = parseInt(value)
        }

        switch (method) {
            case "user":
                console.log("user")
                setData({
                    master: {
                        user: { ...data.master.user, [name]: value },
                        room: { ...data.master.room },
                        invoice: { ...data.master.invoice },
                        bill: { ...data.master.bill }
                    }
                })
                break
            case "room":
                setData({
                    master: {
                        room: { ...data.master.room, [name]: value },
                        user: { ...data.master.user },
                        invoice: { ...data.master.invoice },
                        bill: { ...data.master.bill }
                    }
                })
                break
            case "invoice":
                setData({
                    master: {
                        invoice: { ...data.master.invoice, [name]: value },
                        user: { ...data.master.user },
                        room: { ...data.master.room },
                        bill: { ...data.master.bill }
                    }
                })
                break
            default:
                break
        }
    }

    const handleSubmit = (method) => (event) => {
        event.preventDefault();

        setLoading(true)

        if (method === "update" && props.available) {
            method = "create"
        }

        data.master["method"] = method  // clear/update/create

        if (data.master.room['available'] && method !== "clear") {
            data.master.room['available'] = false
        }

        console.log(method)
        switch (method) {
            case "update":
                updateData(data)
                break
            case "create":
                createData(data)
                break
            case "clear":
                clearData(data)
                break
            default:
                break
        }

        setLoading(false)
        setShowModal(false)
    }

    let modal = (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none" style={{ backgroundColor: `rgb(0, 0, 0, 0.5)` }}>
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {loading
                            ? <LoadingSpinner></LoadingSpinner>
                            : <>
                                <div className="flex items-center justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <div className="bg-violet-700 text-white rounded-full flex items-center justify-center mt-2 mx-2 w-[3.125rem] h-[3.125rem] text-2xl">
                                        {props.number}
                                    </div>
                                    <h3 className="text-3xl text-[#7B49EA]">
                                        {props.roomTitle}
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}>
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
                                    </button>
                                </div>
                                <form onSubmit={handleSubmit("update")}>
                                    <div className="relative p-6 grid grid-cols-2 gap-2">
                                        <Card cardTitle="Dane klienta" icon="person" height="18">
                                            <CardRow title="Imię" name="firstname" type="text" value={data.master.user?.firstname} onChange={handleChange("user")} data={data.master.user}></CardRow>
                                            <CardRow title="Nazwisko" name="lastname" type="text" value={data.master.user?.lastname} onChange={handleChange("user")} data={data.master.user}></CardRow>
                                            <CardRow title="Email" name="email" type="email" value={data.master.user?.email} onChange={handleChange("user")} data={data.master.user}></CardRow>
                                            <CardRow title="Numer telefonu" name="phone" type="tel" value={data.master.user?.phone} onChange={handleChange("user")} data={data.master.user}></CardRow>
                                        </Card>
                                        <Card cardTitle="Informacje o pobycie" icon="location" height="22">
                                            <CardRow title="Data pobytu" name="date_range" type="datepicker" value={date_range} onChange={handleChange("invoice")} data={data.master.invoice} setDateRange={setDateRange} date_start={date_start} setDateStart={setDateStart} date_end={date_end} setDateEnd={setDateEnd}></CardRow>
                                            <CardRow title="Metoda płatności" name="payment_method" type="select" value={data.master.invoice?.payment_method} onChange={handleChange("invoice")} data={data.master.invoice}>
                                                <option>Wybierz metodę płatności</option>
                                                <option value="cash">Gotówka</option>
                                                <option value="creditcard">Karta kredytowa</option>
                                            </CardRow>
                                            <CardRow title="Nr rejestracji" name="register_number" type="disabled" value={invoice_register_number} onChange={handleChange("invoice")} data={data.master.invoice}></CardRow>
                                            <CardRow title="Ilość osób" name="people_count" type="number" value={data.master.invoice?.people_count} onChange={handleChange("invoice")} data={data.master.invoice} roomData={data.master.room}></CardRow>
                                            <CardRow title="Zapłacone" name="paid" type="checkbox" value={data.master.invoice?.paid} onChange={handleChange("invoice")} data={data.master.invoice}></CardRow>
                                        </Card>
                                        <Card cardTitle="Dodatkowe usługi" icon="transactions">
                                            {Object.keys(data.master.bill).length === 0
                                                ? <span className="text-purple-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">Brak danych</span>
                                                : <>
                                                    {Object.entries(data.master.bill).filter(([key, value]) => !(key === 'place_price' || key === 'price')).map(([key, value]) => {
                                                        return <CardRow title={key} name={key} data={data.master.bill} value={`${value} PLN`} type="disabled" onChange={handleChange("bill")} />
                                                    })}
                                                </>
                                            }
                                        </Card>
                                        <Card cardTitle="Rachunek" icon="cash" height="18">
                                            {Object.keys(data.master.bill).length === 0
                                                ? <CreateBillModal showMainModal={setShowModal} data={data} setData={setData}></CreateBillModal>
                                                :
                                                <>
                                                    <CardRow title={props.roomTitle} name="placePrice" type="disabled" data={data.master.bill} value={`${data.master.bill.place_price} PLN`}></CardRow>
                                                    <CardRow title="Dodatkowe usługi" name="additionalServices" type="disabled" data={data.master.bill} value={Object.values(data.master.bill).reduce((a, b) => parseInt(a) + parseInt(b)) - parseInt(data.master.bill.place_price) + " PLN"}></CardRow>
                                                    {/* <div className="w-full h-px bg-gray-300 mb-3"></div> */}
                                                    <CardRow title="Suma" name="additionalServices" type="disabled" data={data.master.bill} value={Object.values(data.master.bill).reduce((a, b) => parseInt(a) + parseInt(b)) + " PLN"}></CardRow>
                                                </>
                                            }
                                        </Card>
                                    </div>
                                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                        <button
                                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => setShowModal(false)}>
                                            Anuluj
                                        </button>
                                        <button
                                            onClick={handleSubmit("clear")}
                                            className="bg-[#7B49EA] text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="submit">
                                            Wyczysc
                                        </button>
                                        <button
                                            className="bg-[#7B49EA] text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="submit">
                                            Zapisz
                                        </button>
                                    </div>
                                </form>
                            </>
                        }
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    )

    return (
        <>
            <button
                type="button"
                onClick={() => setShowModal(true)}>
                <svg className="w-4 h-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12"><title>pen</title><g strokeWidth="1" fill="#000000" stroke="#000000" className="nc-icon-wrapper"><line x1="8" y1="2" x2="10" y2="4" fill="none" strokeLinecap="round" stroke-linejoin="round" data-color="color-2"></line><path d="M4,10l7.08-7.05A1.435,1.435,0,1,0,9.05.92L2,8,.5,11.5Z" fill="none" stroke="#000000" strokeLinecap="round" stroke-linejoin="round"></path></g></svg>
            </button>
            {showModal
                ? modal
                : null}
        </>
    );
}