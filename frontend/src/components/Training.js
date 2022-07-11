import { useState } from "react"
import { GenericInput } from "./Inputs"

const Training = ({
  network,
  networkOutput
}) => {
  const nOutputs = network.nOutputs
  const [expectedOutputs, setExpectedOutputs] = useState(Array(nOutputs).fill(0))

  const handleExpectedChange = e => {

  }
  
  return (
    <div>
      <h2>Training</h2>
      <h3>Expected Outputs</h3>
      {
        Array(nOutputs).fill(0).map((_, i) =>
          (
            <div key={i}>
              <GenericInput
                i={i}
              ></GenericInput>
            </div>
          )
        )
      }
      <h3>Loss</h3>
    </div>
  )
}

export {
  Training
}