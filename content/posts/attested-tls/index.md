---
title: TLS with Remote Attestation (aTLS) | Machine-to-Machine Secure Channel
description: An Attested TLS channel is a TLS channel that integrates remote attestation validation as part of the TLS channel establishing process.
date: 2024-04-20
draft: false
cover: './cover.png'
slug: /blogs/attested-tls
tags:
  - TLS
  - aTLS
  - Microprocessor
  - Encryption
---

### 1. Introduction

aTLS introduces a set of protocol extensions to the TLS 1.3 handshake, enabling the binding of TLS authentication keys to remote attestation sessions.

This allows peers to authenticate themselves using "attestation credentials," comprising platform evidence and key attestation, enhancing security metrics during TLS channel setup.

These extensions are technology-agnostic, accommodating various attestation formats, and support both background-check and passport topologies for authentication. Additionally, the specification allows for one-way and mutual authentication using attestation credentials, with attestation topologies at each peer being independent.

### 2. Conventions and Terminology

The following terms are used in this document:

- TLS Identity Key (TIK):
  A cryptographic key used by one of the peers to authenticate
  itself during the TLS handshake.

- TIK-C, TIK-S:
  The TIK that identifies the client or the server, respectively.

- TIK-C-ID, TIK-S-ID:
  An identifier for TIK-C or respectively, TIK-S. This may be a
  fingerprint (cryptographic hash) of the public key, but other
  implementations are possible.

### 3. Overview

The goal is to link the authenticated key exchange of TLS with an interleaved remote attestation session in such a way
that the key used to sign the handshake can be proven to be residing within the boundaries of an attested TEE. The requirement is that the attester can provide evidence containing the security status of both the signing key and the platform that is hosting it. The associated security goal is to obtain such binding so that no replay, relay or splicing from an adversary is possible.

TEE attestation is provided by a Platform Attestation Token (PAT) signed by the attester's "attesting environment". Among other security metrics, the PAT contains evidence about the integrity of a "Key Attestation Service" executing within the TEE which issues a Key Attestation Token (KAT) for the TLS handshake signing key (TIK). The protocol's security relies on the verifiable binding between these two logically separate units of evidence.

### 4. Attestation Extensions

As typical with new features in TLS, the client indicates support for the new extension in the ClientHello message. The newly introduced extensions allow remote attestation credentials and nonces to be exchanged. The nonces are used for guaranteeing freshness of the exchanged evidence when the background check model is in use.

In TLS a client has to demonstrate possession of the private key via the CertificateVerify message, when client-based authentication is requested. The attestation payload must contain assertions relating to the client's TLS Identity Key (TIK-C), which associate the private key with the attestation information. These assertions may come in the form of a Key Attestation Token (KAT), or of specific claims in an attestation result document.

In a monolithic implementation, the TLS stack is completely embedded within the TEE. In a split implementation, the TLS stack is located outside the TEE, but any private keys (and in particular, the TIK) only exist within the TEE. In order to support both options, only the TIK's identity and its public component are ever passed between the Client or Server TLS stack and its Attestation Service.

### 5. Use of Remote Attestation Credentials in the TLS Handshake

For both the passport model and background check model the following modes of operation are allowed when used with TLS, namely:

- TLS client is the attester,

- TLS server is the attester, and

- TLS client and server mutually attest towards each other.

#### 5.1. Handshake Overview

The handshake defined here is analogous to certificate-based authentication in a regular TLS handshake. Instead of the
certificate's private key, we use the TIK identity key. This key is attested, with attestation being carried by the Certificate message. Following that, the peer being attested proves possession of the private key using the CertificateVerify message.

Depending on the use case, the protocol supports peer authentication using attestation only, or using both attestation and a regular public key certificate.

Not all platforms support this model, and a document that defines private key attestation for use in TLS Attestation as defined here, must specify:

- The format and the lifetime of TIK (e.g. an ephemeral, per session
  TIK vs. a long lived one).

- How the key is attested using a structure carried by the Certificate message.

- How proof of possession is performed.

#### 5.2. TLS Client Authenticating Using Evidence

In this use case, the TLS server (acting as a relying party)
challenges the TLS client (as the attester) to provide evidence. The
TLS server needs to provide a nonce in the EncryptedExtensions
message to the TLS client so that the attestation service can feed
the nonce into the generation of the evidence. The TLS server, when
receiving the evidence, will have to contact the verifier (which is
not shown in the diagram).

