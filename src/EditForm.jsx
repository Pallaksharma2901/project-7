import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditForm = () => {
    const param = useParams();
    const id = param.id;
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});
    const [add, setAdd] = useState(false)
    const [formErrors, setFormErrors] = useState({})
    const [isFormSubmitted, setIsFormSubmitted] = useState(false)
    const [data, setData] = useState(() => {
        return JSON.parse(localStorage.getItem('formData')) || [];
    });

    useEffect(() => {
        localStorage.setItem('formData', JSON.stringify(data || []))
        if (add) {
            navigate('/');
        }
    }, [data])

    useEffect(() => {
        if (id !== undefined && data[id]) {
            setFormData(data[id]);
        }
    }, [id, data]);

    const handleInputChange = (e) => {
        setFormErrors({})
        setFormData({ ...formData, [e.target.id]: e.target.value });
    }

    const handleGenderSelect = (e) => {
        setFormData({ ...formData, gender: e.target.value });
    }

    const handleCheckboxChecked = (e) => {
        const checkboxValue = e.target.value;
        const isChecked = e.target.checked;

        setFormData((prevFormData) => ({
            ...prevFormData,
            hobbies: isChecked
                ? [...prevFormData.hobbies, checkboxValue]
                : prevFormData.hobbies.filter(hobby => hobby !== checkboxValue),
        }));
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const errors = {};
        if (!formData.name.trim()) {
            errors.name = "Name is required";
        }
        if (!formData.password.trim()) {
            errors.password = "Password is required";
        }
        if (formData.hobbies.length < 1) {
            errors.hobbies = "Please select at least one option";
        }
        if (!formData.address.trim()) {
            errors.address = "Please write your address";
        }

        setFormErrors(errors);
        setIsFormSubmitted(true);
        setAdd(true);

        if (Object.keys(errors).length === 0) {
            const updatedData = [...data];
            updatedData[id] = formData;
            setData(updatedData);
        }

      
    }

    console.log(formData);

    return (
        <div className='flex flex-col items-center justify-center'>
            <h1 className='text-4xl text-sky-700 font-semibold my-3'>Edit User</h1>
            <form className="bg-gray-50 w-4/12 mx-auto mb-10 p-5 rounded shadow-lg border border-sky-600" onSubmit={handleFormSubmit}>
                <div className="mb-5">
                    <label htmlFor="name" className="block mb-2 text-md font-medium text-gray-900">Your name</label>
                    <input
                        type="text" id="name"
                        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-600 focus:border-sky-600 block w-full p-2.5 ${formErrors.name ? 'border-red-500' : ''}`}
                        placeholder="John smith" required value={formData.name || ''}
                        onChange={handleInputChange}
                    />
                    {isFormSubmitted && formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
                </div>
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-md font-medium text-gray-900">Your email</label>
                    <input type="email" id="email" className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-600 focus:border-sky-600 block w-full p-2.5 ${formErrors.email ? 'border-red-500' : ''}`} placeholder="name@flowbite.com" required
                        onChange={handleInputChange} value={formData.email || ''}
                    />
                    {isFormSubmitted && formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-md font-medium text-gray-900">Your password</label>
                    <input type="password" id="password" className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-600 focus:border-sky-600 block w-full p-2.5 ${formErrors.password ? 'border-red-500' : ''}`} required
                        onChange={handleInputChange} value={formData.password || ''}
                    />
                    {isFormSubmitted && formErrors.password && <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>}
                </div>
                <div className="mb-5">
                    <h6 className="block mb-2 text-md font-medium text-gray-900">Gender</h6>
                    <div className='flex gap-4'>
                        <div className='flex items-center'>
                            <input id="gender-1" type="radio" name="gender" value='male' className="w-4 h-4 border-gray-300 focus:ring-1 focus:ring-sky-300" onChange={handleGenderSelect} required checked={formData.gender === 'male'} />
                            <label htmlFor="gender-1" className="block ms-2 text-sm font-medium text-gray-900">
                                Male
                            </label>
                        </div>
                        <div className='flex items-center'>
                            <input id="gender-2" type="radio" name="gender" value='female' className="w-4 h-4 border-gray-300 focus:ring-1 focus:ring-sky-300" onChange={handleGenderSelect} required checked={formData.gender === 'female'} />
                            <label htmlFor="gender-2" className="block ms-2 text-sm font-medium text-gray-900">
                                Female
                            </label>
                        </div>
                        <div className='flex items-center'>
                            <input id="gender-3" type="radio" name="gender" value='other' className="w-4 h-4 border-gray-300 focus:ring-1 focus:ring-sky-300" onChange={handleGenderSelect} required checked={formData.gender === 'other'} />
                            <label htmlFor="gender-3" className="block ms-2 text-sm font-medium text-gray-900">
                                Other
                            </label>
                        </div>
                    </div>
                    {isFormSubmitted && formErrors.gender && <p className="text-red-500 text-sm mt-1">{formErrors.gender}</p>}
                </div>
                <div className="mb-5">
                    <label className="block mb-2 text-md font-medium text-gray-900">Your Hobbies</label>
                    <div className='flex items-center gap-4'>
                        <div className="flex items-center">
                            <input type="checkbox" className={`w-4 h-4 text-sky-600 bg-gray-100 border-gray-300 rounded focus:ring-sky-500 focus:ring-2`} checked={formData.hobbies?.includes('Reading')}
                                value={'Reading'} onChange={handleCheckboxChecked} />
                            <label className="ms-2 text-sm font-medium text-gray-900">Reading</label>
                        </div>
                        <div className="flex items-center">
                            <input type="checkbox" className={`w-4 h-4 text-sky-600 bg-gray-100 border-gray-300 rounded focus:ring-sky-500 focus:ring-2`} checked={formData.hobbies?.includes('Singing')}
                                value={'Singing'} onChange={handleCheckboxChecked} />
                            <label className="ms-2 text-sm font-medium text-gray-900">Singing</label>
                        </div>
                        <div className="flex items-center">
                            <input type="checkbox" className={`w-4 h-4 text-sky-600 bg-gray-100 border-gray-300 rounded focus:ring-sky-500 focus:ring-2`} checked={formData.hobbies?.includes('Coding')}
                                value={'Coding'} onChange={handleCheckboxChecked} />
                            <label className="ms-2 text-sm font-medium text-gray-900">Coding</label>
                        </div>
                        <div className="flex items-center">
                            <input type="checkbox" className={`w-4 h-4 text-sky-600 bg-gray-100 border-gray-300 rounded focus:ring-sky-500 focus:ring-2`} checked={formData.hobbies?.includes('Other')}
                                value={'Other'} onChange={handleCheckboxChecked} />
                            <label className="ms-2 text-sm font-medium text-gray-900">Other</label>
                        </div>
                    </div>
                    {isFormSubmitted && formErrors.hobbies && <p className="text-red-500 text-sm mt-1">{formErrors.hobbies}</p>}
                </div>
                <div className="mb-5">
                    <label htmlFor="course" className="block mb-2 text-sm font-medium text-gray-900">
                        Select your Course
                    </label>
                    <select id="course" className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5`} onChange={handleInputChange} required value={formData.course}>
                        <option value=''>Choose Course</option>
                        <option value="react">React</option>
                        <option value="php">Php</option>
                        <option value="java">Java</option>
                        <option value="python">Python</option>
                    </select>
                </div>
                <div className="mb-5">
                    <div>
                        <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900">Your Address</label>
                        <textarea id="address" rows={4} className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 ${formErrors.address ? 'border-red-500' : ''}`} placeholder="Xyz Street, USA." defaultValue={""} onChange={handleInputChange} required value={formData.address || ''} />
                        {isFormSubmitted && formErrors.address && <p className="text-red-500 text-sm mt-1">{formErrors.address}</p>}
                    </div>
                </div>
                <button type="submit" className="text-white bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Update</button>
            </form>
        </div>
    )
}

export default EditForm;