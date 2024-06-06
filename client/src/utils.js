import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';


const toastMessage = (MessageType, position, message) => {
    if(MessageType === 'success'){
        toast.success(message, {
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
        toast.error(message, {
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

const rowSlider = (side, rowID) => {
    if(side === 'left'){
        let slider = document.getElementById('slider' + rowID)
        slider.scrollLeft = slider.scrollLeft - 500
    }else{
        let slider = document.getElementById('slider' + rowID)
        slider.scrollLeft = slider.scrollLeft + 500
    }
}

const turncateStrting = (str, num) => {
    if(str?.length > num){
        if(str?.length > 401){
            return str.slice(0,num)+"...";
        }
        return str.slice(0,num);
    }else if(num === -1){
        return str
    }else{
        return str
    }
}

export { toastMessage, rowSlider, turncateStrting }