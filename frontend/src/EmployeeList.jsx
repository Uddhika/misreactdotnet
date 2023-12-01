import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import axios from 'axios';
import DatePicker from 'react-date-picker';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      
    },
  };

Modal.setAppElement('body');

const EmployeeList = () => {

    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalupdate, setmodalupdate] = useState(false);
    const [modaldelete, setmodaldelete] = useState(false);

    const [empname, setempname] = useState('');
    const [empage, setempage] = useState('');
    const [empdep, setempdep] = useState('');
    const [empdate, setempdate] = useState(null);
    const [empdata, setempdata] = useState([]);
    const [delitem, setdelitem] = useState('');
    const [updtitem, setupdtitem] = useState('');

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    async function saveemp(){
       
        const employee = {
            name: empname,
            age: empage,
            department: empdep,
            dateofJoin: empdate
        }

        // console.log(employee);

        await axios.post('http://localhost:5033/api/Employee', employee).then((response) => {
            // console.log(response);
            getEmployees();
        }).catch(error => {
            console.log(error);
        })
        
    }

    async function deleteemp(id){  
        // console.log(id);
        await axios.delete(`http://localhost:5033/api/Employee/${id}`).then((response) => {
            // console.log(response);
            getEmployees();
        })
        setmodaldelete(false);
    }

    async function openupdateemp(id){  

        await axios.get(`http://localhost:5033/api/Employee/${id}`).then(response => {
            // console.log(response);
            setempname(response.data.name);
            setempage(response.data.age);
            setempdep(response.data.department);
            setempdate(response.data.dateofJoin);
            setupdtitem(response.data.id);
            
        })

        setmodalupdate(true);
    }

    async function updateemployee(){
        const employee = {
            id: updtitem,
            name: empname,
            age: empage,
            department: empdep,
            dateofJoin: empdate
        }
        // console.log(updtitem);
        await axios.put(`http://localhost:5033/api/Employee/${updtitem}`, employee).then((response) => {
            // console.log(response);
            getEmployees();
            setmodalupdate(false);
        }).catch(error => {
            console.log(error);
        })
    }


    async function getEmployees(){
        await axios.get('http://localhost:5033/api/Employee').then((response) => {
            // console.log(response.data);
            setempdata(response.data);
        })
    }

    useEffect(() => {
        getEmployees();
    },[])

  return (
    <div>

    <div>
        <Modal
            isOpen={modalIsOpen}
            // onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
        >
            {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2> */}
            <div className='flex justify-end'>
                <button onClick={closeModal}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
            </div>
            <form>
                <div className=''>
                <div className='flex flex-col py-1'>
                    <label htmlFor="">Name</label>
                    <input type='text' className='border border-indigo-300 rounded-md ps-2'
                    value={empname}
                    onChange={(e) => {setempname(e.target.value)}}
                    />
                </div>
                <div className='flex flex-col py-1'>
                    <label htmlFor="">Age</label>
                    <input type='number' className='border border-indigo-300 rounded-md ps-2'
                    value={empage}
                    onChange={(e) => {setempage(e.target.value)}}
                    />
                </div>
                <div className='flex flex-col py-1'>
                    <label htmlFor="">Department</label>
                    <input type='text' className='border border-indigo-300 rounded-md ps-2'
                    value={empdep}
                    onChange={(e) => {setempdep(e.target.value)}}
                    />
                </div>
                <div className='flex flex-col py-1'>
                    <label htmlFor="">Date</label>
                    <input type='text' className='border border-indigo-300 rounded-md ps-2'
                    value={empdate}
                    onChange={(e) => {setempdate(e.target.value)}}
                    />
                    {/* <DatePicker onChange={(date) => setempdate(date)} selected={empdate} /> */}
                </div>
                <div className='py-3'>
                    <button className='bg-indigo-600 text-white rounded-md px-1.5 py-1.5 w-full'
                    onClick={saveemp}
                    >Add Employee</button>
                </div>
                </div>
            </form>
        </Modal>
    </div>

    <div>
        <Modal
            isOpen={modalupdate}
            // onAfterOpen={afterOpenModal}
            onRequestClose={() => {setmodalupdate(false)}}
            style={customStyles}
            contentLabel="Example Modal"
        >
            <div className='flex justify-end'>
                <button onClick={() => {setmodalupdate(false)}}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
            </div>
            <div className=''>
                <div className='flex flex-col py-1'>
                    <label htmlFor="name">Name</label>
                    <input 
                        value={empname} 
                        type='text' 
                        className='border border-indigo-300 rounded-md ps-2'
                        onChange={(e) => {setempname(e.target.value)}}
                    />
                </div>
                <div className='flex flex-col py-1'>
                    <label htmlFor="age">Age</label>
                    <input value={empage} type='number' className='border border-indigo-300 rounded-md ps-2'
                    onChange={(e) => {setempage(e.target.value)}}
                    />
                </div>
                <div className='flex flex-col py-1'>
                    <label htmlFor="department">Department</label>
                    <input value={empdep} type='text' className='border border-indigo-300 rounded-md ps-2'
                    onChange={(e) => {setempdep(e.target.value)}}
                    />
                </div>
                <div className='flex flex-col py-1'>
                    <label htmlFor="date">Date</label>
                    <input value={empdate} type='text' className='border border-indigo-300 rounded-md ps-2'
                    onChange={(e) => {setempdate(e.target.value)}}
                    />
                </div>
                <div className='py-3'>
                    <button className='bg-indigo-600 text-white rounded-md px-1.5 py-1.5 w-full'
                    onClick={updateemployee}
                    >Update Employee</button>
                </div>
            </div>
        </Modal>
    </div>

    <div>
        <Modal
            isOpen={modaldelete}
            // onAfterOpen={afterOpenModal}
            onRequestClose={() => {setmodaldelete(false)}}
            style={customStyles}
            contentLabel="Example Modal"
        >
        {/* <div className='flex justify-end'>
            <button onClick={() => {setmodaldelete(false)}}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </button>
        </div> */}
            <p>Are you sure want to delete this record?</p>
            <div className='flex justify-between w-1/2 mx-auto mt-4'>
                <button className='bg-indigo-600 text-white rounded-md px-5 py-1.5'
                onClick={() => deleteemp(delitem.id)}
                >Yes</button>
                <button className='bg-red-600 text-white rounded-md px-5 py-1.5' onClick={() => {setmodaldelete(false)}}>No</button>
            </div>
        </Modal>
    </div>
        
        <div className='flex justify-between my-5'>
            <h1 className='text-center'>Employees</h1>
            <button className='bg-indigo-600 text-white rounded-md px-1.5 py-1.5' onClick={() => {
                setempname('');
                setempdep('');
                setempage('');
                setempdate('');
            openModal();}}>Add Employee</button>
        </div>
        
        <table className='table-auto w-full'>
            <thead className='border-b border-gray-200'>
                <tr>
                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>No</th>
                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Name</th>
                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Age</th>
                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Department</th>
                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Date of Join</th>
                    <th className='p-3 text-sm font-semibold tracking-wide text-left'></th>
                </tr>
            </thead>
            <tbody>
                { empdata.map((item, index) => (
                    <tr className='text-center' key={index}>
                        <td className='p-3 text-sm text-gray-700 text-left'>{index+1}</td>
                        <td className='p-3 text-sm text-gray-700 text-left'>{item.name}</td>
                        <td className='p-3 text-sm text-gray-700 text-left'>{item.age}</td>
                        <td className='p-3 text-sm text-gray-700 text-left'>{item.department}</td>
                        <td className='p-3 text-sm text-gray-700 text-left'>{item.dateofJoin}</td>
                        <td className='p-3 text-sm text-gray-700'>
                            <div className='flex justify-end space-x-2'>
                                <button onClick={() => { openupdateemp(item.id);
                                    }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="blue" className="w-6 h-6 cursor-pointer">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                                    </svg>
                                </button>
                                <button onClick={() => {
                                    setdelitem(item);
                                    setmodaldelete(true)}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="w-6 h-6 cursor-pointer">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </button>
                            </div>
                        </td>
                    </tr>         
                ))
                }
            </tbody>
        </table>
    </div>
  )
}

export default EmployeeList