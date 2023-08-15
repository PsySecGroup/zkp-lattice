# Lattice-based Zero-Knowledge Proof (ZKP)

This repository contains a simplified example of a lattice-based Zero-Knowledge Proof
(ZKP) implementation in JavaScript. The implementation demonstrates the key steps
involved in a lattice-based ZKP protocol, including lattice creation, encoding,
commitment, challenge generation, response calculation, and verification.

## Usage

1. Clone the repository:

```
git clone https://github.com/PsySecGroup/zkp-lattice.git
cd lattice-zkp
npm install
```

2. Run the example code:

`npm test`


3. Import it into your project

```js
const {
	generateRandomVector,
	createLattice,
	encodeLattice,
	encodeLattice,
	hash,
	createCommitment,
	generateChallenge,
	generateResponse,
	verifyResponse
} = require('lattice-zkp');
````

## Key Functions

- `generateRandomVector`: Generates a random vector with values in the specified range.
- `createLattice`: Creates a lattice with random vectors.
- `encodeLattice`: Encodes a secret value into the lattice using scalar multiplication.
- `createCommitment`: Creates a commitment vector based on hashed encoded lattice vectors.
- `generateChallenge`: Generates a random challenge for the ZKP (replace with a secure random generator).
- `generateResponse`: Generates a response to the challenge based on the secret value and encoded lattice.
- `verifyResponse`: Verifies if the response matches the expected commitment.

[Review the test](tests/index.js) to see the correct order of code execution.

## Security Considerations

This example is a simplified illustration for educational purposes. In real-world applications, you should use well-established cryptographic libraries, secure random number generators, and proper hash functions. Additionally, consider security implications, modular arithmetic, and expert guidance when implementing lattice-based cryptography.

## License

This repository is licensed under the [MIT License](LICENSE).

---

Feel free to customize this `README.md` with more detailed information and explanations as needed. Remember that real cryptographic implementations require careful consideration of security and proper practices.
