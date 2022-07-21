import {React, useState} from "react";
import { Card } from "semantic-ui-react";
import Host from './Host'

function HostList({hosts, selectedHost, setSelectedHost}) {
  
  return (
    <Card.Group itemsPerRow={6}>
      {hosts.map(host => <Host key={host.id} host={host} selectedHost={selectedHost} setSelectedHost={setSelectedHost}/>)}
      </Card.Group>
  );
}

export default HostList;
