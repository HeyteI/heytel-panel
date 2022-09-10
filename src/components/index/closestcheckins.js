import { useState } from "react"
import { useContext } from "react"
import { useEffect } from "react"
import axios from "../../api/axios"
import AuthContext from "../../context/AuthProvider"

export function Closestcheckins(props) {
    const user = useContext(AuthContext)
    const [data, setData] = useState({})

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

    useEffect(() => {
        const fetchGeneral = async () => {
            try {
                const room = (await fetchRoomData(props.checkin.room_id)).data.data
                const invoice_user = (await fetchUserData(props.checkin.user_id)).data.data
                setData({
                    text: `${room.title} ${invoice_user.firstname[0]}. ${invoice_user.lastname}`,
                    number: room.number,
                    arriving: new Date(props.checkin.date_range.split("/")[0]),
                    departure: new Date(props.checkin.date_range.split("/")[1])
                })
            } catch (error) {
                console.log(error)
            }
        }
        fetchGeneral()
    }, [props.checkin])

    return (
        <div className="closestcheckins">
            <div className="flex flex-row justify-center items-center">
                <div className="bg-violet-700 text-white rounded-full flex items-center justify-center w-9 h-9 text-md">
                    {data.number}
                </div>
                <h1 className="ml-5 text-center font-thin py-3">
                    {data.text}
                </h1>
            </div>
            <div className="h-px w-full border border-[#D9D9D9]"></div>
            {props.children}
        </div>
    )
}