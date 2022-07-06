import { useState } from 'react'
import { Network } from 'junco'

import { NetworkControls, NetworkView } from "./components/Network";

function App() {
  // create network
  const n = new Network([2, 3, 3, 2], 81)
  const [network, setNetwork] = useState(n)
  const [networkOutput, setNetworkOutput] = useState(null)

  return (
    <div className="App">
      <NetworkControls 
        network={network}
        setNetworkOutput={setNetworkOutput}
        setNetwork={setNetwork}
      ></NetworkControls>
      <NetworkView
        network={network}
        networkOutput={networkOutput}>
      </NetworkView>
    </div>
  );
}

export default App;
