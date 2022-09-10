import { Navbar } from "../../components/navbar"
import { Sidebar } from "../../components/sidebar";
import { Outlet } from "react-router-dom";
import React, { useContext, useState, useEffect } from "react"

import AuthContext, { ShiftProvider, SocketsProvider } from "../../context/AuthProvider";

import { io } from "socket.io-client";
import { Alert } from "../../components/alert";
import { AlertsContainer } from "../../components/alertscontainer";


const groupToString = {
    "employee": "Pracownik",
    "admin": "Administrator"
}

const Layout = () => {
    const user = useContext(AuthContext);

    return (
        <ShiftProvider>
            <div className="h-full flex flex-col">
                <Navbar group={groupToString[user.auth.data.group]}></Navbar>
                <div className="flex flex-1 min-h-0">
                    <div className="flex-initial">
                        <Sidebar />
                    </div>
                    <div className="flex-initial overflow-auto">
                        <div className="w-full">
                            <Outlet />
                            <AlertsContainer />
                        </div>
                    </div>
                </div>
            </div>
        </ShiftProvider>
    )
}

export default Layout;