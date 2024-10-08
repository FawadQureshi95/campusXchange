import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const ToastConfiguration = () => {
    return (
        <>
            <ToastContainer
                className="custom-toast"
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    )
}
export default ToastConfiguration
