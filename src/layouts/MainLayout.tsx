import { Outlet } from 'react-router-dom'
import Header from '../components/Header/Header'
import Notify from '../components/Notify'

const MainLayout = () => {
    return (
        <>
            <Header />
            <Notify />
            <Outlet />
        </>
    )
}

export default MainLayout
