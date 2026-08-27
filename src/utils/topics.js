/**
 * Post topics.
 *
 * The handoff groups the blog into three topics and filters the listing by
 * them. The design bundle assigns a topic to each of the seventeen existing
 * posts, so that assignment is reproduced literally here rather than guessed.
 *
 * Tags alone cannot derive it: `Arch` sits on both the confidential-computing
 * architecture posts and on Linux Secure Boot / Zero Trust, which the design
 * files as Security. The map wins; the tag heuristic only covers posts written
 * after this handoff.
 */
export const TOPICS = {
  CONFIDENTIAL: 'Confidential Computing',
  SECURITY: 'Security',
  GO: 'Go & APIs',
};

// slug (without the /blogs/ prefix) -> topic, per the design bundle
const TOPIC_BY_SLUG = {
  'no-rule-was-broken': TOPICS.SECURITY,
  'linux-secure-boot': TOPICS.SECURITY,
  'zero-trust-and-confidential-computing': TOPICS.SECURITY,

  'attested-tls': TOPICS.CONFIDENTIAL,
  'trusted-platform-module-keys-management': TOPICS.CONFIDENTIAL,
  'trusted-platform-module-and-attestation': TOPICS.CONFIDENTIAL,
  'confidential-containers-arch': TOPICS.CONFIDENTIAL,
  'rats-remote-attestation-architecture': TOPICS.CONFIDENTIAL,
  'confidential-virtual-machine-architecture-cvm-1': TOPICS.CONFIDENTIAL,
  'amd-secure-encrypted-virtualization': TOPICS.CONFIDENTIAL,
  'arm-confidential-compute-architecture': TOPICS.CONFIDENTIAL,
  'confidential-computing-on-intel': TOPICS.CONFIDENTIAL,

  'managing-microservice-schema-and-interfaces-in-distributed-environments-with-protocol-buffers':
    TOPICS.GO,
  'anatomy-of-goroutines-in-go-concurrency-in-go': TOPICS.GO,
  'a-comprehensive-guide-to-learn-graphql-its-core-concepts-with-examples': TOPICS.GO,
  'jwt-authentication-in-golang-with-echo': TOPICS.GO,
  'build-simple-api-with-grpc-protobuf-and-golang': TOPICS.GO,
};

const GO_TAGS = ['Golang', 'Go-routines', 'gRPC', 'protobuf', 'GraphQL', 'JWT', 'APIs', 'Threads'];
const CONFIDENTIAL_TAGS = [
  'ConfidentialComputing',
  'ConfidentialVM',
  'ConfidentialContainers',
  'CoCo',
  'TEE',
  'TPM',
  'Attestation',
  'RATS',
  'aTLS',
  'TDX/SGX',
  'SEV',
  'HSM',
  'ROT',
];

const slugKey = slug =>
  String(slug || '')
    .replace(/^\/?blogs\//, '')
    .replace(/\/$/, '');

/** Topic for a post. Falls back to a tag heuristic for posts added later. */
export const topicFor = ({ slug, tags = [] }) => {
  const mapped = TOPIC_BY_SLUG[slugKey(slug)];
  if (mapped) {
    return mapped;
  }
  const list = tags || [];
  if (list.some(t => GO_TAGS.includes(t))) {
    return TOPICS.GO;
  }
  if (list.some(t => CONFIDENTIAL_TAGS.includes(t))) {
    return TOPICS.CONFIDENTIAL;
  }
  return TOPICS.SECURITY;
};

/** Filter chips, in the order the handoff shows them. */
export const TOPIC_FILTERS = ['All', TOPICS.CONFIDENTIAL, TOPICS.SECURITY, TOPICS.GO];
