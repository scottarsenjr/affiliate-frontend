import {createBrowserRouter} from "react-router-dom";
import {Paths} from "@/app/routes/routes.ts";
import MainPage from "@/pages/main";

const router = createBrowserRouter([
    {
        path: Paths.main,
        element: <MainPage/>
    }
])

export default router;
