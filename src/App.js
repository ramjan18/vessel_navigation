
import './App.css';
import MapComponent from './components/MapComponent';

function App() {

  const startlat = 22.1696;
  const startlng = 91.4996;
  const endlat = 22.2637;
  const endlng = 91.7159;
  const speed = 20; 

  return (
    <div>
    <h1>VESSEL NAVIGATON</h1>
    <MapComponent startlat={startlat} startlng={startlng} endlat={endlat} endlng={endlng} speed={speed}></MapComponent>
    </div>
  );
}

export default App;
