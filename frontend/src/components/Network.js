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

    var o = network.evaluate(inputs)
    // round to 2 decimals
    // to do
    setNetworkOutput(o)
  }

  return (
    <div>
      <h2>Controls</h2>
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
      <h2>Output</h2>
      <h3>{networkOutput}</h3>
    </div>
  )
}

export {
  NetworkView,
  NetworkControls
}