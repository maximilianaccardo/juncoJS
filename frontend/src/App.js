import { useState } from 'react'
import { Network } from 'junco'

import { NetworkControls, NetworkView } from "./components/Network";

function App() {
  // default network structure
  const [netStructure, setNetStructure] = useState([4, 5, 2])

  // create network
  const n = new Network(netStructure, 81)
  const [network, setNetwork] = useState(n)
  const [networkOutput, setNetworkOutput] = useState(null)

  return (
    <div className="App">
      <NetworkControls 
        network={network}
        setNetworkOutput={setNetworkOutput}
        setNetwork={setNetwork}
        setNetStructure={setNetStructure}
      ></NetworkControls>
      <NetworkView
        network={network}
        networkOutput={networkOutput}>
      </NetworkView>
    </div>
  );
}

export default App;
