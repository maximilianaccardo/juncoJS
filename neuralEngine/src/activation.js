function relu(z) {
  return Math.max(0, z)
}

function sigmoid(z) {
  return 1 / (1 + Math.exp(-z))
}

export {
  relu,
  sigmoid
}