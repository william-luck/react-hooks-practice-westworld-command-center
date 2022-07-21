import React from "react";
import { Segment } from "semantic-ui-react";
import HostList from './HostList'


function ColdStorage({hosts, selectedHost, setSelectedHost}) {

  let coldHosts = hosts.filter(host => !host.active) // to only pass inactive hosts to cold storage

  return (
    <Segment.Group className="HQComps">
      <Segment compact>
        <h3 className="labels">ColdStorage</h3>
      </Segment>
      <Segment compact>
        <HostList hosts={coldHosts} selectedHost={selectedHost} setSelectedHost={setSelectedHost}/>
      </Segment>
    </Segment.Group>
  );
}

export default ColdStorage;
