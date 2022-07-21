import {React, useState, useEffect} from "react";
import { Segment } from "semantic-ui-react";
import Area from './Area';

function WestworldMap({hosts, selectedHost, setSelectedHost, areas, setAreas}) {

  

  useEffect(() => {
    fetch('http://localhost:3001/areas')
      .then(response => response.json())
      .then(src => setAreas(src))
  }, [])


  return <Segment id="map">
    {areas.map(area => <Area key={area.id} area={area} hosts={hosts} selectedHost={selectedHost} setSelectedHost={setSelectedHost}/>)}
  </Segment>;
}

export default WestworldMap;
