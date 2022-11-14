import {Route, Routes} from "react-router-dom";
import App from "./App";
import Article from "./Article";


function AllRoutes() {
    return (
        <Routes>
            <Route path="/" element={<App/>} />
            <Route path="/article" element={<Article />} />
        </Routes>
    );
}

export default AllRoutes