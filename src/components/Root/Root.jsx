import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

const Root = () => {
    return (
        <main>
            <Header />
            <div>
                <Outlet/>
            </div>
        </main>
    );
};

export default Root;