An example of this flow can be found in device onboarding where the
client initiates the communication with cloud infrastructure to get
credentials, firmware and other configuration data provisioned to the
device. For the server to consider the device genuine it needs to
present evidence.

```
       Client                                           Server

Key  ^ ClientHello
Exch | + evidence_proposal
     | + key_share*
     | + signature_algorithms*
     v                         -------->
                                                  ServerHello  ^ Key
                                                 + key_share*  | Exch
                                                               v
                                        {EncryptedExtensions}  ^  Server
                                          + evidence_proposal  |  Params
                                                      (nonce)  |
                                         {CertificateRequest}  v
                                                {Certificate}  ^
                                          {CertificateVerify}  | Auth
                                                   {Finished}  v
                               <--------  [Application Data*]
     ^ {Certificate}
Auth | {CertificateVerify}
     v {Finished}              -------->
       [Application Data]      <------->  [Application Data]

        Figure 1: TLS Client Providing Evidence to TLS Server.

```

#### 5.3. TLS Server Authenticating Using Evidence

In this use case the TLS client challenges the TLS server to present
evidence. The TLS server acts as an attester while the TLS client is
the relying party. The TLS client, when receiving the evidence, will
have to contact the verifier (which is not shown in the diagram).

An example of this flow can be found in confidential computing where
a compute workload is only submitted to the server infrastructure
once the client/user is assured that the confidential computing
platform is genuine.

```
       Client                                           Server

Key  ^ ClientHello
Exch | + evidence_request
     |   (nonce)
     | + key_share*
     | + signature_algorithms*
     v                         -------->
                                                  ServerHello  ^ Key
                                                 + key_share*  | Exch
                                                               v
                                        {EncryptedExtensions}  ^  Server
                                          + evidence_request   |  Params
                                                               |
                                         {CertificateRequest}  v
                                                {Certificate}  ^
                                          {CertificateVerify}  | Auth
                                                   {Finished}  v
                               <--------  [Application Data*]
     ^ {Certificate}
Auth | {CertificateVerify}
     v {Finished}              -------->
       [Application Data]      <------->  [Application Data]

        Figure 2: TLS Server Providing Evidence to TLS Client.
```

#### 5.4. TLS Client Authenticating Using Attestation Results

In this use case the TLS client, as the attester, provides
attestation results to the TLS server. The TLS client is the
attester and the the TLS server acts as a relying party. Prior to
delivering its Certificate message, the client must contact the
verifier (not shown in the diagram) to receive the attestation
results that it will use as credentials.

```
       Client                                           Server

Key  ^ ClientHello
Exch | + results_proposal
     | + key_share*
     | + signature_algorithms*
     v                         -------->
                                                  ServerHello  ^ Key
                                                 + key_share*  | Exch
                                                               v
                                        {EncryptedExtensions}  ^  Server
                                           + results_proposal  |  Params
                                         {CertificateRequest}  v
                                                {Certificate}  ^
                                          {CertificateVerify}  | Auth
                                                   {Finished}  v
                               <--------  [Application Data*]
     ^ {Certificate}
Auth | {CertificateVerify}
     v {Finished}              -------->
       [Application Data]      <------->  [Application Data]

        Figure 3: TLS Client Providing Results to TLS Server.
```

#### 5.5. TLS Server Authenticating Using Results

In this use case the TLS client, as the relying party, requests
attestation results from the TLS server. Prior to delivering its
Certificate message, the server must contact the verifier (not shown
in the diagram) to receive the attestation results that it will use
as credentials.

```
       Client                                           Server

Key  ^ ClientHello
Exch | + results_request
     | + key_share*
     | + signature_algorithms*
     v                         -------->
                                                  ServerHello  ^ Key
                                                 + key_share*  | Exch
                                                               v
                                        {EncryptedExtensions}  ^  Server
                                           + results_request   |  Params
                                                               |
                                         {CertificateRequest}  v
                                                {Certificate}  ^
                                          {CertificateVerify}  | Auth
                                                   {Finished}  v
                               <--------  [Application Data*]
     ^ {Certificate}
Auth | {CertificateVerify}
     v {Finished}              -------->
       [Application Data]      <------->  [Application Data]

  Figure 4: TLS Server Providing Attestation Results to TLS Client.
```

---

Will be covering the Evidence Extensions in next blog post.

---

<br />
Credits

[Using Attestation in Transport Layer Security (TLS) and Datagram Transport Layer Security (DTLS)](https://datatracker.ietf.org/doc/draft-fossati-tls-attestation/)
