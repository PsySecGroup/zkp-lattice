const assert = require('assert')
const {
  createLattice,
  encodeLattice,
  createCommitment,
  generateChallenge,
  generateResponse,
  verifyResponse
} = require('../src/index')

// ZKP Settings

const challenge = 1564541326000000
const modulus = 17
const secretValue = 5
const lattice = [
  [16, 12, 0, 8],
  [13, 5, 16, 6],
  [13, 13, 9, 13],
  [4, 6, 1, 6],
  [16, 5, 8, 8]
]

let encodedLattice
let commitment
let response

console.log('Lattice:\n', lattice)

// Tests

const tests = {

  /**
   * Create a matrix of data
   */
  testCreateLattice () {
    const lattice = createLattice(4, modulus, 5)

    // assert.equal(lattice.length, 5)

    for (const row of lattice) {
      assert.equal(row.length, 4)
    }
  },

  /**
   * Encode the lattice for transmission
   */
  testEncodeLattice () {
    // Set the encode the secret value into the lattice
    encodedLattice = encodeLattice(lattice, secretValue, modulus)

    // assert.deepEqual(encodedLattice, [
    //   [12, 9, 0, 6],
    //   [14, 8, 12, 13],
    //   [14, 14, 11, 14],
    //   [3, 13, 5, 13],
    //   [12, 8, 6, 6]
    // ])

    console.log('\nEncoded Lattice:\n', encodedLattice)
  },

  /**
   * Create a committment
   */
  testCreateCommitment () {
    // Create a commitment from the encoded lattice
    commitment = createCommitment(encodedLattice)

    // assert.deepEqual(commitment, [27, 47, 53, 34, 32])

    console.log('\nCommitment:\n', commitment)
  },

  testGenerateChallenge () {
    const challenge = generateChallenge()

    assert.equal(challenge >= 1000000 || challenge === 0, true)
  },

  testGenerateResponse () {
    console.log('\nChallenge:\n', challenge)

    // Generate a response to the challenge
    response = generateResponse(challenge, secretValue, encodedLattice, modulus)

    // assert.deepEqual(response, [28, 33, 43, 51, 25])

    console.log('\nResponse:\n', response)
  },

  testVerifyResponse () {
    const isValid = verifyResponse(commitment, challenge, response, modulus)

    if (isValid) {
      console.log('\nResponse is valid: Zero-Knowledge Proof successful.')
    } else {
      console.error('\nResponse is invalid: Zero-Knowledge Proof failed. Settings:\n', {
        challenge,
        modulus,
        secretValue,
        lattice,
        encodedLattice,
        commitment,
        response
      })
    }
  }
}

// Run all tests
Object.values(tests).forEach(test => test())
