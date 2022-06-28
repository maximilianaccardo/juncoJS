import {useState} from 'react'

const NetworkControls = ({network, setNetworkOutput}) => {
  const [inputs, setInputs] = useState([0, 0, 0, 0])

  const handleInputChange = (event) => {
    var newInputs = [...inputs]
    const i = event.target.dataset.inputNode
    const val = Number(event.target.value)

    newInputs[i] = val
    setInputs(newInputs)
    console.log(newInputs)
  }

  const updateOutput = (event) => {
    event.preventDefault()

    var o = network.evaluate(inputs).outputMap
    setNetworkOutput(o)
  }

  return (
    <div>
      <h2>Controls</h2>
      <h3>Inputs</h3>
      <form onSubmit={updateOutput}>
          {
            [...Array(network.nInputs)].map((el, i) => {
              return (
                <div key={i}>
                  <label>{i}  </label>
                  <input
                    type="number"
                    id={`input_${i}`}
                    data-input-node={i}
                    onChange={handleInputChange}
                  >
                  </input>
                </div>
              )
            })
          }
          <button type="submit">Run</button>
      </form>
    </div>
  )
}

const NetworkView = ({network, networkOutput}) => {
  

  return (
    <div>
      <h2>Neural Network</h2>
      {
        networkOutput &&
        networkOutput.map((o, i) => 
          <ul key={i}>
            {
              o.map((l, j) => 
                <li key={j}>{l}</li>
              )
            }
          </ul>
        )
      }
    </div>
  )
}

export {
  NetworkView,
  NetworkControls
}