import { Navbar } from "../../components/navbar"
import { Sidebar } from "../../components/sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <div class="">
            <Navbar profile_picture="https://mymodernmet.com/wp/wp-content/uploads/2019/09/100k-ai-faces-6.jpg" name="Maciej Binder" group="Pracownik"></Navbar>
            <div class="flex">
                <div class="flex">
                    <Sidebar />
                </div>
                <div class="flex-auto w-66">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Layout;