---
title: Zero Trust Architecture and Confidential Computing
description: How on-chip security features (TEEs) that can significantly boost your Zero Trust solution architecture.
date: 2023-10-29
draft: false
cover: './cover.jpeg'
slug: /blogs/zero-trust-and-confidential-computing
tags:
  - Arch
  - ZeroTrust
  - Encryption
  - Cryptography
  - TEE
---

Historically, safeguarding corporate assets relied on perimeter-based security measures, with a clear division between trusted users and data on the inside and potential threats on the outside. However, as the world evolved, remote work became the norm, and individuals began connecting to their corporate networks from various locations, including their homes or while traveling.

Additionally, the rise of cloud computing enabled data and workloads to migrate outside the traditional data center. As a result, the conventional security perimeter became obsolete. In response to this shifting landscape, a new approach was needed, giving rise to the concept of Zero Trust.

## What Exactly is Zero Trust?

The most authoritative source on the subject is [NIST Special Publication 800-207](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-207.pdf), titled "Zero Trust Architecture." According to this publication, zero trust revolves around the idea of managing identity and access to resources within an enterprise network.

The fundamental principle is that no entity should be automatically trusted solely because it belongs to a particular network or is located in a specific physical location. In essence, zero trust involves assuming that a breach of the enterprise network has already occurred. In line with this perspective, NIST identifies encrypting all network traffic and implementing session-based access control for network resources as key pillars of the "basic tenets" of zero trust.

This stands in contrast to traditional security models where everything within the enterprise network is inherently trusted, while everything outside is not. In such a traditional model, once attackers breach the network, such as bypassing the firewall, they gain access to all resources on the enterprise network.

## How Does Confidential Computing Enhance Zero Trust?

Confidential computing enhances Zero Trust by providing a secure execution environment for sensitive workloads, even in untrusted environments. Zero Trust calls for constant verification of all resource access but ensuring that the underlying cloud infrastructure is reliable and secure might be challenging.

The hardware-based security mechanism offered by confidential computing solves this problem by enabling the processing and storage of sensitive data in a safe enclave isolated from the host system and other potentially vulnerable components.

<br />

> Confidential Computing is the protection of data in use by performing computation in a hardware-based, attested Trusted Execution Environment.
>
> Confidential Computing Consortium, https://confidentialcomputing.io/about/

<br />

Confidential Computing, as thus described, can provide two properties which are excellent starting points for components wishing to exercise zero/explicit trust, which we’ll examine individually:

- Isolation from the host machine/system, particularly in terms of confidentiality of data at runtime
- Cryptographically verifiable identity.

## Runtime Encryption

One of the primary trust considerations for any executing component is the relationship it establishes with the system providing its execution capabilities, typically the host machine. Even when a component claims to have "zero trust," it must still trust the host machine to maintain the confidentiality of its code and data. This reliance on the host machine and its administrators, including potential compromises, does introduce a substantial trust relationship. This situation seems incompatible with the concept of a "zero trust" architecture, but there are potential solutions.

Confidential Computing offers a solution by enabling isolation from the host machine responsible for execution. While the component still needs to trust the CPU and firmware facilitating the execution context (because code must run, after all), this approach significantly reduces the number of trust relationships required. It also allows for cryptographic assurances to underpin this relationship, as outlined in the "Attestation" section.

The assurance that a component is isolated from other components provides several benefits. It allows the component to have confidence in its operation, knowing it can function independently. It also enables other components to establish trust relationships with it, with the assurance that it acts autonomously and is not under the influence of a malicious actor.

## Cryptographic Attestation

As mentioned earlier, zero trust emphasizes the importance of verifying the identities of entities on a network and implementing access control based on sessions and resources. Without hardware-based remote attestation, access control primarily relies on cryptographic keys held by these entities, such as applications, services, or end-user devices, and unverifiable reports regarding aspects like patch levels. In this setup, if, for instance, the private key of a service gets compromised, an attacker can effectively impersonate that service.

This is where confidential computing-style remote attestation makes a significant difference. It enables software to prove their precise identity and integrity to a verifier, which plays a crucial role in access control. Specifically, the verifier gains clear insights into the cryptographic hash of the software, the confidential computing features it utilizes (such as runtime encryption), and its public key. To forge this information, an attacker would need to compromise the remote attestation protocol of the confidential computing technology in use, such as Intel SGX or AMD SEV. While not impossible, this is a formidable challenge, beyond the capabilities of most attackers.

In light of this, it's reasonable to assert that confidential computing-style remote attestation brings a substantial enhancement to the verification aspect of zero trust. It shifts us from predominantly relying on certificate-based identities (which are susceptible to theft) to dynamically attested, semantics-based identities, offering a more robust foundation for trust and security.

## Forging a "Zero Trust" Connection

These attributes enable the formation of zero (or "explicit") trust connections with components operating within a Confidential Computing environment. This approach is a departure from traditional computing methods where any component's trust relationship is inherently tied to the environment in which it operates, typically the system providing its execution environment. Such a relationship is far from being a zero trust model and is often far from explicit.

In a Confidential Computing environment, components can establish only a limited set of explicitly defined trust relationships, typically including the attestation service, the CPU/firmware provider, and the provider of the executing code. This results in a significantly more well-defined trust framework. While it may not achieve a perfect "zero trust" state, it at least moves closer to the concept of "minimal trust."

<br/>

---

<br />
Related Posts

- [Rethinking Zero Trust with Intel Technology](https://www.intel.com/content/www/us/en/cloud-computing/zero-trust-tech-guide.html)
- [The relationship between zero trust and confidential computing](https://www.edgeless.systems/blog/the-relationship-between-zero-trust-and-confidential-computing/)
- [How does confidential computing enhance Zero Trust?](https://www.fortanix.com/faq/zero-trust-architecture/how-does-confidential-computing-enhance-zero-trust)
