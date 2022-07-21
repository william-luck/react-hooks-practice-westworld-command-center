import {React, useState} from "react";
import { Segment, Button } from "semantic-ui-react";
import { Log } from "../services/Log";

function LogPanel({hosts, handleAssign, setSelectedHost, logs, setLogs }) {

  const [activated, setActivated] = useState(false)

  function handleClick() {
  
    for (let hostId = 1; hostId < hosts.length + 1; hostId++) {
      fetch(`http://localhost:3001/hosts/${hostId}`, {
      method: 'PATCH', 
      headers: {
        "Content-Type" : 'application/json'
      },
      body: JSON.stringify({active: !activated})
    })
        .then(response => response.json())
        .then(() => handleAssign())
        .then(() => setSelectedHost([]))
        .then(() => setActivated(!activated))
    }

    {activated ? setLogs([Log.notify('Decomissioning all hosts.'), ...logs]) : setLogs([Log.warn('Activating all hosts!'), ...logs]) }
    
  }


  function dummyLogs() {
    // This is just to show you how this should work. But where should the log data actually get stored?
    // And where should we be creating logs in the first place?
    // Use the Log Service class (located in: 'src/services/Log') we've created anywhere you like.
    // Just remember to import it

    let logs = [];

    logs.unshift(Log.warn("This is an example of a warn log"));
    logs.unshift(Log.notify("This is an example of a notify log"));
    logs.unshift(Log.error("This is an example of an error log"));
    logs.unshift(Log.error('hoho error'))

    return logs;
  }

  return (
    <Segment className="HQComps" id="logPanel">
      <pre>
        {logs.map((log, i) => (
          <p key={i} className={log.type}>
            {log.msg}
          </p>
        ))}
      </pre>
      <Button fluid color={activated ? 'green' : 'red'} content={activated ? "DECOMISSION ALL" : "ACTIVATE ALL"} onClick={handleClick}/>
    </Segment>
  );
}

export default LogPanel;
