import SideBarLink from "./navlink"
import React from "react"

export function Sidebar() {
    return (
        <aside className="w-64 h-full bottom-0 top-0 left-0 md:block hidden shadow-md mr-2" aria-label="Sidebar" id="sidebar">
            <div className="py-4 px-3 bg-white text-gray-400">
                <ul className="space-y-2">
                    <li>
                        <SideBarLink title="Pokoje" href="/rooms" icon="armchair" />
                    </li>
                    <li>
                        <SideBarLink title="Rezerwacje" href="/reservations" icon="calendar" />
                    </li>
                    <li>
                        <SideBarLink title="Zameldowania" href="/invoices" icon="check" />
                    </li>
                    <li>
                        <SideBarLink title="Monitoring" href="/cameras" icon="camera" />
                    </li>
                    <li>
                        <SideBarLink title="Restauracja" href="/restaurant" icon="restaurant" />
                    </li>
                    <li>
                        <SideBarLink title="Powiadomienia" href="/notifications" icon="alarm" />
                    </li>
                    <li>
                        <SideBarLink title="Ustawienia" href="/settings" icon="cogwheel" />
                    </li>
                </ul>
            </div>
        </aside>
    )
}