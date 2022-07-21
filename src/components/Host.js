import {React, useState} from "react";
import { Card } from "semantic-ui-react";
import "../stylesheets/Host.css";

function Host({host, selectedHost, setSelectedHost}) {


  function handleClick() {
    
    if (selectedHost === host) {
      setSelectedHost([]) // emptys details container if double click 
    } else {
      setSelectedHost(host) // for sending host to details container 
    }

    

  }
  
  
  return (
    <Card
      className={selectedHost.id === host.id ? "host selected" : 'host'}
      onClick={handleClick}
      image={host.imageUrl}
      raised
      link
    />
  );
}

export default Host;
