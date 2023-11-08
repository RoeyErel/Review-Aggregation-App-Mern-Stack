import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const toastMessage = (MessageType, position) => {
    if(MessageType == 'success'){
        toast.success('Invaild credentails', {
            position: position,
            autoClose: 3300,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }else{
        toast.error('Invaild credentails', {
            position: position,
            autoClose: 3300,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        }); 
    }
}

export {toastMessage}