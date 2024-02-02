'use client'

import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {HelperContext} from "@/contexts/HelperContext";

export default function DataCheckComponent({callback, countryList}) {

    const {setIsLoading} = useContext(HelperContext);

    const [selectedCountry, setSelectedCountry] = useState('tr');
    const [selectedYear, setSelectedYear] = useState(2024);
    const [holidayList, setHolidayList] = useState({});



    const handleFetchData = async (country, year) => {

        setIsLoading(true);

        await axios.get(`https://date.nager.at/api/v2/publicholidays/${year}/${country}`).then((res) => {

            callback(res.data);

        }).catch((err) => {

            console.log(err);

        }).finally(() => {
            setIsLoading(false);
        });
    }

    return (
        <>
            <div className="bg-white shadow-md w-full p-7 element-radius">
                <div className="flex flex-row items-start gap-6">
                    <div className="flex flex-col w-2/4">
                        <div>
                            <label className="text-title">Ülke</label>
                        </div>
                        <select id="country" name="country" onChange={(e) => setSelectedCountry(e.target.value)}
                                className="styled-select" value={selectedCountry} >
                            {
                                countryList && Object.keys(countryList).map((item, index) => (
                                    <option key={index} value={item} defaultValue={'tr'}
                                            >{countryList[item].name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <div>
                            <label className="text-title">Yıl</label>
                        </div>
                        <input type="number" name="year" onChange={(e) => setSelectedYear(e.target.value)}
                               className="styled-input element-radius" value={selectedYear}/>
                    </div>
                    <div className="flex flex-col justify-between items-end mt-auto">
                        <button type="submit"
                                className="styled-button"
                                onClick={() => handleFetchData(selectedCountry, selectedYear)}>
                            GETİR
                        </button>
                    </div>
                    {
                        !countryList && (<div className="absolute right-0 top-0 backdrop-blur-sm opacity-55 w-full h-full"/>)
                    }
                </div>
            </div>
        </>
    )

}