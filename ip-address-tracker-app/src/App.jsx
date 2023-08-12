import './App.css';
import iconArrow from './images/icon-arrow.svg';
import MapWrapper from './components/MapWrapper';
import useSWR from 'swr';
import { useState } from 'react';



function App() {

    const [ipInput, setIpInput] = useState('');
    const [ipToSearch, setIpToSearch] = useState(null);
    const fetcher = (url) => fetch(url).then((res) => res.json());
    const { data, error } = useSWR(ipToSearch ? `http://localhost:3001/getGeoData?ip=${ipInput}` : null, fetcher);


  
      const handleClick = (e) => {
        e.preventDefault();
        setIpToSearch(ipInput);
      };
  
      let ipAddress, location, timezone, isp, latitude, longitude;

      if (data && !error) {
        ipAddress = data?.ip;
        console.log(ipAddress);
        location = `${data?.location?.region ?? ''}, ${data?.location?.country ?? ''}`;
        console.log(location);
        timezone = data?.location?.timezone;
        console.log();
        isp = data?.isp;
        latitude = data?.location?.lat; 
        console.log(latitude);
        longitude = data?.location?.lng; // Accessing longitude
        console.log(longitude);
      }
      
      
      

    if (error) {
        console.error(error);
        return <div>Error fetching data</div>;
     }
     


    return (
        <main className='relative App text-center flex-col items-start  min-h-screen'>

            <form  className='App-bg-img relative flex flex-col items-center justify-items-start w-full min-h-full'>
                <h1 className='text-2xl p-2 text-white font-semibold mt-4'>GeoLocator</h1>

                <div className='flex flex-row w-full max-w-sm items-start justify-center relative mt-4 mb-4 md:max-w-lg lg:max-w-xl'>
                    <input
                        type='text'
                        placeholder='Search for any IP address or domain'
                        className='w-full p-4 rounded-lg md:p-4'
                        onChange={(e) => setIpInput(e.target.value)}
                        value={ipInput}
                    />
                    <button
                        className='w-[3.5rem] p-6 h-[3.5rem] rounded-r-lg z-20 bg-black absolute right-0 top-0 flex items-center justify-center'
                        onClick={handleClick}
                    >
                        <img src={iconArrow} alt="Search icon" className='object-cover w-full'/>
                    </button>
                </div>
                {error && <p className='text-white'>Something went wrong...</p>}
            </form>

                <section className=' flex flex-col absolute text-center -top-10 left-0 right-0 bottom-0 mx-auto  my-auto w-full max-w-sm justify-evenly rounded-lg z-50 bg-white max-h-fit md:text-start md:flex-row md:max-w-screen-sm lg:max-w-screen-md xl:max-w-screen-xl md:min-h-[6rem] lg:min-h-[7rem] md:bottom-40  lg:bottom-40 '>
                    <div className='w-full p-3 flex-col items-center md:items-start justify-center'>
                        <h2 className='text-dark-gray font-bold text-xs uppercase'>IP Address</h2>
                        <p className='text-very-dark-gray font-bold mt-1'>{ipAddress}</p>
                    </div>

                    <div className='w-full p-3 flex-col items-center md:items-start justify-center'>
                        <h2 className='text-dark-gray font-bold text-xs uppercase'>Location</h2>
                        <p className='text-very-dark-gray font-bold mt-1'>{location}</p>
                    </div>

                    <div className='w-full p-3 flex-col items-center md:items-start justify-center'>
                        <h2 className='text-dark-gray font-bold text-xs uppercase'>Timezone</h2>
                        <p className='text-very-dark-gray font-bold mt-1'>{timezone}</p>
                    </div>

                    <div className='w-full p-3 flex-col items-center md:items-start justify-center'>
                        <h2 className='text-dark-gray font-bold text-xs uppercase'>ISP</h2>
                        <p className='text-very-dark-gray font-bold mt-1'>{isp}</p>
                    </div>     
                </section>
                <div className='relative w-full h-1/2'> {/* Explicitly set height */}
                    <MapWrapper latitude={latitude} longitude={longitude} />
                </div>
           
        </main>
    );
}

export default App;
