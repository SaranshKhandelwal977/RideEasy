import React, { useContext, useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import LiveTracking from '../components/LiveTracking';
import RentalVehiclePanel from '../components/RentalVehiclePanel';
import Sidebar from '../components/Sidebar';
import { UserDataContext } from '../context/userContext';
import { SocketContext } from '../context/SocketContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LocationSearchPanel from '../components/LocationSearchPanel';
import LookingForDriver from '../components/LookingForDriver';
import WaitForDriver from '../components/WaitForDriver';
import ConfirmRide from '../components/ConfirmRide';

const RentalBooking = () => {
    const [pickup, setPickup] = useState('');
    const [pickupQuery, setPickupQuery] = useState('');
    const [pickupSuggestions, setPickupSuggestions] = useState([]);
    const [panelOpen, setPanelOpen] = useState(false);
    const [vehiclePanel, setVehiclePanel] = useState(false);
    const [confirmRidePanel, setConfirmRidePanel] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [ride, setRide] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeField, setActiveField] = useState('pickup');
    const [vehicleFound, setVehicleFound] = useState(false);
    const vehicleFoundRef = useRef(null);
    const [isRental, setIsRental] = useState(true);
    const [rentalDuration, setRentalDuration] = useState(1);

    const [waitingForDriver, setWaitingForDriver] = useState(false);
    const waitingForDriverRef = useRef(null);

    const panelRef = useRef(null);
    const panelCloseRef = useRef(null);
    const vehiclePanelRef = useRef(null);
    const confirmRidePanelRef = useRef(null);

    const { user } = useContext(UserDataContext);
    const { socket } = useContext(SocketContext);
    const navigate = useNavigate();

    useEffect(() => {
        socket.emit('join', { userType: 'user', userId: user._id });

        socket.on('ride-confirmed', (ride) => {
            setVehicleFound(false)
            setRide(ride)
            setConfirmRidePanel(false)
            setVehiclePanel(false)
            setWaitingForDriver(true)
            
        });

        socket.on('ride-started', (ride) => {
            setWaitingForDriver(false)
            navigate('/riding', { state: { ride } });
        });

        return () => {
            socket.off('ride-confirmed');
            socket.off('ride-started');
        };
    }, [socket, user]);

    useEffect(() => {
        const timeout = setTimeout(async () => {
        if (pickupQuery.length > 2) {
            try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                params: { input: pickupQuery },
                headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setPickupSuggestions(response.data);
            } catch (error) {
            console.error(error);
            }
        }
        }, 700);
        return () => clearTimeout(timeout);
    }, [pickupQuery]);

    useGSAP(() => {
        gsap.to(panelRef.current, {
        height: panelOpen ? '70%' : '0%',
        padding: panelOpen ? 24 : 0,
        });
        gsap.to(panelCloseRef.current, {
        opacity: panelOpen ? 1 : 0,
        });
    }, [panelOpen]);

    useGSAP(() => {
        gsap.to(vehiclePanelRef.current, {
        transform: vehiclePanel ? 'translateY(0)' : 'translateY(100%)',
        });
    }, [vehiclePanel]);

    useGSAP(() => {
        gsap.to(confirmRidePanelRef.current, {
        transform: confirmRidePanel ? 'translateY(0)' : 'translateY(100%)',
        });
    }, [confirmRidePanel]);
    
    useGSAP(() => {
        gsap.to(vehicleFoundRef.current, {
          transform: vehicleFound ? 'translateY(0)' : 'translateY(100%)',
        });
      }, [vehicleFound]);
      
    useGSAP(() => {
    gsap.to(waitingForDriverRef.current, {
        transform: waitingForDriver ? 'translateY(0)' : 'translateY(100%)',
    });
    }, [waitingForDriver]);

    const createRental = async () => {
        try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/rentals/create`, {
            pickup,
            rentalDuration: selectedPackage.duration,
            fare: selectedPackage.fare,
        }, {
            headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });

        console.log(response.data);
        setConfirmRidePanel(false);
        setVehiclePanel(false);
        setVehicleFound(true);
        } catch (error) {
        console.log(error);
        }
    };

return (
    <div className='h-screen relative w-full mx-auto overflow-hidden'>
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} user={user} />

        <h2 className='absolute left-5 top-5 text-2xl font-bold text-white'>RideEasy</h2>

        <div className='absolute top-2 right-2 z-50'>
            <button onClick={() => setIsSidebarOpen(true)} className='bg-white h-10 w-10 flex items-center justify-center rounded-full shadow-md'>
                <i className='ri-menu-line text-lg text-black font-bold'></i>
            </button>
        </div>

        <div className='h-[70%] pt-16'>
            <LiveTracking />
        </div>

        <div className='absolute flex flex-col justify-end h-screen top-0 w-full'>
            <div className='h-[30%] p-6 bg-gray-800 relative'>
                <h5 ref={panelCloseRef} onClick={() => setPanelOpen(false)} className='absolute left-[50%] text-xl font-semibold text-gray-500 cursor-pointer z-100'>
                    <i className='ri-arrow-down-wide-line'></i>
                </h5>
                <div className='flex items-center justify-between'>
                    <h4 className='text-3xl font-semibold mb-10'>Book a Rental</h4>
                    <button
                        onClick={() => navigate('/home')}
                        className="bg-blue-600 text-white px-4 py-2 mb-2 rounded-lg"
                        >
                        If you want to book a normal service Click Here
                    </button>

                </div>
                <div className='flex gap-5 justify-center items-center mt-5 bg-gray-700 px-5 py-2 rounded-lg'>
                    <i className='ri-record-circle-fill'></i>
                    <input
                    className='text-base w-full focus:outline-none'
                    value={pickup}
                    onChange={(e) => {
                        setPickup(e.target.value);
                        setPickupQuery(e.target.value);
                    }}
                    type='text'
                    placeholder='Add a pickup location'
                    onClick={() => {
                        setPanelOpen(true);
                        setActiveField('pickup');
                    }}
                    />
                </div>
            </div>

            <div ref={panelRef} className='bg-gray-800 h-0'>
                <button
                    disabled={!pickup}
                    onClick={() => {
                    setPanelOpen(false);
                    setVehiclePanel(true);
                    }}
                    className={`bg-black text-white px-4 py-2 mb-5 rounded-lg -mt-20 w-full ${
                    !pickup && 'opacity-50 cursor-not-allowed'
                    }`}
                >
                    View Rental Packages
                </button>
                <LocationSearchPanel
                    suggestions= {pickupSuggestions}
                    setPanelOpen={setPanelOpen}
                    setPickup={setPickup}
                    activeField={activeField}
                />
            </div>
        </div>

        <div ref={vehiclePanelRef} className='fixed w-screen z-10 bottom-0 bg-gray-800 px-3 py-10 pt-12 transform translate-y-full'>
            <RentalVehiclePanel
                selectedPackage={selectedPackage}
                setSelectedPackage={setSelectedPackage}
                setConfirmRidePanel={setConfirmRidePanel}
                setVehiclePanel={setVehiclePanel}
                setRentalDuration={setRentalDuration}
            />
        </div>

        <div ref={confirmRidePanelRef} className='fixed w-screen z-10 bottom-0 bg-gray-800 px-3 py-6 pt-12 transform translate-y-full'>
            <ConfirmRide
                createRide={createRental}
                pickup={pickup}
                fare={{ car: selectedPackage?.fare }}
                vehicleType={'car'}
                setConfirmRidePanel={setConfirmRidePanel} 
                setVehicleFound={setVehicleFound}
                isRental={isRental}
                rentalDuration={rentalDuration}
            />
        </div>
        <div ref={vehicleFoundRef} className='fixed w-screen z-10 bottom-0 bg-gray-800 px-3 py-6 pt-12 transform translate-y-full'>
            <LookingForDriver
                pickup={pickup}
                fare={{ car: selectedPackage?.fare }}
                vehicleType={'car'}
                setVehicleFound={setVehicleFound}
                setVehiclePanel={setVehiclePanel}
                isRental={isRental}
                rentalDuration={rentalDuration}
            />
        </div>
        <div ref={waitingForDriverRef} className='fixed w-screen z-10 bottom-0 bg-gray-800 px-3 py-6 pt-12 transform translate-y-full'>
            <WaitForDriver
                setWaitingForDriver={setWaitingForDriver}
                ride={ride}
                setVehicleFound={setVehicleFound}
                waitingForDriver={waitingForDriver}
            />
        </div>
    </div>
  );
};

export default RentalBooking;
