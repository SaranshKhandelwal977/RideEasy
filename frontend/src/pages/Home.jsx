import React, { useRef, useState, useEffect  } from 'react'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import WaitForDriver from '../components/WaitForDriver';
import LookingForDriver from '../components/LookingForDriver';
import axios from 'axios';

const Home = () => {

    const [pickup, setPickup] = useState('');
    const [destination, setDestination] = useState('');
    const [panelOpen, setPanelOpen] = useState(false);

    const panelRef = useRef(null);
    const panelCloseRef = useRef(null);

    const [vehiclePanel, setVehiclePanel] = useState(false);
    const vehiclePanelRef = useRef(null);

    const [confirmRidePanel, setConfirmRidePanel] = useState(false);
    const confirmRidePanelRef = useRef(null);

    const [vehicleFound, setVehicleFound] = useState(false);
    const vehicleFoundRef = useRef(null);

    const [waitingForDriver, setWaitingForDriver] = useState(false);
    const waitingForDriverRef = useRef(false);

    const [pickupSuggestions, setPickupSuggestions] = useState([])
    const [destinationSuggestions, setDestinationSuggestions] = useState([])
    const [activeField, setActiveField] = useState(null)
    const [fare, setFare] = useState({})
    const [vehicleType, setVehicleType] = useState(null)
    const [ride, setRide] = useState(null)
    const [pickupQuery, setPickupQuery] = useState('');
    const [destinationQuery, setDestinationQuery] = useState('');
    const [finalPickup, setFinalPickup] = useState('');
    const [finalDestination, setFinalDestination] = useState('');
    const [isEV, setIsEV] = useState(false);

    const submithandler = (e) => {
        e.preventDefault();
    }

    useEffect(() => {
        const timeout = setTimeout(async () => {
            if (pickupQuery.length > 2) {
                try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                    params: { input: pickupQuery },
                    headers: {
                    Authorization: `bearer ${localStorage.getItem('token')}`
                    }
                });
                setPickupSuggestions(response.data);
                } catch (error) {
                    console.log(error);
                }
            }
        }, 700); // 700ms debounce
    
        return () => clearTimeout(timeout);
    }, [pickupQuery]);
      
    useEffect(() => {
    const timeout = setTimeout(async () => {
        if (destinationQuery.length > 2) {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                params: { input: destinationQuery },
                headers: {
                    Authorization: `bearer ${localStorage.getItem('token')}`
                }
                });
                setDestinationSuggestions(response.data);
            } catch (error) {
                console.log(error);
            }
        }
    }, 700);
    
    return () => clearTimeout(timeout);
    }, [destinationQuery]);

    const handlePickupChange = async (e) => {
        setPickup(e.target.value)
        setPickupQuery(e.target.value);
    }

    const handleDestinationChange = async (e) => {
        setDestination(e.target.value)
        setDestinationQuery(e.target.value);
    }

    useGSAP(function(){
        if(panelOpen){
            gsap.to(panelRef.current, {
                height: '70%',
                padding: 24
            })
            gsap.to(panelCloseRef.current, {
                opacity: 1,
            })
        }
        else{
            gsap.to(panelRef.current, {
                height: '0%',
                padding: 0
            })
            gsap.to(panelCloseRef.current, {
                opacity: 0,
            })
        }     
    }, [panelOpen])

    useGSAP(function(){
        if(vehiclePanel){
            gsap.to(vehiclePanelRef.current, {
                transform: 'translateY(0)'
            })
        }
        else{
            gsap.to(vehiclePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    },[vehiclePanel])

    useGSAP(function(){
        if(confirmRidePanel){
            gsap.to(confirmRidePanelRef.current, {
                transform: 'translateY(0)'
            })
        }
        else{
            gsap.to(confirmRidePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    },[confirmRidePanel])

    useGSAP(function(){
        if(vehicleFound){
            gsap.to(vehicleFoundRef.current, {
                transform: 'translateY(0)'
            })
        }
        else{
            gsap.to(vehicleFoundRef.current, {
                transform: 'translateY(100%)'
            })
        }
    },[vehicleFound])

    useGSAP(function(){
        if(waitingForDriver){
            gsap.to(waitingForDriverRef.current, {
                transform: 'translateY(0)'
            })
        }
        else{
            gsap.to(waitingForDriverRef.current, {
                transform: 'translateY(100%)'
            })
        }
    },[waitingForDriver])

    const fetchFare = async (pickup, destination, isEV) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
                params: { pickup, destination, isEV },
                headers: {
                    Authorization: `bearer ${localStorage.getItem('token')}`
                }
            });
            setFare(response.data);
        } catch (error) {
            console.log(error);
        }
    };
      
    async function findTrip() {
        setVehiclePanel(true);
        setPanelOpen(false);
        setFinalPickup(pickup);
        setFinalDestination(destination);
        
        await fetchFare(pickup, destination, isEV); // include isEV
        setPickup('');
        setDestination('');
        setPickupSuggestions([]);
        setDestinationSuggestions([]);
    }
   

    async function createRide() {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
            pickup: finalPickup,
            destination: finalDestination,
            vehicleType,
            isEV
        }, {
            headers: {
                Authorization: `bearer ${localStorage.getItem('token')}`
            }
        })
        console.log(response);
        setVehiclePanel(false)
        setIsEV(false);
    }

  return (
    <div className='h-screen relative overflow-hidden'>
        <h2 className='w-16 absolute left-5 top-5 text-2xl tracking-tighter font-bold text-black'>RideEasy</h2>
        <div className='h-4/5'>
            <img className='w-full h-full object-cover' src='https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif'/>
        </div>
        <div className='absolute flex flex-col justify-end h-screen top-0 w-full'>
            <div className='h-[30%] p-6 bg-gray-800 relative'>
                <h5 ref={panelCloseRef} onClick={() => setPanelOpen(false)} className='absolute right-6 top-6 text-xl font-semibold text-gray-500 cursor-pointer'>
                    <i className="ri-arrow-down-wide-line"></i>
                </h5>
                <h4 className='text-3xl font-semibold'>Find a trip</h4>
                <form onSubmit={(e) => submithandler(e)}>
                    <div className='flex gap-5 justify-center items-center mt-5 bg-gray-700 px-5 py-2 rounded-lg'>
                        <i className="ri-record-circle-fill"></i>
                        <input 
                            className='text-base w-full focus:outline-none' 
                            value={pickup} 
                            onChange={handlePickupChange}
                            type="text" 
                            placeholder='Add a pickup location'
                            onClick={() => {
                                setPanelOpen(true)
                                setActiveField('pickup')
                            }}
                        />
                    </div>
                    <div className='flex gap-5 justify-center items-center my-3 bg-gray-700 px-5 py-2 rounded-lg'>
                        <i className="ri-stop-circle-fill"></i>
                        <input 
                            className='text-base w-full focus:outline-none' 
                            value={destination} 
                            onChange={handleDestinationChange}
                            type="text" 
                            placeholder='Enter your destination'
                            onClick={() => {
                                setPanelOpen(true)
                                setActiveField('destination')
                            }}
                        />
                    </div>
                </form>
            </div>

            <div ref={panelRef} className=' bg-gray-800 h-0'>
                <button
                    onClick={findTrip}
                    className='bg-black text-white px-4 py-2 mb-5 rounded-lg -mt-5 w-full'>
                    Find Trip
                </button>
                <LocationSearchPanel 
                    suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
                    setPanelOpen={setPanelOpen}
                    setVehiclePanel={setVehiclePanel}
                    setPickup={setPickup}
                    setDestination={setDestination}
                    activeField={activeField}
                />
            </div>
        </div>
        <div ref={vehiclePanelRef} className='fixed w-[375px] z-10 bottom-0 bg-gray-800 px-3 py-10 pt-12 transform translate-y-full'>
            <VehiclePanel  
                selectVehicle={setVehicleType} 
                fare={fare} 
                setConfirmRidePanel={setConfirmRidePanel} 
                setVehiclePanel={setVehiclePanel}
                isEV={isEV}
                setIsEV={setIsEV}
                fetchFare={fetchFare}
                pickup={finalPickup}
                destination={finalDestination}
            />
        </div>

        <div ref={confirmRidePanelRef} className='fixed w-[375px] z-10 bottom-0 bg-gray-800 px-3 py-6 pt-12 transform translate-y-full'>
            <ConfirmRide 
                createRide={createRide}
                pickup={finalPickup}
                destination={finalDestination}
                fare={fare}
                vehicleType={vehicleType}
                setConfirmRidePanel={setConfirmRidePanel} 
                setVehicleFound={setVehicleFound}
                isEV={isEV}
            />
        </div>

        <div ref={vehicleFoundRef} className='fixed w-[375px] z-10 bottom-0 bg-gray-800 px-3 py-6 pt-12 transform translate-y-full'>
            <LookingForDriver 
                createRide={createRide}
                pickup={finalPickup}
                destination={finalDestination}
                fare={fare}
                vehicleType={vehicleType}
                setVehicleFound={setVehicleFound}  
                setVehiclePanel={setVehiclePanel}  
            />
        </div>

        <div ref={waitingForDriverRef} className='fixed w-[375px] z-10 bottom-0 bg-gray-800 px-3 py-6 pt-12 transform translate-y-full'>
            <WaitForDriver setWaitingForDriver={setWaitingForDriver}/>
        </div>
    </div>
  )
}

export default Home