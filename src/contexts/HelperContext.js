'use client'
import {createContext, useState} from "react";
import Swal from "sweetalert2";
import { useRouter } from 'next/navigation';

export const HelperContext = createContext();
export const HelperProvider = ({children}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [dateList, setDateList] = useState(null);
    const handleAlert = (type, message, route) => {
        switch (type) {
            case 'success':
                Swal.fire({
                    icon: 'success',
                    title: 'Başarılı!',
                    text: message
                }).then((result) => {
                    if(route){
                        router.push('/calendar');
                    }
                });
                break;
            case 'error':
                Swal.fire({
                    icon: 'error',
                    title: 'Hata!',
                    text: message
                });
                break;
            default:
                break;
        }
    }
    return (
        <HelperContext.Provider value={{
            isLoading,
            setIsLoading,
            dateList,
            setDateList,
            handleAlert
        }}>

            {children}
        </HelperContext.Provider>
    )
}
