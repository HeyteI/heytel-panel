import { Navbar } from "../../components/navbar"
import { Sidebar } from "../../components/sidebar";

const Layout = () => {
    return (
        <div>
            <Navbar profile_picture="https://mymodernmet.com/wp/wp-content/uploads/2019/09/100k-ai-faces-6.jpg" name="Maciej Binder" group="Pracownik"></Navbar>
            <Sidebar />
        </div>
    )
}

export default Layout;