import React, { useContext, useEffect, useState } from "react";
import axios from "../.././api/axios";
import AuthContext from "../../context/AuthProvider";

import { LoadingSpinner } from "../../components/loading";

import { RoomsBox } from "../../components/rooms/roomsbox";
import { RoomsCard } from "../../components/rooms/roomscard";

// Big thanks to MattMatt from Reactiflux discord, who helped me figure this out

const Rooms = () => {
    const user = useContext(AuthContext);

    const [floors, setFloors] = useState([]);
    const [loading, setLoading] = useState(false);

    const getFloorsCount = async () => {
        let r = await axios.get("/api/secured/room/floors", {
            withCredentials: true,
            proxy: "http://localhost:8080",
            headers: {
                "Content-Type": "application/json",
                Authorization: user.auth.accessToken,
            },
        });
        return parseInt(r.data.data);
    };

    const fetchFloor = async ({ floorNumber }) => {
        return axios.get(`/api/secured/room/floor/${floorNumber}`, {
            withCredentials: true,
            proxy: "http://localhost:8080",
            headers: {
                "Content-Type": "application/json",
                Authorization: user.auth.accessToken,
            },
        });
    };

    useEffect(() => {
        const fetchAllRooms = async () => {
            try {
                setLoading(true);

                const floorsCount = await getFloorsCount(); // Fetch the floorsCount

                if (isNaN(floorsCount)) return; // Check if floorsCount is a number

                const promiseArr = Array(floorsCount)
                    .fill(undefined)
                    .map((_, index) => fetchFloor({ floorNumber: index+1 })); // Create an array of undefined based on the amount of floors, then map over the array and replace the undefined values with a Promise for each floor

                const data = await Promise.all(promiseArr); // Await and resolve all promises
                setFloors(data);
                 // Promise.all returns an array of values, each item in the array I presume is an array of rooms per floor
            } catch (e) {
                console.log("error: ", e); // Handle your errors here
            } finally {
                setLoading(false);
            }
        };

        fetchAllRooms(); // Defined an async function in a useEffect, we call this once the component mounts
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {floors.map((floor, index) => {
                if (loading) {
                    return <LoadingSpinner key={`loading-${index}`} />;
                }

                if (floors.length === 0) {
                    return <span key={`no-floors-found-${index}`}>No floors found</span>;
                }

                return (
                    <RoomsBox
                        key={`floor-${index}`}
                        title={`Piętro ${index+1}`}
                        uri={`rooms/floor_${index+1}`}
                        floor={index+1}
                    >
                        {floor.data.data.length === 0 ? (
                            <span key={`no-rooms-${index}`}>Brak danych</span>
                        ) : (
                            floor.data.data.sort((a, b) => Number(b.number) - Number(a.number)).reverse().map((room) => {
                                return (
                                    <div key={`${floor.ID}-${room.ID}`} className="flex">
                                        <RoomsCard key={room.ID} id={room.ID} number={room.number} available={room.available} title={room.title} />
                                    </div>
                                );
                            })
                        )}
                    </RoomsBox>
                );
            })}
        </>
    );
};

export default Rooms;