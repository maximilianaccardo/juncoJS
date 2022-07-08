import { useState } from 'react'
import { Network } from 'junco'

import { NetworkControls, NetworkView } from "./components/Network";

function App() {
  // default network structure
  const [netStructure, setNetStructure] = useState([4, 5, 2])

  // create network
  const n = new Network(netStructure, 81)
  const [network, setNetwork] = useState(n)

  const defaults = Array(network.nInputs).fill(0)
  const [inputs, setInputs] = useState(defaults)

  const [networkOutput, setNetworkOutput] = useState(n.evaluate(inputs).outputMap)

  return (
    <div className="App">
      <NetworkControls 
        network={network}
        setNetworkOutput={setNetworkOutput}
        setNetwork={setNetwork}
        netStructure={netStructure}
        setNetStructure={setNetStructure}
        inputs={inputs}
        setInputs={setInputs}
      ></NetworkControls>
      <NetworkView
        network={network}
        networkOutput={networkOutput}>
      </NetworkView>
    </div>
  );
}

export default App;
