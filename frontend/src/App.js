import { useState } from 'react'
import { Network } from 'junco'

import { NetworkControls, NetworkView } from "./components/Network";

function App() {
  // create network
  const n = new Network([4, 10, 10, 10, 10, 4])
  const [network] = useState(n)
  const [networkOutput, setNetworkOutput] = useState(null)

  return (
    <div className="App">
      <NetworkControls 
        network={network}
        setNetworkOutput={setNetworkOutput}
      ></NetworkControls>
      <NetworkView
        network={network}
        networkOutput={networkOutput}>
      </NetworkView>
    </div>
  );
}

export default App;
