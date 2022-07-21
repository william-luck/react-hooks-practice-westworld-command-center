import {React, useEffect, useState} from "react";
import { Segment } from "semantic-ui-react";
import "../stylesheets/App.css";
import WestworldMap from './WestworldMap'
import Headquarters from "./Headquarters"

function App() {

  const [hosts, setHosts] = useState([])
  const [selectedHost, setSelectedHost] = useState([])
  const [assign, setAssign] = useState(false)
  const [areas, setAreas] = useState([])
  const [logs, setLogs] = useState([])

  function handleAssign() {
    setAssign(!assign)
  }


  useEffect(() => {
    fetch('http://localhost:3001/hosts')
      .then(response => response.json())
      .then(src => setHosts(src))
  
  }, [assign])


  return (
    <Segment id="app">
      <WestworldMap hosts={hosts} selectedHost={selectedHost} setSelectedHost={setSelectedHost} areas={areas} setAreas={setAreas}/>
      <Headquarters hosts={hosts} selectedHost={selectedHost} setSelectedHost={setSelectedHost} handleAssign={handleAssign} areas={areas} logs={logs} setLogs={setLogs}/>
    </Segment>
  );
}

export default App;
