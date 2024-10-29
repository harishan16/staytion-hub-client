import Layout from "../../components/Layout/Layout";
import './AddGuestPage.scss';
import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import Button from "../../components/Button/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialValues = {
    guest_name: "",
    contact_number: "",
    contact_email: "",
    address: "",
    city: "",
    country: ""
  };

function AddGuestPage () {

    const block = 'add-guest';
    const [values, setValues] = useState(initialValues);
    const navigate = useNavigate();
    const url = import.meta.env.VITE_API_URL;

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setValues({...values, [name] : value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        let toastBox;

        try {
            await axios.post(`${url}/api/guests`, values);
            toastBox = toast.success("Guest details added!");
      
            setTimeout(() => {
                navigate('/guests');
            }, 3000);
        } catch (error) {
            console.error(error.response);
            toast.error("Error adding guest details", { toastBox });
        }
    }

    return (
        <Layout className={block}>
            <nav className={`${block}__navigation`}>
                <h1 className={`${block}__title`}>Guests * Add new Guest</h1>
            </nav>
            <section className={`${block}__inputs`}>
                <form className={`${block}__form`} onSubmit={handleSubmit}>
                    <label className={`${block}__label-name`}>Full Name
                        <input 
                            type="text" 
                            name="guest_name" 
                            value={values['guest_name']} 
                            placeholder="Enter full name"
                            onChange={handleInputChange} 
                            className={`${block}__input ${block}__input--name`}
                            required
                        />
                    </label>
                    <div className={`${block}__row`}>
                        <label className={`${block}__label-number`}>Contact Number
                            <input 
                                type="text" 
                                name="contact_number" 
                                placeholder="Eg: +1(937)-924-7529"
                                value={values['contact_number']}
                                pattern="^\+1\(\d{3}\)-\d{3}-\d{4}$"
                                title="Please enter in this format +1(937)-924-7529"
                                onChange={handleInputChange} 
                                className={`${block}__input ${block}__input--number`}
                                required
                            />
                        </label>

                        <label className={`${block}__label-email`}>Contact Email
                            <input 
                                type="email" 
                                name="contact_email" 
                                placeholder="Enter email address"
                                value={values['contact_email']} 
                                onChange={handleInputChange} 
                                className={`${block}__input ${block}__input--email`}
                                required
                            />
                        </label>
                    </div>

                    <label className={`${block}__label-address`}>Address
                        <input 
                            type="text" 
                            name="address" 
                            value={values['address']} 
                            placeholder="Enter address"
                            onChange={handleInputChange} 
                            className={`${block}__input ${block}__input--address`}
                            required
                        />
                    </label>

                    <div className={`${block}__row`}>
                        <label className={`${block}__label-city`}>City
                            <input 
                                type="text" 
                                name="city" 
                                placeholder="Enter city"
                                value={values['city']} 
                                onChange={handleInputChange} 
                                className={`${block}__input ${block}__input--city`}
                                required
                            />
                        </label>

                        <label className={`${block}__label-country`}>Country
                            <input 
                                type="text" 
                                name="country" 
                                value={values['country']} 
                                placeholder="Enter country"
                                onChange={handleInputChange} 
                                className={`${block}__input ${block}__input--country`}
                                required
                            />
                        </label>
                    </div>
                    <div className={`${block}__form-actions`}>
                        <Button type='secondary' to='/guests' className={`${block}__button`}>Cancel</Button>
                        <Button type='primary' to='' className={`${block}__button`}>Add</Button>
                    </div>
                </form>
                <ToastContainer />
            </section>
        </Layout>
    );
}

export default AddGuestPage;