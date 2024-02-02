'use client'
import DataCheckComponent from "@/components/DataCheckComponent";
import ItemCartComponent from "@/components/ItemCartComponent";
import {HelperContext} from "@/contexts/HelperContext";
import {useContext, useEffect, useState} from "react";
import moment from "moment";
import 'moment/locale/tr';
import { useRouter } from 'next/navigation';
import apiRequest from "@/hooks/apiRequest";
import axios from "axios";


export default function home() {

    const {dateList, setDateList, isLoading, setIsLoading, handleAlert} = useContext(HelperContext);
    const [countries, setCountries] = useState();
    const [selectedDate, setSelectedDate] = useState([]);
    const fetchCountryList = async () => {

        await axios.get("https://countryapi.io/api/all?apikey=arFv6zgGQkS24hKqSeowj1j6cfs8H1BcUKHSw4v1").then((res) => {

            setCountries(res.data);

        }).catch((err) => {

            handleAlert('error', 'Birşeyler ters gitti.')

        });

    }
    useEffect(() => {
        fetchCountryList();
    }, []);
    const handleImport = async () => {

        setIsLoading(true);

        let data = new FormData();
        data.append('data', JSON.stringify(selectedDate));

        try {
            const response = await apiRequest.post('holidays', data);
            handleAlert('success', 'Aktarma işlemi başarılı.', 'calendar')
        } catch (error) {
            console.log(error)
            handleAlert('error', 'Birşeyler ters gitti.')
        } finally {
            fetchCountryList();
            setIsLoading(false);
        }



    }

    return (
        <>

            <DataCheckComponent callback={(e) => setDateList(e)} countryList={countries} />

            {
                isLoading && (
                    <div className="flex justify-center items-center mx-auto mt-10">
                        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
                    </div>
                )
            }

            <div className="mb-24">
                {

                    dateList && dateList.map((item, index) => (
                        <ItemCartComponent key={index}
                                           type={'checkbox'}
                                           date={moment(item.date).format('DD MMMM YYYY')}
                                           description={item.localName}
                                           data={item}
                                           callback={(e) => {
                                               if(e.type === 'add')
                                                   setSelectedDate([...selectedDate, e.data]);
                                               else
                                                   setSelectedDate(selectedDate.filter((item) => item.date !== e.data.date));

                                           }}/>
                    ))
                }
            </div>


            {dateList && (
                <div className="fixed bottom-0 left-0 right-0 bg-white py-4 flex justify-center items-center">
                    <button className="styled-button" onClick={() => handleImport()}>
                        İÇERİ AKTAR
                    </button>
                </div>
            )}
        </>
    )
}