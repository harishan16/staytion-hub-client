import Dropdown from "../../components/Dropdown/Dropdown";
import Layout from "../../components/Layout/Layout";
import './AddReservationPage.scss';
import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import Button from "../../components/Button/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import DateRangePicker from "../../components/DateRangePicker/DateRangePicker";

const initialValues = {
    guest_name: "",
    no_of_guests: "",
    room_type: "",
    room_number: "",
    check_in: "",
    check_out: "",
  };

function AddReservationPage () {
    const block = 'add-reservation';
    const [values, setValues] = useState(initialValues);
    const [rooms, setRooms] = useState([]);
    const [selectedRoomType, setSelectedRoomType] = useState('');
    const [guestNames, setGuestNames] = useState([]);
    const [dateError, setDateError] = useState(""); // state for date error
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const url = import.meta.env.VITE_API_URL;


    // get the list of all rooms for room type and room number dropdowns
    const getRooms = useCallback(async () => {
        setIsLoading(true);
        setIsError(false);
  
        try {
          const { data } = await axios.get(`${url}/api/rooms/`);
          console.log(data);
          setRooms(data);
          setIsLoading(false);
        } catch (error) {
          console.error(`Could not fetch rooms ${error}`);
          setIsError(true);
        }
      }, []);
  
      useEffect(() => {
        getRooms();
      }, []);

      // get the list of all guest names
    const getGuestNames = useCallback(async () => {
        // setIsLoading(true);
        // setIsError(false);
  
        try {
          const { data } = await axios.get(`${url}/api/guests/getGuestNames`);
          console.log(data);
          setGuestNames(data);
        //   setIsLoading(false);
        } catch (error) {
          console.error(`Could not fetch guest names ${error}`);
        //   setIsError(true);
        }
      }, []);
  
      useEffect(() => {
        getGuestNames();
      }, []);

      console.log(guestNames);

//   get unique room types
    // console.log(rooms);
    const roomTypes = Array.from(new Set(rooms.map((room) => {return room.room_type})));
    const roomTypesArray = ['Please select', ...roomTypes];

    // get room numbers based on roomtype selected
    const filteredRoomNumber = selectedRoomType 
            ? rooms.filter((room) => {return room.room_type === selectedRoomType && room.status === 'Available'})
                   .map((room) => {return room.room_number}) 
            : [];

    const roomNumbersArray = ['Please select', ...filteredRoomNumber];

    // get room numbers based on roomtype selected
    const names = guestNames.map((name) => {return name.guest_name});
    const namesArray = ['Please select', ...names];



// storing all input values
    const handleSelect = (name, value) => {
        setValues({...values, [name]: value});

        if(name === 'room_type') {
            setSelectedRoomType(value);
        }
    }

    // handling date
    const handleDateChange = (event) => {
        // alert('enter');
        const { name, value } = event.target;
        setValues({...values, [name]: value});

        if (name === 'check_in' || name === 'check_out') {
            // alert('if');
            validateDates(name === 'check_in' ? value : values.check_in, 
                name === 'check_out' ? value : values.check_out);
        }  
    }
    const getTodayDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    };

    const validateDates = (checkIn, checkOut) => {
        if (checkIn && checkOut) {
            // alert('if in validatedates');
            const checkInDate = new Date(checkIn);
            const checkOutDate = new Date(checkOut);
            if (checkOutDate <= checkInDate) {
                // alert('if greater');
                setDateError("Check-out date must be later than check-in date.");
            } else {
                // alert('clear');
                setDateError("");
            }
        }
    };

    console.log(values);

    // handling image upload
    // const handleUpload = (event) => {
    //     setUploadImage(event.target.files[0]);

    // }

    // const handleDatesChange = ({ check_in, check_out }) => {
    //     setValues((prevValues) => ({
    //         ...prevValues,
    //         check_in: check_in.toISOString().split('T')[0], // Convert date to ISO string
    //         check_out: check_out.toISOString().split('T')[0],
    //     }));
    // };

    // handling form submit
    const handleSubmit = async (event) => {
        event.preventDefault();
        let toastBox;

        if (dateError) {
            toast.error(dateError);
            return;
        }

        try {
            // toastBox = toast.loading("Submitting new reservation...");
            await axios.post(`${url}/api/reservations`, values);
            toastBox = toast.success("Reservation successfully made!");

            // patch call to update rooms as occupied



            
            setTimeout(() => {
                navigate('/reservations');
            }, 3000);

        } catch (error) {
            console.error(error);
            toast.error("Error making reservation.", { toastBox });

        }

    }

    if(isError) {
        return <h1>Sorry, there was some error in fetching the data</h1>
    }

    if(isLoading) {
        return <h1>Loading data...</h1>
    }


    return (
        <Layout className={block}>
            <nav className={`${block}__navigation`}>
                <h1 className={`${block}__title`}>Reservation * Add new Reservations</h1>
            </nav>
            <section className={`${block}__inputs`}>
                <form className={`${block}__form`} onSubmit={handleSubmit}>
                    <div className={`${block}__guest-info`}>
                        <Dropdown 
                            label='Guest Name'
                            name='guest_name'
                            value={values['guest_name']}
                            options={namesArray}
                            className={`${block}__guest-name`} 
                            onChange={handleSelect}>
                        </Dropdown>

                        <Dropdown 
                            label='No of Guests' 
                            name='no_of_guests'
                            value={values['no_of_guests']}
                            options={['Please select', '1', '2', '3', '4', '5']} 
                            className={`${block}__guest-count`} 
                            onChange={handleSelect}>
                        </Dropdown>
                            
                    </div>
                    <div className={`${block}__room-info`}>
                        {/* <p>Select Room</p> */}
                        <Dropdown 
                            label='Room type'
                            name='room_type'
                            value={values['room_type']}
                            options={roomTypesArray}
                            className={`${block}__room-type`} 
                            onChange={handleSelect}>
                        </Dropdown>

                        <Dropdown 
                            label='Room Number'
                            name='room_number'
                            value={values['room_number']}
                            options={roomNumbersArray} 
                            className={`${block}__room-number`} 
                            onChange={handleSelect}>
                        </Dropdown>   
                    </div>
                    <div className={`${block}__date-info`}>
                        {/* <p>Check-in Date</p> */}
                        <label className={`${block}__date-label`}>Check In
                        <input 
                            type="date" 
                            name="check_in" 
                            value={values['check_in']} 
                            onChange={handleDateChange} 
                            className={`${block}__date-input`}
                            min={getTodayDate()}
                            required
                        />
                        </label>
                        <label className={`${block}__date-label`}>Check Out
                        <input 
                            type="date"
                            name="check_out" 
                            value={values['check_out']} 
                            onChange={handleDateChange} 
                            className={`${block}__date-input`}
                            min={values['check_in'] || getTodayDate()}
                            required 
                        />
                        </label>
                        {dateError && <div className={`${block}__date-error`}>{dateError}</div>}
                        {/* <DateRangePicker onDatesChange={handleDatesChange}/> */}
                    </div>
                    {/* <div>
                        <input 
                            type="file"
                            name="proof_document"
                            accept="image/*"
                            onChange={handleUpload}
                            className={`${block}__image`} 
                        />
                    </div> */}
                    <div className={`${block}__form-actions`}>
                        <Button type='secondary' to='/reservations' className={`${block}__button`}>Cancel</Button>
                        <Button type='primary' to='' className={`${block}__button`}>Submit</Button>
                    </div>
                </form>
                <ToastContainer />
            </section>
        </Layout>
    );
// )}
}

export default AddReservationPage;

// {
//     "check_in": "2404-10-24",
//     "check_out": "2024-10-26",
//     "guest_name": "Eva Thomas",
//     "no_of_guests": "1",
//     "room_number": "101",
//     "room_type": "Deluxe Room"
// }