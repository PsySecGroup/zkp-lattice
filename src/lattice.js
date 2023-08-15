// import { createHash } from 'crypto'
import { randomUint32 } from '@stablelib/random'
import {
  hash,
  encoder,
  responder,
  verifier
} from './transforms'

/**
 * Function to create a random vector with values in the range [0, modulus)
 */
export function generateRandomVector (dimension, modulus) {
  const vector = []
  for (let i = 0; i < dimension; i++) {
    vector.push(Math.floor(Math.random() * modulus))
  }
  return vector
}

/**
 * Function to create a lattice with random vectors
 */
export function createLattice (dimension, modulus, latticeSize) {
  const lattice = []
  for (let i = 0; i < latticeSize; i++) {
    const vector = generateRandomVector(dimension, modulus)
    lattice.push(vector)
  }
  return lattice
}

/**
 * Encode a secret value 'x' into the lattice using scalar multiplication
 */
export function encodeLattice (lattice, x, modulus) {
  const encodedLattice = []
  for (let i = 0; i < lattice.length; i++) {
    const encodedVector = lattice[i].map(element => encoder(element, x, modulus))
    encodedLattice.push(encodedVector)
  }
  return encodedLattice
}

/**
 * Create a commitment from the lattice by hashing its encoded vectors
 */
export function createCommitment (encodedLattice, customHash = hash) {
  const commitment = encodedLattice.map(vector => customHash(vector))
  return commitment
}

/**
 * Generate a random challenge for the ZKP (this is NOT secure, use a proper random number generator in practice)
 */
export function generateChallenge () {
  return randomUint32() * 1000000 // Replace with a secure random number generator
}

/**
 * Generate a response to the challenge based on the secret value and encoded lattice
 */
export function generateResponse (challenge, secretValue, encodedLattice, modulus) {
  const response = encodedLattice.map(vector => responder(vector, secretValue, challenge, modulus))
  return response
}

/**
 * Verify the response against the commitment and challenge
 */
export function verifyResponse (commitment, challenge, response, modulus) {
  const expectedCommitment = response.map(value => verifier(value, challenge, modulus))

  for (let i = 0; i < commitment.length; i++) {
    if (commitment[i] !== expectedCommitment[i]) {
      // Response is invalid
      console.error([
        i,
        commitment[i],
        expectedCommitment[i]
      ])
      return false
    }
  }
  // Response is valid
  return true
}
