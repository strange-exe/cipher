# Cipher

A lightweight JavaScript-based **text encryption and decryption tool** using a seeded pseudo-random algorithm.  
Encrypts words by rearranging characters and inserting random noise based on a given key, and reverses the process to decrypt.

---

## Features

- Switch between **Encrypt** and **Decrypt** modes  
- Uses a **seeded RNG** to make encryption key-dependent  
- Supports **all characters** including special symbols and spaces  
- Instant **copy-to-clipboard** functionality  
- Clean, responsive UI (when paired with simple HTML/CSS)

---

## How It Works

1. Each word in the input text is processed individually.  
2. The first letter is moved to the end, and six random characters are inserted at deterministic positions based on the key.  
3. Decryption reverses the steps using the same key.  
4. A **deterministic seeded RNG** ensures the same input and key always produce the same result.

---

## Tech Stack

- HTML5
- CSS3
- JavaScript

---

### [Demo](https://abhinesh.me/cipher/)

---

## Author
**[Abhinesh](https://instagram.com/_abhinesh.exe)**
