import { useState } from 'react'
import { Network } from 'junco'

import { NetworkControls, NetworkView, NetworkOptions } from "./components/Network";
import { Training } from "./components/Training"

function App() {
  // default network structure
  const [netStructure, setNetStructure] = useState([4, 5, 2])

  // create network
  const n = new Network(netStructure, 81)
  const [network, setNetwork] = useState(n)

  const defaults = Array(network.nInputs).fill(0)
  const [inputs, setInputs] = useState(defaults)

  const [networkOutput, setNetworkOutput] = useState(network.evaluate(inputs))

  // options
  const [options, setOptions] = useState({
    training: false
  })

  return (
    <div className="App">
      <NetworkOptions
        options={options}
        setOptions={setOptions}
      ></NetworkOptions>
      {
        options.training &&
        <Training
          network={network}
        ></Training>
      }
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
