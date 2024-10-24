import Dropdown from "../../components/Dropdown/Dropdown";
import Layout from "../../components/Layout/Layout";
import './AddReservationPage.scss';
import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import Button from "../../components/Button/Button";

const initialValues = {
    guest_name: "",
    no_of_guests: "",
    room_type: "",
    room_number: "",
    check_in: "",
    check_out: "",
    proof_document: "",
  };

function AddReservationPage () {
    const block = 'add-reservation';
    const [values, setValues] = useState(initialValues);
    const [rooms, setRooms] = useState([]);
    const [selectedRoomType, setSelectedRoomType] = useState('');
    const [guestNames, setGuestNames] = useState([]);
    const [uploadImage, setUploadImage] = useState(null);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
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
            ? rooms.filter((room) => {return room.room_type === selectedRoomType})
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
        const { name, value } = event.target;
        setValues({...values, [name]: value});
    }
    console.log(values);

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
                <form className={`${block}__form`}>
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
                        />
                        </label>
                        <label className={`${block}__date-label`}>Check Out
                        <input 
                            type="date"
                            name="check_out" 
                            value={values['check_out']} 
                            onChange={handleDateChange} 
                            className={`${block}__date-input`} 
                        />
                        </label>
                    </div>
                    {/* <div>
                        <input 
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleSelect}
                            className={`${block}__image`} 
                        />
                    </div> */}
                    <div className={`${block}__form-actions`}>
                        <Button type='secondary' to='/reservations' className={`${block}__button`}>Cancel</Button>
                        <Button type='primary' to='' className={`${block}__button`}>Submit</Button>
                    </div>
                </form>

            </section>
        </Layout>
    );
// )}
}

export default AddReservationPage;