import { Bar } from 'react-chartjs-2';
import { useEffect, useContext, useState } from "react"

import axios from '../../api/axios';
import AuthContext from "../../context/AuthProvider"
import { GetHighestOccurrence } from '../../utils/extendedArrays';

import { default as ChartJs } from 'chart.js/auto'
import { createRef } from 'react';

export function Chart(props) {
    const user = useContext(AuthContext);
    const [data, setData] = useState({ master: { datasets: [], labels: [] } })

    const fetchAllRooms = async () => {
        return axios.get(`/api/secured/room/all`, {
            withCredentials: true,
            proxy: "http://localhost:8080",
            headers: {
                "Content-Type": "application/json",
                Authorization: user.auth.accessToken,
            },
        })
    }

    const createChart = (datasets, labels) => {
        console.log(datasets)

        return new ChartJs(document.getElementById("roomsChart").getContext('2d'), {
            type: "bar",
            data: {
                labels: labels,
                datasets: datasets
            },
            beginAtZero: true,
            options: {
                responsive: true,
                aspectRatio: 2,
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: "Dostępność pokoi",
                        position: "top"
                    },
                },
                scales: {
                    y: {
                        suggestedMin: 0,
                        suggestedMax: 6,
                        
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        })
    }

    useEffect(() => {
        const getAllData = async () => {
            try {
                const rooms = (await fetchAllRooms()).data.data

                let allTitles = []

                rooms.forEach(element => {
                    allTitles.push(element.title)
                })

                const labels = GetHighestOccurrence(allTitles, 4)

                let tempData = {}

                rooms.forEach(element => {
                    if (labels.includes(element.title) && element.available) {
                        tempData[element.title] = (tempData[element.title] || 0) + 1
                    } else if (labels.includes(element.title) && !element.available) {
                        tempData[element.title] = (tempData[element.title] || 0) + 0
                    }
                })

                console.log(tempData)

                let datasets = [{
                    barPercentage: 0,
                    barThickness: 80,
                    borderRadius: 4,
                    maxBarThickness: 100,
                    backgroundColor: "rgb(115,45,221)",
                    data: Object.values(tempData),
                }]

                // for (const [key, value] of Object.entries(tempData)) {
                //     datasets.push({
                //         label: key,
                //         data: Object.values(tempData),
                //         backgroundColor: 'rgb(115, 45, 221)'
                //     })
                // }

                const lastChart = ChartJs.getChart("roomsChart")
                if (lastChart !== undefined) lastChart.destroy()

                let createdChart = createChart(datasets, labels)

                setData({ master: { datasets: datasets, labels: labels } })
            } catch (e) {
                console.log(e)
            }
        }
        getAllData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="chart">
            <div className="box-border w-[64rem] h-82 mt-5 ml-36 border border-[#D9D9D9] shadow-lg rounded-md">
                <div className="chart-container ml-3 mb-px w-[40rem]">
                    {/* <Bar options={chartOptions} data={data.master} /> */}
                    <canvas
                        id="roomsChart"
                    />
                </div>
            </div>
        </div>
    )
}