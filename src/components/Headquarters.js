import React from "react";
import { Grid } from "semantic-ui-react";
import Details from "./Details";
import "../stylesheets/Headquarters.css";
import ColdStorage from './ColdStorage'
import LogPanel from './LogPanel'

function Headquarters({hosts, selectedHost, setSelectedHost, handleAssign, areas, logs, setLogs}) {
  return (
    <Grid celled="internally">
      <Grid.Column width={8}><ColdStorage hosts={hosts} selectedHost={selectedHost} setSelectedHost={setSelectedHost} /></Grid.Column>
      <Grid.Column width={5}>
        <Details hosts={hosts} selectedHost={selectedHost} setSelectedHost={setSelectedHost} handleAssign={handleAssign} areas={areas} logs={logs} setLogs={setLogs}/>
      </Grid.Column>
      <Grid.Column width={3}>
        <LogPanel hosts={hosts} handleAssign={handleAssign} setSelectedHost={setSelectedHost} logs={logs} setLogs={setLogs}/>
      </Grid.Column>
    </Grid>
  );
}

export default Headquarters;
