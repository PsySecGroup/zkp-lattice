/**
 * Simulated default hash function (this is NOT secure, use a proper hash function in practice)
 */
export const hash = (vector) => {
  let hashValue = 0
  for (let i = 0; i < vector.length; i++) {
    hashValue = (hashValue + vector[i]) % 256
  }
  return hashValue
}

/**
 * Encode a secret value 'x' into the lattice using scalar multiplication
 */
export const encoder = (element, x, modulus) => (element * x) % modulus

/**
 * Generate a response to the challenge based on the secret value and encoded lattice
 */
export const responder = (vector, secretValue, challenge, modulus) => {
  let sum = 0
  for (let i = 0; i < vector.length; i++) {
    sum += (vector[i] * secretValue * challenge) % modulus
  }
  return sum
}

/**
 * Verify the response against the commitment and challenge
 */
export const verifier = (value, challenge, modulus) => (value * challenge) % modulus
