import { useEffect, useState } from "react";
import Table from "./Table";
import { useNavigate } from "react-router-dom";

const UserList = () => {
    const [data, setData] = useState(()=>{
        return JSON.parse(localStorage.getItem('formData')) || [];
    });
    const navigate = useNavigate();

    return (
        <>
            <h1 className="text-4xl text-center mt-8 mb-8 font-semibold text-sky-700">All User list...</h1>
            <div className="w-8/12 m-auto">
                <Table data={data} />
                <div className="flex items-center justify-center mt-6">
                    <button className="py-2 px-5 bg-blue-600 text-lg text-white rounded hover:bg-blue-800" onClick={()=>navigate('/add')}>
                        Add User
                    </button>
                </div>
            </div>
        </>
    )
}

export default UserList