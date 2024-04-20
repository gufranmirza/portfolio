---
title: Trusted Platform Module (TPM) as Root of Trust (rot) and cryptographic features
description: High level overview of the trusted platform module its cryptographic features that can be used to perform the platform attestation.
date: 2024-02-08
draft: false
slug: /blogs/trusted-platform-module-and-attestation
cover: './cover.jpg'
tags:
  - TPM
  - crypto
  - TEE
  - Security
  - Hardware
  - ConfidentialComputing
  - ROT
---

The Trusted Platform Module (TPM) is a dedicated hardware component designed to enhance the security of computing systems. It provides a root of trust for the platform and offers various security-related functions. The primary role of a hardware TPM involves secure storage, key management, and attestation.

## Root of Trust (RoT):

The Root of Trust is the foundation of a secure system, providing a starting point for establishing trust. It is typically a hardware-based component or set of components that are inherently trusted. The RoT ensures the integrity and security of a system from the beginning of the boot process.

## Secure Storage:

- **Key Storage:** TPMs are equipped with secure storage areas that protect cryptographic keys from unauthorized access. This storage is often referred to as the Platform Configuration Registers (PCRs).

- **Endorsement Key (EK):** The TPM is initialized with a unique and secret Endorsement Key (EK) during manufacturing. The EK serves as a root key for the TPM and is used for attestation purposes.

## Key Management:

- **Key Generation:** TPMs can generate cryptographic key pairs, including public and private keys, within the hardware. These keys can be used for various security functions.

- **Storage Root Key (SRK):** TPMs often have a Storage Root Key (SRK), which is used to protect other keys. It is a key generated within the TPM during initialization and is typically used to wrap (encrypt) and protect other keys.

## Sealing and Unsealing:

- **Data Protection:** TPMs can be used to seal (encrypt) sensitive data based on the state of the system. The data can only be unsealed (decrypted) if the system is in a specific, expected state.

- **Binding Keys:** Public-private key pairs generated by the TPM can be used for data binding, where data is bound to a specific system state, ensuring its integrity.

## Secure Boot and Measurement:

- **Boot Integrity:** TPMs are involved in the secure boot process, measuring each stage of the boot sequence and extending the measurements into the PCRs. This provides a chain of trust from the hardware to the operating system.
- **Integrity Verification:** The measurements recorded in the PCRs can be used to verify the integrity of the system. Deviations from the expected values indicate potential tampering.

## Secure Key Exchange:

- **Asymmetric Key Exchange:** TPMs can facilitate secure key exchange protocols by generating, storing, and managing asymmetric key pairs.

- **Key Wrapping:** Public keys can be used to wrap (encrypt) other keys, ensuring that they can only be unwrapped (decrypted) by the TPM that generated the wrapping key.

## Attestation (In detail):

The TPM attestation process provides a way to remotely verify the trustworthiness of a computing platform. It relies on the TPM's ability to securely measure the platform's state, generate signed attestation data, and allow remote entities to verify the integrity and authenticity of that data. The use of attestation enhances security in scenarios such as secure boot, remote device management, and secure communication between devices.

**TPM Initialization and Key Generation:**

- During manufacturing, the TPM is initialized with a unique and secret Endorsement Key (EK). The EK serves as a root of trust for attestation.
- The TPM can generate other keys, such as Storage Root Key (SRK) and Attestation Identity Key (AIK), during its initialization.

**Measurement and PCR Extending:**

- During the system boot process, each component (bootloader, BIOS, OS kernel, etc.) is measured using a cryptographic hash function (e.g., SHA-256).

- The measured values are extended into the Platform Configuration Registers (PCRs) of the TPM. PCRs are registers that store hash values and serve as a cumulative measure of the system's state.

**AIK Creation (Optional):**

- The platform may create an Attestation Identity Key (AIK) within the TPM. The AIK is used for attestation and is typically bound to specific PCRs to link it to the platform's state.

- The AIK is associated with the Endorsement Key (EK) and is used to sign attestation data.

**Quote Generation:**

- The platform, or a software component within the platform, generates a quote. A quote is a signed set of PCR values from the TPM. It proves that the platform is in a specific state.

- The quote is signed with the AIK, providing evidence that the attestation data comes from a TPM with a specific Endorsement Key.

**Challenge-Response Protocol (Optional):**

- The verifier (remote entity) may challenge the platform to provide a quote. The challenge-response protocol ensures that the attestation is not replayed.
- The platform generates a response to the challenge, including a new quote.

**Sending Attestation Data:**

- The platform sends the attestation data (quote) to the verifier. This may include the PCR values, the AIK's signature, and other relevant information.

- The attestation data is typically sent securely, often through a secure channel like TLS.

**Verification by the Verifier:**

- The verifier receives the attestation data and performs the following checks:
  - Signature Verification: The AIK's signature is verified using the EK's public key.
  - PCR Values: The PCR values are checked to ensure they match the expected values for a trusted platform.
  - Validity Check: The AIK, EK, and other elements are checked against known, trusted values.

**Trust Decision:**

- Based on the verification results, the verifier makes a trust decision. If the attestation data is valid and matches the expected state, the platform is deemed trustworthy.

- The verifier can decide whether to allow access, establish a secure communication channel, or take other actions based on trust.

---

In summary, the hardware TPM plays a crucial role in providing a secure foundation for computing systems. It offers secure storage for cryptographic keys, supports key generation and management, enables remote attestation, and ensures the integrity of the system through secure boot processes.

Public and private keys within the TPM are utilized for various cryptographic operations, attestation, and data protection, contributing to the overall security of the platform.