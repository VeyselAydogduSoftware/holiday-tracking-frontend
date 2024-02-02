import {Checkbox} from "@nextui-org/checkbox";


export default function ItemCartComponent({type, date, description, callback, data}) {

    return (
        <div className="flex justify-between items-center bg-white p-6 rounded mt-4 shadow-lg">
            <div className="flex flex-col">
                <div className="mb-1">
                    <span className="text-title">
                        {date}
                    </span>
                </div>
                <div>
                    <span className="font-bold">
                        {description}
                    </span>
                </div>
            </div>
            <div className="">
                {
                    type === 'edit' ?
                        <button className="styled-outline-button" onClick={() => callback(data)}>
                            DÜZENLE
                        </button>
                    :
                        <Checkbox color="secondary" size="md" onChange={(e) => {
                            if(e.target.checked)
                                callback({'type' : 'add', 'data' : data});
                            else
                                callback({'type' : 'remove', 'data' : data});
                        }} ></Checkbox>

                }
            </div>
        </div>
    );


}