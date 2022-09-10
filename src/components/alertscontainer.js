import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { SocketsContext } from "../context/AuthProvider";
import { Alert } from "./alert";

export const AlertsContainer = (props) => {
    const [alerts, setAlerts] = useState([]);
    const [socket, setSocket] = useContext(SocketsContext)


    useEffect(() => {
        console.log(socket)
        socket.on("getNotification", (data) => {
            console.log(data)
            setAlerts((prev) => [...prev, data]);
        });
    }, [socket]);

    return (
        <div className="flex flex-col fixed bottom-0 right-0 mb-5 mr-5">
            <Alert type="info" title="Info" message="Udało się!" id="alert-1" />
            <Alert type="alert" title="Info" message="Udało się!" id="alert-2" />
            <Alert type="warning" title="Info" message="Udało się!" id="alert-3" />
        </div>
    );
}
