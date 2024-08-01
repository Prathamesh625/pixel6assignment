import React, { useState } from 'react';
import validator from 'validator';  // Ensure you have this library installed
import { verifyPan, getPostCode, getPostCode2 } from '../api/api';
import cities from "../utilities/db.json"

export default function AddCustomer(props) {

    const { setPageNo } = props

    const db = cities.cities

    const [error , setError] = useState('')

    const [formData, setFormData] = useState({
        pan: '',
        full_name: '',
        email: '',
        mobile_no: '',
        postCode: '',
        state: '',
        city: '',
        address_line_1: '',
        address_line_2: ''
    });

    //  a function handle input

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // function to fetch details on a pan validation

    const fetchedDetailsOnPan = async (e) => {
        e.preventDefault();
        const { pan } = formData;
        if (pan.length !== 10) return alert('Enter a valid PAN number');
        const response = await verifyPan(pan); 
        if (response.data.isValid) {
            setFormData(prevState => ({
                ...prevState,
                full_name: response.data.fullName
            }));
        }
    };

    // function fetches details on post code 

    const fetchDetailsOnPostCode = async (e) => {
        e.preventDefault();
        const { postCode } = formData;
        if (postCode.length !== 6) return alert('Enter a valid post code');
        const response = await getPostCode(postCode); 
        setFormData(prevState => ({
            ...prevState,
            city: response.data.city[0].name,
            state: response.data.state[0].name
        }));
    };

    // fucntion for email validation

    const emailValidation = () => {
        const { email } = formData;
        if (!validator.isEmail(email)) return alert('Not a valid email');
    };


    // function to save data to localstorage

    const saveCustomer = (e) => {
        e.preventDefault();
        if (formData.pan === '') {
            return alert('all values are necessary')
        }
        let list = JSON.parse(localStorage.getItem('CustomerList')) || [];
        list.push(formData);
        localStorage.setItem('CustomerList', JSON.stringify(list));
        alert('Customer saved successfully');
        setPageNo(2);
    };



    return (
        <div className="p-5">
            <h2>Add Customer</h2>
            <form className='d-flex flex-column' onSubmit={saveCustomer}>
                <div className="input-group mb-2">
                    <input
                        type="text" className="form-control"
                        name='pan' placeholder="pan"
                        onChange={inputHandler}
                        value={formData.pan}
                        required
                    />
                    <button
                        className="btn btn-outline-secondary ml-2"
                        type="button"
                        onClick={fetchedDetailsOnPan}>verify</button>
                </div>

                    <input
                        className="form-control mb-2"
                        placeholder='Full Name'
                        name='full_name'
                        onChange={inputHandler}
                        value={formData.full_name}
                        onBlur={formData.full_name.length > 140 && alert('Full name should mot be greater than 140 charcaters')}
                        required
                        
                    />
                    <input
                        className="form-control mb-2"
                        placeholder='Email'
                        name='email'
                        onChange={inputHandler}
                        onBlur={emailValidation}
                        value={formData.email}
                        required
                />
                <div className='d-flex'>

                    <input
                        style={{width:"60px"}}
                        className="form-control mb-2 mr-2"
                        value="+91"    
                    />
                    <input
                        className="form-control mb-2"
                        placeholder='Mobile No.'
                        name='mobile_no'
                        onChange={inputHandler}
                        value={formData.mobile_no}
                        onBlur={() => { (formData.mobile_no.length < 10 || formData.mobile_no.length>10) && alert('enter a valid mobile number')}}
                        required
                    />
                    </div>
                    <input
                        className="form-control mb-2"
                        placeholder='Address (line 1)'
                        name='address_line_1'
                        onChange={inputHandler}
                        value={formData.address_line_1}
                    />
                    <input
                        className="form-control mb-2"
                        placeholder='Address (line 2)'
                        name='address_line_2'
                        onChange={inputHandler}
                        value={formData.address_line_2}
                    />
                    <div className="input-group mb-2">
                        <input
                            type="text"
                            className="form-control"
                            name='postCode'
                            placeholder="post code"
                            onChange={inputHandler}
                            value={formData.postCode}
                            required
                        />
                        <button
                            className="btn btn-outline-secondary ml-2"
                            type="button" id="button-addon2"
                            onClick={fetchDetailsOnPostCode}>fetch</button>
                    </div>
                <div>
                </div>
                <select className="form-select mb-2 p-2" onSelect={inputHandler} >
                    <option>{formData.state?formData.state:"not selected"}</option>
                    {db.map(data => {
                        return <option>{data.State}</option>
                    })}
                </select>
                <select className="form-select p-2 mb-2" onSelect={inputHandler}>
                   <option>{formData.city?formData.city:"not selected"}</option>
                    {db.map(data => {
                        return <option>{data.City}</option>
                    })}
                </select>
                <button
                    type='submit'
                    class="btn btn-primary"
                >
                    Save Customer
                </button>
            </form>
        </div>
    );
}
