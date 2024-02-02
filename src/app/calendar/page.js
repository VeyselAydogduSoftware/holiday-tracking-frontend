'use client'
import DataCheckComponent from "@/components/DataCheckComponent";
import ItemCartComponent from "@/components/ItemCartComponent";
import {HelperContext} from "@/contexts/HelperContext";
import {useContext, useEffect, useState} from "react";
import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Spinner,
    useDisclosure
} from "@nextui-org/react";
import apiRequest from "@/hooks/apiRequest";
import moment from "moment/moment";


export default function home() {

    const {dateList, setDateList, isLoading, setIsLoading, handleAlert} = useContext(HelperContext);

    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [modalStatus, setModalStatus] = useState(false);
    const [clendarData, setCalendarData] = useState();
    const [sendForm, setSendForm] = useState(false);
    const [alert, setAlert] = useState();
    const [editData, setEditData] = useState({
        id: '',
        date: '',
        name: '',
        note: '',
    });

    const handleOpenModal = () => {
        onOpen();
        setModalStatus(true);
    }

    const handleFetchData = async () => {
        setIsLoading(true);
        try {
            const response = await apiRequest.get('holidays');
            setCalendarData(response.data);
        } catch (error) {
            handleAlert('error', 'Birşeyler ters gitti.')
        } finally {
            setIsLoading(false);
        }

    }

    const handleEditData = async (data) => {

        try {
            const response = await apiRequest.get(`holidays/${data.id}`);
            setEditData({
                id: data.id,
                date: response.data.date,
                name: response.data.name,
                note: response.data.note,
            });
            handleOpenModal();
        }catch (error) {
            handleAlert('error', 'Birşeyler ters gitti.')
        }

        handleOpenModal();

    }

    const handleUpdateData = async () => {
        setSendForm(true);
        try {
            const response = await apiRequest.put(`holidays/${editData.id}`, editData);
            handleFetchData();

            onOpenChange();
            setSendForm(false);
            handleAlert('success', 'İşlem başarılı.')
        } catch (error) {
            setSendForm(false);
            handleAlert('error', 'Birşeyler ters gitti.')
        }
    }

    useEffect(() => {
        if (isOpen) {
            setModalStatus(true);
        } else {
            setModalStatus(false);
        }
    }, [isOpen]);

    useEffect(() => {
        handleFetchData();
    }, []);



    return (
        <>
            {
                modalStatus && (
                    <div className="absolute right-0 top-0 bg-gray-800 opacity-55 w-full h-full"/>
                )
            }

            {
                isLoading && (
                    <div className="flex justify-center items-center mx-auto mt-10">
                        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
                    </div>
                )
            }

            {

                clendarData && clendarData.map((item, index) => (
                    <ItemCartComponent key={index}
                                       type={'edit'}
                                       date={moment(item.date).format('DD MMMM YYYY')}
                                       description={item.name}
                                       data={item}
                                       callback={(e) => handleEditData(e)}/>
                ))
            }

            <Modal size={'3xl'} isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent className="bg-white shadow-2xl rounded-md">
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Düzenle</ModalHeader>
                            <ModalBody className="flex flex-col">
                                <div className="flex flex-row justify-between gap-2">
                                    <div className="w-2/4">
                                        <label className="text-title">Tarih</label>
                                        <input type="date"
                                               name="date"
                                               defaultValue={editData.date}
                                               onChange={(e) => setEditData({...editData, date: e.target.value})}
                                               className="styled-input element-radius "/>
                                    </div>
                                    <div className="w-2/4">
                                        <label className="text-title">Title</label>
                                        <input type="text"
                                               name="date"
                                               defaultValue={editData.name}
                                               onChange={(e) => setEditData({...editData, name: e.target.value})}
                                               className="styled-input element-radius "/>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-title">
                                        Not Ekle
                                    </label>
                                    <textarea className="styled-textarea element-radius" defaultValue={editData.note ?? ''}
                                                onChange={(e) => setEditData({...editData, note: e.target.value})}></textarea>
                                </div>
                            </ModalBody>
                            <ModalFooter className="flex-row justify-between">
                                <Button className="font-bold" color="danger" variant="light" onPress={onClose}>
                                    İptal
                                </Button>
                                <Button className={sendForm ? 'styled-button-disabled' : 'styled-button'} onPress={() => handleUpdateData()}>
                                    Kaydet
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}