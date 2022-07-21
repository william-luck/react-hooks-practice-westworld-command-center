import React from "react";
import "../stylesheets/Area.css";
import Host from "./Host";
import HostList from "./HostList";

function Area({area, hosts, selectedHost, setSelectedHost}) {

  let areaName = area.name.replaceAll('_', ' ')
  areaName = areaName.split(' ')
  areaName = areaName.map(area => (area.charAt(0).toUpperCase() + area.slice(1)))
  
  let areaHosts = hosts.filter(host => host.area === area.name) // To only pass an array of the hosts that match each area. 
  areaHosts = areaHosts.filter(host => host.active) // To only include active hosts (the rest are in cold storage)


  return (
    <div
      className="area"
      id={area.name}
    >
      <h3 className="labels">
        {areaName.join(' ')}
      </h3>
      <HostList hosts={areaHosts} selectedHost={selectedHost} setSelectedHost={setSelectedHost}/>
    </div>
  );
}

Area.propTypes = {
  hosts: function (props) {
    if (props.hosts.length > props.limit) {
      throw Error(
        `HEY!! You got too many hosts in ${props.name}. The limit for that area is ${props.limit}. You gotta fix that!`
      );
    }
  },
};

export default Area;
