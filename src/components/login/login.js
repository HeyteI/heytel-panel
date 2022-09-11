import React, { useRef, useState, useEffect, useContext } from 'react';

import AuthContext from "../../context/AuthProvider";
import { SocketsContext } from "../../context/AuthProvider";
import axios from '../../api/axios';
import { LoadingSpinner } from '../loading';
import { io } from "socket.io-client";
import { Alert } from "../alert"
import { AlertsContainer } from "../alertscontainer"


export function LoginContainer() {
    const { setAuth } = useContext(AuthContext);
    const [socket, setSocket] = useContext(SocketsContext);
    const userRef = useRef();
    const errRef = useRef();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [username, password])

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true)

        try {
            const response = await axios.post("/api/user/login",
                JSON.stringify({ username, password }),
                {
                    withCredentials: true,
                    proxy: 'http://localhost:8080',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            const accessToken = response?.data?.token;
            const data = response?.data?.info;
            setAuth({ username, password, data, accessToken });

            // sockets stuff
            const socket = io("ws://localhost:3002")
            setSocket(socket)
            socket.emit("newUser", data);

            // setSessionCookie({ username, password, data, accessToken })

            setUsername('');
            setPassword('');

            setIsLoading(false)
        } catch (err) {
            console.log(err)
            setIsLoading(false)

            if (!err?.response) {
                setErrMsg('Serwer nie odpowiada, skontaktuj się z administratorem');
            } else if (err.response?.status === 400) {
                setErrMsg('Musisz wpisać login i hasło');
            } else if (err.response?.status === 401) {
                setErrMsg('Hasło niepoprawne');
            } else if (err.response?.status === 404) {
                setErrMsg('Zły login');
            } else {
                setErrMsg('Coś poszło nie tak, skontaktuj się z administratorem');
            }
            errRef.current.focus();
        }
    }

    const login = (
        <>
            <div className="flex items-center text-center justify-center">
                <form className="px-8 pt-6 pb-8 mb-4 h-96 w-96" onSubmit={handleSubmit}>
                    <div className="box-border h-64 w-96 p-4 pt-30 border-2 rounded-md border-violet-700 w-full max-w-xs">
                        <h1 className="font-bold text-xl pb-3">Logowanie do systemu</h1>
                        <div className="w-full max-w-xs">
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-light mb-2" htmlFor="username">
                                    Login
                                </label>
                                <input
                                    className="shadow appearance-none border border-violet-700 rounded border-solid py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="username"
                                    type="text"
                                    placeholder="root"
                                    onChange={e => setUsername(e.target.value)}
                                    ref={userRef}
                                    autoComplete="off"
                                    required>
                                </input>
                            </div>
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-light mb-2" htmlFor="password">
                                    Hasło
                                </label>
                                <input
                                    className="shadow appearance-none border border-solid border-violet-700 rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    onChange={e => setPassword(e.target.value)}
                                    required>
                                </input>
                                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                            </div>
                            <div className="flex items-center justify-between">
                            </div>
                        </div>
                    </div>
                    <button className="bg-violet-700 hover:bg-violet-900 text-white font-light py-2 w-5/12 px-4 rounded-xl focus:outline-none focus:shadow-outline mt-4" type="submit">
                        Zaloguj
                    </button>
                </form>
            </div>
            <div class="fixed bottom-0 right-0 mr-3">
                {window.location.href.includes("?forbidden=true") ? <Alert type="alert" title="Info" message="Token wygasł. Zaloguj się ponownie." id="alert-forbidden" /> : <></>}
            </div>
        </>
    )
    return (
        <div className="app">
            {isLoading ? <LoadingSpinner></LoadingSpinner> : login}
        </div>
    )
}