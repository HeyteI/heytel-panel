import { useState } from "react"
import { useContext } from "react"
import { useEffect } from "react"
import axios from "../../api/axios"
import AuthContext from "../../context/AuthProvider"

function SkeletonLoadingClosestCheckins() {
    return (
        <div className="closestcheckins">
            <div className="flex flex-row items-center ml-3 my-1.5 animate-pulse">
                <div className="float-left">
                    <div className="flex items-center">
                        <div className="flex relative h-9 w-9 bg-white">
                            <div className="absolute flex items-center justify-center h-9 w-9 bg-slate-200 rounded-full"></div>
                        </div>
                    </div>
                </div>
                <h1 className="ml-5 text-center font-thin py-3">
                    <div className="h-2.5 w-52 bg-slate-200 rounded"></div>
                </h1>
            </div>
            <div className="h-px w-full border border-[#D9D9D9]"></div>
        </div>
    )
}

export function Closestcheckins(props) {
    const user = useContext(AuthContext)
    const [data, setData] = useState({})

    const [loading, setLoading] = useState(false)

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
                setLoading(true)
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
            } finally {
                setLoading(false)
            }
        }
        fetchGeneral()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.checkin])

    return (
        <>
        {loading 
        ? <SkeletonLoadingClosestCheckins />
                : <div className="closestcheckins">
                    <div className="flex flex-row items-center ml-3">
                        <div className="float-left">
                            <div className="bg-violet-700 text-white rounded-full flex items-center justify-center w-9 h-9 text-md">
                                {data.number}
                            </div>
                        </div>
                        <h1 className="ml-5 text-center font-thin py-3">
                            {data.text}
                        </h1>
                    </div>
                    <div className="h-px w-full border border-[#D9D9D9]"></div>
                </div>
        }
        </>
    )
}