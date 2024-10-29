import Dropdown from "../../components/Dropdown/Dropdown";
import Layout from "../../components/Layout/Layout";
import './AddReservationPage.scss';
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import Button from "../../components/Button/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialValues = {
    guest_name: "",
    no_of_guests: "",
    guest_id: "",
    room_type: "",
    room_number: "",
    room_id: "",
    check_in: "",
    check_out: "",
  };

function AddReservationPage () {
    const block = 'add-reservation';
    const [values, setValues] = useState(initialValues);
    const [rooms, setRooms] = useState([]);
    const [selectedRoomType, setSelectedRoomType] = useState('');
    const [guestNames, setGuestNames] = useState([]);
    const [dateError, setDateError] = useState("");
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
        try {
          const { data } = await axios.get(`${url}/api/guests`);
          setGuestNames(data);
        } catch (error) {
          console.error(`Could not fetch guest names ${error}`);
        }
      }, []);
  
      useEffect(() => {
        getGuestNames();
      }, []);

    // get unique room types
    const roomTypes = Array.from(new Set(rooms.map((room) => {return room.room_type})));
    const roomTypesArray = ['Please select', ...roomTypes];

    // get room numbers based on roomtype selected
    const filteredRoomNumber = selectedRoomType 
            ? rooms.filter((room) => {return room.room_type === selectedRoomType && room.status === 'Available'})
                   .map((room) => {return room.room_number}) 
            : [];

    const roomNumbersArray = ['Please select', ...filteredRoomNumber];

    // get guests names
    const names = guestNames.map((name) => {return name.guest_name});
    const namesArray = ['Please select', ...names];

    const handleSelect = (name, value) => {
        setValues({...values, [name]: value});

        if(name === 'room_type') {
            setSelectedRoomType(value);
        } else if (name === 'room_number') {
            // Find room by number and set room_id
            const selectedRoom = rooms.find((room) => {
                return String(room.room_number) === String(value) });
                if (selectedRoom) {
                    setValues((prevValues) => ({ ...prevValues, room_id: selectedRoom.id }));
                }
            } else if (name === 'guest_name') {
            // Find guest by name and set guest_id
                const selectedGuest = guestNames.find((guest) => guest.guest_name === value);
                if (selectedGuest) {
                setValues((prevValues) => ({ ...prevValues, guest_id: selectedGuest.id }));
            }
        }
    }

    // handling date
    const handleDateChange = (event) => {
        const { name, value } = event.target;
        setValues({...values, [name]: value});

        if (name === 'check_in' || name === 'check_out') {
            validateDates(name === 'check_in' ? value : values.check_in, 
                name === 'check_out' ? value : values.check_out);
        }  
    }

    const validateDates = (checkIn, checkOut) => {
        if (checkIn && checkOut) {
            const checkInDate = new Date(checkIn);
            const checkOutDate = new Date(checkOut);
            if (checkOutDate <= checkInDate) {
                setDateError("Check-out date must be later than check-in date.");
            } else {
                setDateError("");
            }
        }
    };

    const getTodayDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    };

    const formatDateTime = (date, time) => {
        return `${date} ${time}:00`;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        let toastBox;

        if (dateError) {
            toast.error(dateError);
            return;
        }

        // addTimeToDate();
        const formattedValues = {
            ...values,
            check_in: formatDateTime(values.check_in, '15:00'),
            check_out: formatDateTime(values.check_out, '11:00')
        };

        try {
            await axios.post(`${url}/api/reservations`, formattedValues);
            // patch call to update rooms as occupied
            await axios.patch(`${url}/api/rooms/${values.room_id}`, { status : 'Occupied' });
            toastBox = toast.success("Reservation successfully made!");
      
            setTimeout(() => {
                navigate('/reservations');
            }, 3000);
        } catch (error) {
            console.error(error.response);
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
                            value={values['guest_id']}
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
                    </div>
                    <div className={`${block}__form-actions`}>
                        <Button type='secondary' to='/reservations' className={`${block}__button`}>Cancel</Button>
                        <Button type='primary' to='' className={`${block}__button`}>Add</Button>
                    </div>
                </form>
                <ToastContainer />
            </section>
        </Layout>
    );
}

export default AddReservationPage;