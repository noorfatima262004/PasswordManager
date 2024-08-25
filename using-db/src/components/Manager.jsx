import React, { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoDiceSharp } from 'react-icons/io5';

function Manager() {
    const passref = useRef();
    const imgref = useRef();
    const [form, setForm] = useState({ site: "", username: "", password: "" });
    const [dataArray, setdataArray] = useState([]);

    const getAllData = async() => {
        let req = await fetch("http://localhost:3000/");
        let res = await req.json();
        setdataArray(res);
        console.log(res);
    }
    useEffect(() => {
        getAllData();
    }, []);

    const showPassword = () => {
        if (passref.current.type === 'password') {
            passref.current.type = 'text';
            imgref.current.src = 'icons/eyecross.png';
        } else {
            passref.current.type = 'password';
            imgref.current.src = 'icons/eye.png';
        }
    };

    const saveData = async() => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            if(form.id){
                console.log(form.id);
            await fetch("http://localhost:3000/", { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({id:form.id}) });
            }
            const newData = { ...form, id: uuidv4() };
            const updatedDataArray = [...dataArray, newData];
            setdataArray(updatedDataArray);
            await fetch("http://localhost:3000/", { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newData) });
            setForm({ site: "", username: "", password: "" });
            toast.success('Password saved!', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else {
            toast.error('Error: Password not saved!');
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const deletePassword = async(id) => {
        const confirmDelete = window.confirm("Do you really want to delete this password?");
        if (confirmDelete) {
            const updatedData = dataArray.filter((item) => item.id !== id);
            setdataArray(updatedData);
            // localStorage.setItem('data', JSON.stringify(updatedData));
            await fetch("http://localhost:3000/", { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
            toast.success('Deleted Password!', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    };

    const editPassword = async(id) => {
        const editItem = dataArray.find(item => item.id === id);
        if (editItem) {
            setForm({...editItem, id:id});
            setdataArray(dataArray.filter(item => item.id !== id));
        }
    };

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                closeOnClick
                pauseOnHover
                draggable
                theme="light"
            />
            <div className="container">
                <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                    <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
                </div>
            </div>
            <div className="main-outer-body flex flex-col items-center">
                <div className="body p-5 m-2 min-h-[80vh] px-10 w-[95vw]">
                    <h1 className='text-4xl text font-bold text-center'>
                        <span className='text-green-500'>&lt;</span>Pass<span className='text-green-500'>OP/&gt;</span>
                    </h1>
                    <p className='text-green-900 my-2 text-lg text-center'>Your own Password Manager</p>
                    <div className="inputs-main flex items-center justify-center">
                        <div className="inputs my-1 flex flex-col gap-5 w-[100%] md:w-[90%]">
                            <div className="website-input">
                                <input
                                    className='w-full rounded-full border border-green-700 py-1.5 px-4'
                                    type="text"
                                    value={form.site}
                                    name="site"
                                    onChange={handleChange}
                                    placeholder='Enter website URL'
                                />
                            </div>
                            <div className="flex flex-col gap-4 w-full md:flex-row">
                                <input
                                    className='px-4 w-full border border-green-700 rounded-full py-1.5'
                                    placeholder='Enter username'
                                    value={form.username}
                                    onChange={handleChange}
                                    name='username'
                                    type="text"
                                />
                                <div className="pass relative w-full">
                                    <input
                                        ref={passref}
                                        className='px-4 w-full border border-green-700 rounded-full py-1.5'
                                        value={form.password}
                                        onChange={handleChange}
                                        name='password'
                                        placeholder='Enter password'
                                        type="password"
                                    />
                                    <span
                                        className='absolute right-3 top-[9px] cursor-pointer'
                                        onClick={showPassword}
                                    >
                                        <img ref={imgref} width={19} src="icons/eye.png" alt="show" />
                                    </span>
                                </div>
                            </div>
                            <div className="btn flex justify-center mt-3">
                                <button
                                    onClick={saveData}
                                    className='flex justify-center items-center gap-2 bg-green-500 hover:bg-green-400 rounded-full px-10 py-1 w-fit border border-green-900'
                                >
                                    <lord-icon
                                        src="https://cdn.lordicon.com/jgnvfzqg.json"
                                        trigger="hover"
                                    >
                                    </lord-icon>
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="tab flex flex-col justify-center items-center">
                        <div className="heading flex justify-start items-start w-[90%]">
                            <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
                        </div>
                        {dataArray.length === 0 ? (
                            <div className='bg-green-100 mt-2 px-10 py-2 w-[90%] border border-green-900'>No passwords to show</div>
                        ) : (
                            <div className="w-[100%] md:w-[90%] sm:w-[90%]">
                                <div className="overflow-x-auto">
                                    <table className="table-auto w-full rounded-md overflow-hidden">
                                        <thead className='bg-green-800  text-white'>
                                            <tr>
                                                <th className='py-2 px-3 text-left md:text-center'>Website</th>
                                                <th className='py-2 px-3 text-left md:text-center'>Username</th>
                                                <th className='py-2 px-3 text-left md:text-center'>Password</th>
                                                <th className='py-2 px-5 text-left md:text-center'>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className='bg-green-100'>
                                            {dataArray.map((data, index) => (
                                                <tr key={index}>
                                                    <td className='py-2 px-6 border border-white text-left md:text-center'>
                                                        <div className='relative flex items-center justify-start md:justify-center'>
                                                            <a href={data.site} target='_blank' rel='noopener noreferrer'>{data.site}</a>
                                                        </div>
                                                    </td>
                                                    <td className='py-2 px-6 border border-white text-left md:text-center'>{data.username}</td>
                                                    <td className='py-2 px-6 border border-white text-left md:text-center'>{data.password}</td>
                                                    <td className='py-2 px-4 border border-white text-left md:text-center'>
                                                        <span className='cursor-pointer mx-1' onClick={() => editPassword(data.id)}>
                                                            <lord-icon
                                                                src="https://cdn.lordicon.com/gwlusjdu.json"
                                                                trigger="hover"
                                                                style={{ "width": "21px", "height": "21px" }}
                                                            >
                                                            </lord-icon>
                                                        </span>
                                                        <span className='cursor-pointer mx-1' onClick={() => deletePassword(data.id)}>
                                                            <lord-icon
                                                                src="https://cdn.lordicon.com/skkahier.json"
                                                                trigger="hover"
                                                                style={{ "width": "21px", "height": "21px" }}
                                                            >
                                                            </lord-icon>
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Manager;
