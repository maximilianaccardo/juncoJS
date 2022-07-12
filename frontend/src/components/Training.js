import { useState } from "react"
import { GenericInput } from "./Inputs"

const Training = ({
  network,
  networkOutput,
  expectedOutputs,
  setExpectedOutputs,
  loss
}) => {
  const nOutputs = network.nOutputs

  const handleExpectedChange = e => {
    var newEO = [...expectedOutputs]

    const i = e.target.dataset.i
    const val = Number(e.target.value)


    newEO[i] = val
    setExpectedOutputs(newEO)
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
                handleInputChange={handleExpectedChange}
                i={i}
              ></GenericInput>
            </div>
          )
        )
      }
      <h3>Loss</h3>
      <p>{loss}</p>
    </div>
  )
}

export {
  Training
}