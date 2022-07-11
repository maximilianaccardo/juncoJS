import React from 'react'
import chroma from "chroma-js"

const NetworkView = ({networkOutput}) => {
  const colorScale = chroma.scale(["black", "red"])

  // calculate locations of nodes
  const nodes = []

  // viewport width
  const vbWidth = 1200

  // layer spacing
  const lSpacing = (vbWidth) / networkOutput.outputMap.length

  if(networkOutput) {
    // vertical spacing between nodes
    const vSpace = 100

    // get vertical center of graph
    const maxLayer = Math.max(
      ...networkOutput.outputMap.map((l) => 
        l.length
      )
    )
    const vCenter = (vSpace * maxLayer) / 2

    // calculate locations of nodes
    networkOutput.outputMap.forEach((o, i) => {
      const layerNodes = []
      let vStart = vCenter - (((o.length - 1) / 2) * vSpace)
      o.forEach((l, j) => {
        let node = {}
        node.x = 100 + i * lSpacing
        node.y = vStart + j * vSpace
        node.color = colorScale(l)
        layerNodes.push(node)
      })
      nodes.push(layerNodes)
    })
  }

  // calculate locations of lines
  const lines = []
  for(let i = 0; i < nodes.length - 1; i ++) {
    for(let j = 0; j < nodes[i].length; j++) {
      for(let k = 0; k < nodes[i + 1].length; k++) {
        let line = {}

        // starting node
        line.x1 = nodes[i][j].x
        line.y1 = nodes[i][j].y

        // node in next layer
        line.x2 = nodes[i + 1][k].x
        line.y2 = nodes[i + 1][k].y

        // get stroke from starting node
        line.stroke = nodes[i][j].color
      
        lines.push(line)
      }
    }
  }

  return (
    <div>
      <h2>Neural Network</h2>
      <svg viewBox={`0 0 ${vbWidth} 4000`}>
        {
          lines.map((l, i) => 
            <line
              key={i}
              x1={l.x1}
              y1={l.y1}
              x2={l.x2}
              y2={l.y2}
              stroke={l.stroke}
            />
          )
        }
        {
          nodes.flat().map((n, i) => 
            <circle
              key={i}
              cx={n.x}
              cy={n.y}
              r="20"
              style={{
                fill: n.color
              }}
            />
          )
        }

      </svg>
    </div>
  )
}

export {
  NetworkView
}