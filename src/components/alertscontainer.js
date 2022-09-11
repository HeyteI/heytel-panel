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
            <Alert type="info" title="Info" message="Opłata za pokój 105 uregulowana pomyślnie." id="alert-4" />
            <Alert type="warning" title="Info" message="Czujnik dymu uruchomiony w pokoju 207!" id="alert-2" />
            <Alert type="alert" title="Info" message="Opłata za pokój 105 nie została jeszcze uregulowana!" id="alert-3" />
            <Alert type="info" title="Info" message="Wiadomość od pracownika Mateusz Gubek: Udaj się do pokoju 113, jest jakaś usterka!" id="alert-1" />
        </div>
    );
}
