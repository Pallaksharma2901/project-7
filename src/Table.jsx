import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';

const Table = () => {
    const navigate = useNavigate();
    const [data, setData] = useState(() => {
        const storedData = JSON.parse(localStorage.getItem('formData'));
        return storedData || [];
    })
    const handleDelete = (index) => {
        const updatedData = [...data]
        updatedData.splice(index, 1)
        setData(updatedData);
        // onDelete(idx)
    }
    
    return (
        <>
            <div className="relative overflow-x-auto shadow-md">
                <table className="border border-sky-600 w-full text-sm text-left rtl:text-right">
                    <thead className="text-xs border-b border-sky-600 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Password
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Gender
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Hobbies
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Course
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Address
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((formData, idx) => {
                            return (
                                <tr className="bg-white hover:bg-gray-50" key={idx}>
                                    <td className="px-6 py-4 capitalize font-medium text-gray-900 whitespace-nowrap">
                                        {formData.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {formData.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        {formData.password}
                                    </td>
                                    <td className="px-6 py-4 capitalize">
                                        {formData.gender}
                                    </td>
                                    <td className="px-6 py-4 capitalize">
                                        {formData.hobbies.join(', ')}
                                    </td>
                                    <td className="px-6 py-4 capitalize">
                                        {formData.course}
                                    </td>
                                    <td className="px-6 py-4 capitalize">
                                        {formData.address}
                                    </td>
                                    <td className="flex items-center justify-center gap-4 h-100">
                                        <button className="mt-[7px] text-white rounded py-2 px-4 hover:bg-emerald-700 bg-emerald-600" onClick={()=>navigate(`/edit/${idx}`)}>Edit</button>
                                        <button className="mt-[7px] text-white rounded py-2 px-4 hover:bg-red-700 bg-red-500" onClick={ (idx) => handleDelete(idx)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                {/* <Table data={data} onEdit={onEdit ? (idx) => handleEdit(idx) : undefined} onDelete={onDelete ? (idx) => handleDelete(idx) : undefined} /> */}
            </div>
        </>
    )
}
export default Table;