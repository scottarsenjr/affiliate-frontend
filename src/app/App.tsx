import './App.scss';
import router from '@/app/routes/router.tsx';
import { RouterProvider } from "react-router-dom";

function App() {
    return (
        <RouterProvider router={router} />
    )
}

export default App;
