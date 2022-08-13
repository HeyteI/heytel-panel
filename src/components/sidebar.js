import { NavLink } from "react-router-dom"
import SideBarLink from "./navlink"

export function Sidebar() {
    return (
        <aside class="w-64 h-screen md:block hidden shadow-md" aria-label="Sidebar" id="sidebar">
            <div class="h-full overflow-y-auto py-4 px-3 bg-white text-gray-400">
                <ul class="space-y-2">
                    <SideBarLink title="Pokoje" href="/rooms" icon="armchair"></SideBarLink>
                    <SideBarLink title="Rezerwacje" href="/reservations" icon="calendar"></SideBarLink>
                    <SideBarLink title="Zameldowania" href="/invoices" icon="check"></SideBarLink>
                    <SideBarLink title="Monitoring" href="/cameras" icon="camera"></SideBarLink>
                    <SideBarLink title="Restauracja" href="/restaurant" icon="restaurant"></SideBarLink>
                    <SideBarLink title="Powiadomienia" href="/notifications" icon="alarm"></SideBarLink>
                </ul>
            </div>
        </aside>
    )
}