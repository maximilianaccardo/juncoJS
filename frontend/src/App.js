import { useState } from 'react'
import { Network } from 'junco'

import { NetworkView } from "./components/Network";

function App() {
  // create network
  const n = new Network([4, 10, 10, 4])
  const [network] = useState(n)


  return (
    <div className="App">
      <NetworkView network={network}></NetworkView>
    </div>
  );
}

export default App;
