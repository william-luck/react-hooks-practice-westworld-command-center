import React, { useEffect, useState } from "react";
import {
  Radio,
  Icon,
  Card,
  Grid,
  Image,
  Dropdown,
  Divider,
} from "semantic-ui-react";
import "../stylesheets/HostInfo.css";
import { Log } from "../services/Log";

function HostInfo( {hosts, selectedHost, setSelectedHost, handleAssign, areas, logs, setLogs }) {

  const {id, firstName, lastName, active, imageUrl, gender, area, authorized} = selectedHost
  const [value, setValue] = useState('');
  const [comissioned, setComissioned] = useState(active)

  console.log(active)
  

  useEffect(() => {
    setValue(area)
  }, [selectedHost]) /// Ahhhhhhh, everytime the selectedHost is changed, I want to set the value. The reason why it was not updating before is because while the information passed in was changing, the state for the dropdown value was not.

  const [options] = useState([
    { key: "high_plains", text: 'High Plains', value: "high_plains" },
    { key: "lowlands", text: "Lowlands", value: "lowlands" },
    { key: "pariah", text: "Pariah", value: "pariah" },
    { key: "python_pass", text: "Python Pass", value: "python_pass" },
    { key: "badlands", text: "Badlands", value: "badlands" },
  ]);


  function handleOptionChange(e, { value }) {

    const limit = areas.find(area => area.name === value).limit // returns integer of area that was selected
    const amountHosts = hosts.filter(host => host.area === value).filter(host => host.active).length

    console.log('limit ', limit)
    console.log('current number of hosts ', amountHosts)

    let areaName = value.replaceAll('_', ' ')
    areaName = areaName.split(' ')
    areaName = areaName.map(letter => (letter.charAt(0).toUpperCase() + letter.slice(1)))

    if (amountHosts < limit) { 
      fetch(`http://localhost:3001/hosts/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        ...selectedHost, area: value
      })
    })
      .then(response => response.json())
      .then(change => setSelectedHost(change)) // Need this so the details component is getting up to date information 
      .then(() => handleAssign()) // Toggle re-rerender of map
      .then(() => setValue(value)) // sets form value to area selected
      .then(() => setLogs([Log.notify(`${firstName} has been added to ${areaName}`), ...logs]))
    } else {
      setLogs([Log.error(`Too many hosts. Cannot add ${firstName} to ${areaName}`), ...logs])
    }
  } 

  function handleRadioChange() {

    const limit = areas.find(element => element.name === area).limit // retrives limit for the target area
    const amountHosts = hosts.filter(host => host.area === area).filter(host => host.active).length // rettrieves number of hosts in target area

    console.log('limit ', limit)
    console.log('current number of hosts ', amountHosts)

    const areaName = areas.find(element => element.name === area).name.split(' ').map(letter => (letter.charAt(0).toUpperCase() + letter.slice(1)))

    if ((amountHosts < limit || active)) { // Will only run if the limit not exceeded, of if the selected host is active (meaning that they can be removed)
      fetch(`http://localhost:3001/hosts/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        ...selectedHost, active: !active
      })
    })
      .then(response => response.json())
      .then(change => {
        setSelectedHost(change)
        console.log(change)
        if (change.active === false) {
          setLogs([Log.notify(`Decomissioned ${firstName}`), ...logs])
        } else if (change.active === true) {
          setLogs([Log.warn(`Actiavted ${firstName}`)])
        }
      }) // Need this so the details component is getting up to date information 
      .then(() => handleAssign()) // Toggle re-rerender of map
      .then(() => setComissioned(!active)) // changes value of radio
      // .then(() => setLogs([Log.notify(`${firstName} has been added to ${areaName}`), ...logs]))
    } else {
      setLogs([Log.error(`Too many hosts. Cannot add ${firstName} to ${areaName}`), ...logs])
    }
  }

  

  return (
    <Grid>
      <Grid.Column width={6}>
        <Image
          src={imageUrl}
          floated="left"
          size="small"
          className="hostImg"
        />
      </Grid.Column>
      <Grid.Column width={10}>
        <Card>
          <Card.Content>
            <Card.Header>
              {firstName} | {gender === 'Male' ? <Icon name="man" /> : <Icon name="woman" />}
            </Card.Header>
            <Card.Meta>
              <Radio
                onChange={handleRadioChange}
                label={active ? "Active" : "Decomissioned"}
                checked={active}
                slider
              />
            </Card.Meta>
            <Divider />
            Current Area:
            <Dropdown
              onChange={handleOptionChange}
              value={value}
              options={options}
              selection
            />
          </Card.Content>
        </Card>
      </Grid.Column>
    </Grid>
  );
}

export default HostInfo;
