import React from 'react'
import { useEffect,useState } from 'react'
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import L from 'leaflet';
import vessel from "../Assets/vessel.png";
import start from "../Assets/start.png";
import end from "../Assets/end.png";

export default function MapComponent({ startlat, startlng, endlat, endlng, speed }) {
    const[vesselPosition,setVesselPosition]=useState([startlat,startlng]);

   

  return (
 
    <div>
       <MapContainer center={[startlat, startlng]} zoom={11} style={{ height: '100vh', width: '100%' }}></MapContainer>
    </div>
  )
}
