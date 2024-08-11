import React from 'react'
import { useEffect,useState } from 'react'
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import vessel from "../Assets/vessel.png";
import start from "../Assets/start.png";
import end from "../Assets/end.png";


const vesselIcon = L.divIcon({
    className: 'vessel-icon',
    html: `<img src="${vessel}" style="transform: rotate(62deg); width: 20px; height: 90px;" />`,
    iconSize: [3, 80],
    iconAnchor: [20, 40]
});
const startIcon = L.icon({
    iconUrl: start, 
    iconSize: [50, 50],    
    iconAnchor: [33, 20],  
    
});
const endIcon = L.icon({
    iconUrl: end, 
    iconSize: [50, 50],   
    iconAnchor: [13, 30], 
  
});

export default function MapComponent({ startlat, startlng, endlat, endlng, speed }) {
    const[vesselPosition,setVesselPosition]=useState([startlat,startlng]);


    useEffect(() => {
        const distance = totalDistance(startlat, startlng, endlat, endlng);
        const travelTime = (distance / speed) * 3600; 
        const totalSteps = Math.floor(travelTime / 1000); 

        let stepIndex = 0;

        const interval = setInterval(() => {
            if (stepIndex <= totalSteps) {
                const progress = stepIndex / totalSteps;
                const newLat = startlat + (endlat - startlat) * progress;
                const newLng = startlng + (endlng - startlng) * progress;
               
               console.log("Step Index:", stepIndex);
               console.log("Progress:", progress);
               console.log("New Lat:", newLat);
               console.log("New Lng:", newLng);

               if (!isNaN(newLat) && !isNaN(newLng)) {
                   setVesselPosition([newLat, newLng]);
               } else {
                   console.error("Invalid coordinates:", newLat, newLng);
                   clearInterval(interval);
               }

               stepIndex += 1;
           } else {
               clearInterval(interval); 
           }
       }, 2000);

        return () => clearInterval(interval);
    }, [startlat, startlng, endlat, endlng, speed]);



    const totalDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; 
        const dLat = (lat2-lat1) * Math.PI / 180;
        const dLon = (lon2-lon1) * Math.PI / 180;
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                  Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                  Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        const d = R * c;
        return d;
    };
   

  return (
 
    <div>
       <MapContainer center={[startlat, startlng]} zoom={11} style={{ height: '100vh', width: '100%' }}>
       <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
        <Marker position={[startlat, startlng]} icon={startIcon}/>
        <Marker position={[endlat, endlng]} icon={endIcon} /> 
        <Marker class="vessel"  position={vesselPosition} icon={vesselIcon}  />  
        </MapContainer> 
    </div>
  )
}
