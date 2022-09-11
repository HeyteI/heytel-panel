import { Card } from "../../components/index/card"
import { Chart } from "../../components/index/chart"
import { Discountcard } from "../../components/index/discountcard"
import { Closestcheckins } from "../../components/index/closestcheckins"
import { Closestcheckinscard } from "../../components/index/closestcheckinscard"
import { Notifications } from "../../components/index/notifications"
import { Notificationscard } from "../../components/index/notificationscard"
import { Discounts } from "../../components/index/discounts"
import { useEffect, useState, useContext } from "react"

import axios from "../../api/axios"
import AuthContext from "../../context/AuthProvider"
import { ShiftContext } from "../../context/AuthProvider"
import { isToday } from "../../utils/date"
import PreviousMap from "postcss/lib/previous-map"

const Index = () => {
    const user = useContext(AuthContext);
    const shift = useContext(ShiftContext)


    const [data, setData] = useState({ master: { general: {}, discounts: [], closestcheckins: [], notifications: [] } })

    const [shiftTime, setShiftTime] = useState("...")
    const [isLoading, setLoading] = useState(false)

    const fetchAllInvoices = async () => {
        return axios.get(`/api/secured/invoice/all`, {
            withCredentials: true,
            proxy: "http://localhost:8080",
            headers: {
                "Content-Type": "application/json",
                Authorization: user.auth.accessToken,
            },
        })
    }

    const fetchAllDiscounts = async () => {
        return axios.get(`/api/secured/discounts/all`, {
            withCredentials: true,
            proxy: "http://localhost:8080",
            headers: {
                "Content-Type": "application/json",
                Authorization: user.auth.accessToken,
            },
        })
    }

    const fetchNotifications = async (user_id) => {
        return axios.get(`/api/secured/notifications/all/${user_id}`, {
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
                setLoading(false)
                let allInvoices = (await fetchAllInvoices()).data.data
                console.log(allInvoices)

                let peopleCount = 0
                let todaysCheckins = 0

                allInvoices.forEach(element => {
                    const today = new Date()
                    let date_range = element.date_range.split("/")
                    const from = Date.parse(date_range[0])
                    const to = Date.parse(date_range[1])
                    
                    console.log((today <= to && today >= from))
                    if ((today <= to && today >= from)) peopleCount += element.people_count

                    if (isToday(new Date(from))) todaysCheckins += 1
                });

                console.log(allInvoices)

                return [{ people_count: peopleCount, todays_checkins: todaysCheckins }, allInvoices]
            } catch (e) {
                console.error(e)
            } finally {
                setLoading(false)
            }
        }

        const setAllData = async () => {
            try {
                setLoading(true)

                let [general, invoices] = await fetchGeneral()  // There are additional checks in this function
                let discounts = (await fetchAllDiscounts()).data.data
                let notifications = (await fetchNotifications(user.auth.data.ID)).data.data

                invoices.sort((prev, next) => {
                    const [prevArrivingDate] = prev.date_range.split('/');
                    const [nextArrivingDate] = next.date_range.split('/');

                    return new Date(prevArrivingDate).getTime() - new Date(nextArrivingDate).getTime()
                })

                invoices = invoices.filter(elem => {return elem.date_range && (new Date(elem.date_range.split('/')[0]).getTime() > Date.now())})
                invoices = invoices.slice(0, 5)

                setData({ master: { general: general, discounts: discounts, closestcheckins: invoices, notifications: notifications } })
            } catch (e) {
                console.error(e)
            } finally {
                setLoading(false)
            }
        }

        setAllData()
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (Object.keys(shift[0]).length !== 0) {
            const calcShiftEnd = () => {
                let now = new Date()
                let work_time = new Date(shift[0].work_time)
                let diff = work_time - now

                let hours = Math.floor(diff / 1000 / 60 / 60)
                let minutes = Math.floor(diff / 1000 / 60 % 60)

                if (diff > 0) {   
                    setShiftTime(`${hours} h ${minutes} min`)
                } else {
                    setShiftTime(`Zmiana skończyła się ${Math.abs(hours)}h ${Math.abs(minutes)}min temu`)
                }
            }

            const interval = setInterval(() => calcShiftEnd(), 1000);  // every 20sec
            return () => {
                clearInterval(interval);
            }
        } else {
            setShiftTime("...")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shift])

    useEffect(() => {
        const fetchAllNotifications = async () => {
            try {
                setLoading(true)
                let notifications = (await fetchNotifications(user.auth.data.ID)).data.data
                setData({ master: { general: data.master.general, discounts: data.master.discounts, closestcheckins: data.master.closestcheckins, notifications: notifications } })
            } catch(e) {
                console.error(e)
            } finally {
                setLoading(false)
            }
        }

        const interval = setInterval(() => fetchAllNotifications(), 50000);  // every 50sec
        return () => {
            clearInterval(interval);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    return (
        <>
            <div className="flex w-full">
                <div className="flex ml-32 gap-2">
                    <Card icon="guests" color="guests" info={data.master.general.people_count} text="Liczba gości" loading={isLoading}></Card>
                    <Card icon="checkins" color="checkins" info={data.master.general.todays_checkins} text="Dzisiejsze zameldowania" loading={isLoading}></Card>
                    <Card icon="restaurant" color="restaurant" info="?" text="Liczba wolnych miejsc w restauracji" loading={isLoading}></Card>
                    <Card icon="clock" color="clock" info={shiftTime} text="Czas do końca zmiany" loading={isLoading}></Card>
                </div>
            </div>
            <div className="flex gap-2 w-full">
                <div className="flex">
                    <Chart />
                </div>
                <div className="flex">
                    <Discountcard data={data} setData={setData}>
                        {data.master.discounts.map((discount, index) => {
                            return <Discounts key={index} discount={discount.value} text={discount.name} />
                        })}
                    </Discountcard>
                </div>
            </div>
            <div className="flex gap-2 w-full">
                <div className="flex">
                        <Closestcheckinscard>
                            {data.master.closestcheckins.map((checkin, index) => {
                                return <Closestcheckins key={index} checkin={checkin} />
                            })}
                        </Closestcheckinscard>
                        <Notificationscard>
                            {data.master.notifications.map((notification, index) => {
                                return <Notifications key={index} text={notification.message} type={notification.type} loading={isLoading} />
                            })}
                        </Notificationscard>
                    </div>
            </div>
        </>
    )
};

export default Index;