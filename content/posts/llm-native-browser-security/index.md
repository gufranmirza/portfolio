---
title: 'Browsers Need a Situation Layer for Security'
description: 'Every control around the browser sees where you went and what bytes moved. Identity tells you whose credentials were used, never who was driving. A human, or an AI agent?'
date: 2026-08-05
draft: false
cover: './cover.png'
slug: /blogs/semantic-gap-browser-security
tags:
  - Security
  - Browser
  - DLP
  - LLM
  - Enterprise
  - PromptInjection
  - IdentityThreat
  - ZeroTrust
---

> Disclaimer: The views expressed here are my own and do not represent those of my current or former employers.

After enough time with policy engines, DLP rules, and the incident write-ups that follow them, I keep landing on the same conclusion: The unit of risk is no longer the file and it's no longer the request. It's **the situation**.

None of them holds the situation: what the page is, who is acting, and why. That gap is where the attacks that matter now live.

> Every control around the browser sees where you went and what bytes moved. Identity tells you whose credentials were used, never who was driving. A human, or an AI agent?

---

## The situation, not the request

Imagine an analyst signed into Snowflake on a corporate laptop. The credentials are valid. The session is real. The query is `COPY INTO`, which is Snowflake's own export feature, run thousands of times a day by people doing their jobs.

Nothing here is malformed. Every field checks out.

Except the credentials were lifted by infostealer malware from an account with no multi-factor, and the table on its way out is the customer list.

Mandiant traced [every incident in the 2024 campaign](https://cloud.google.com/blog/topics/threat-intelligence/unc5537-snowflake-data-theft-extortion) to exactly that. Around 165 organizations exposed. Snowflake itself was never broken.

If you inspect the request afterward, it still does not look alarming. A valid user ran a valid query against a valid endpoint.

That's exactly the problem.

The dangerous part is not the request. It's what the request means.

A whole customer table leaving at once is a fact about the situation, not about the query.

"Bulk" appears nowhere in the bytes. Neither does "customer data." Neither does "this login was stolen last week."

The engine holds the request in full and still cannot reach the one fact that decides the case.

A lot of the security stack is still built around **request-shaped** thinking. This URL was visited. That file type was uploaded. This pattern matched.

But the attacks that matter are not request-shaped. They are **situation-shaped**.

A page loads. A prompt appears. Someone reads it and believes it, or something reads it and acts on it. A button gets clicked. A session that was already valid does something it has never done before.

Each piece is ordinary on its own. The danger only shows up when you hold them together and ask the higher-level question: what is going on here?

That is **the missing layer**.

DLP sees the bytes. It does not see the room they are leaving.

---

## The perimeter moved into meaning

For thirty years, offense went after code, and defense answered in kind. It worked, because an attack and its intent traveled together. Malware looked like malware. An exploit looked like an exploit.

Then the ground kept moving. First the binary mattered. Then the network. Then the browser became the work environment, and control moved up into identity, SaaS, extensions, and browser-native DLP.

Now I believe the center of gravity is shifting again.

The mistake is to call this an AI problem. It is more concrete than that.

The new perimeter is the moment of the action itself: what the page is, what it is asking for, who is acting, what is about to leave, and whether those things fit together.

The modern intrusion barely touches a bug. It goes after people and the trust between them.

[ClickFix](https://www.microsoft.com/en-us/security/blog/2025/08/21/think-before-you-clickfix-analyzing-the-clickfix-social-engineering-technique/) talks a user into pasting a command into PowerShell, on a legitimate site the attacker quietly took over.

[Consent phishing](https://learn.microsoft.com/en-us/defender-office-365/detect-and-remediate-illicit-consent-grants) talks a user into clicking Allow on a real screen, after which Microsoft notes that resetting the password will not help.

Golden SAML is one settings change on a domain, made from an ordinary admin console over a properly authenticated session, and it [hands the front door to a stranger](https://www.elastic.co/guide/en/security/8.19/entra-id-domain-federation-configuration-change.html).

None of these is a software flaw. Each one is a sanctioned action, aimed at a harmful end.

That is the deeper shift. Attackers are no longer stumbling into same-shape attacks. They are manufacturing them, dressing an intrusion in the clothes of ordinary work on purpose.

And they no longer have to do it by hand. An agent driving the browser will do it for them, on the user's own credentials, the moment a page can talk it into the act.

That's why I think this reaches past any one product. The tell has moved into meaning, and shape-matching cannot follow it there.

---

## Current controls still see fragments

Current products still mostly see fragments.

Pattern and entropy scanners can tell you a string looks like a secret. Useful. Identity can tell you who signed in, from what device, with what factors. Also useful. Reputation and URL filtering can tell you a domain is known bad. Still useful.

But none of those, on its own, gives you a coherent read on what is actually happening in front of the user.

Increasingly, that's the thing that matters.

You can watch teams live inside the gap.

The standard tuning advice is the same everywhere. Narrow your expressions by hand until the noise is bearable, which is a quiet admission that the method is noisy by design. Measured against the SecretBench corpus, these scanners flagged [84.5% false positives](https://arxiv.org/abs/2303.06729).

Tighten the rules and real work stops. Loosen them and the signal drowns.

There is no setting in the middle, because the missing piece is not a setting.

That isn't really a criticism of DLP. It's a statement about the vocabulary.

A rule can name a URL, a method, a file type, a signed-in user, a device, and whatever a regular expression can pull out of the bytes. That is the entire dictionary.

Every rule anyone has ever written is built from those words, and all of them describe the form of a request. Not one of them describes what the request is for.

So the administrator gets two settings for any action, block or allow, and no way to write the only rule that would actually be safe. _Allow this, unless it means something dangerous._

Block paste into ChatGPT and people move to a personal account in the same browser. Allow it and you have no idea what left.

When a valid session exports a table, or a real consent screen hands over a mailbox, knowing who signed in is necessary information.

It is no longer sufficient.

---

## What the missing layer has to do

The missing layer is the thing that holds the situation.

I think it has to do four things well.

**First, it has to read meaning rather than bytes.**

Not another matcher over the payload, but a judgment about the moment. Is this actually customer data. Is this page actually asking for more than it should.

**Second, it has to know who is acting, and on whose authority.**

A person exporting a table, an agent doing it because they were asked, and an agent doing it because a page told it to are the same request three times over. Same session, same credentials, same bytes. Only the provenance differs.

Identity does not answer this. It tells you whose credentials were used, and nothing about who was driving.

**Third, it has to stand where the situation is visible, and run where the data already is.**

A network filter sees encrypted traffic and little else. A server-side audit log sees the action after it is done, one application at a time. The browser sees the page as rendered, what is acting on it, and who is signed in, in the moment, across every site including the long tail no ruleset reaches.

If you want to weigh a situation you have to stand where the situation is. That is the browser or nowhere.

And a tool whose job is to stop data from leaving cannot work by making the data leave. Ship every page to a cloud model for a verdict and you have built the exact leak you set out to prevent, with surveillance on top. So the reading happens on the person's own machine.

That used to be impossible. The model was always too large to sit on the machine reading the page. That changed fast. [WebGPU](https://developer.chrome.com/blog/webgpu-release) opened the GPU to web code, quantization packed capable models into a couple of gigabytes, and a browser now runs one at [around forty words a second](https://arxiv.org/html/2412.15803v2), with nothing leaving the device.

**And fourth, it has to advise and never act.**

This is the constraint the whole design rests on.

Anything that can understand a page can be talked to. Anything that can be talked to can be talked into things.

Brave's researchers showed a hidden note on a page [turning an AI browser against its own user](https://brave.com/blog/comet-prompt-injection/), reading mail and sending it out. It is [the first item on OWASP's list](https://genai.owasp.org/llmrisk/llm01-prompt-injection/), and not a bug a patch removes.

So do not give it the keys. Let the model look and think. Let a plain, unpersuadable engine decide and act.

> The model's read can only ever **raise** a concern. It advises, it never authorizes. The deterministic policy holds whatever the model says, or is tricked into saying.

Hold to that and injection loses its reward.

Fool the model and the worst you get is a wrong opinion. You gained nothing, because it could never do anything.

There are really two ways to frame this. One is **content inspection with a smarter matcher**, which is where most of the industry is heading. That will catch more secrets in more documents. But it is the same vocabulary with a bigger dictionary, and it still cannot say the word "bulk."

The other is **situational judgment sitting on top of deterministic policy**.

Cheap triggers do the watching, because most of what matters announces itself plainly. A query returning a hundred thousand rows. A domain's login settings being edited. A page writing a shell command to the clipboard.

You call on the model only at those moments, and only for the judgment a rule cannot generalize.

That would let you ask far better questions than most teams can ask today.

Is this export routine for this person, or the first of its kind? Did this page turn into something else after it loaded? Was this admin change consistent with anything anybody intended?

---

## Beyond the browser

Widen the aperture and the same framework starts to matter elsewhere.

Which documents were pulled into context before the assistant drafted the memo? Which local files became cloud inputs? Which tool was invoked, and on whose behalf?

Once work becomes composable, the situation becomes the control surface.

Right now most security stacks answer those questions indirectly, if at all.

That's why this feels like a category opening, not a missing feature.

Historically, new perimeters create new companies, because the telemetry changes and the control surface changes with it. Browser-native work produced enterprise browsers. Cloud-native infrastructure produced cloud-native security companies.

They were not feature extensions of what came before. They were responses to a different environment.

**Situational security** has that same feel.

The telemetry is different from DLP. The unit of analysis is different from identity. The control problem is different from URL filtering. You are trying to understand what is happening to a person, in a moment, in context.

It is worth saying plainly what this does not solve.

It goes blind where the page does, because tools that paint themselves onto a canvas show a browser almost nothing to read.

And it sees automation, not the intent to hide it. A declared agent can be held to a policy. An agent driving Chrome over the DevTools Protocol looks exactly like a person to the page, and an agent that spawns its own headless browser was never inside yours to begin with.

And it is approximate, which is why it belongs on the gentle end of the response. Asking, warning, recording. Never silently slamming a door.

None of that dents the argument. It fences it.

If you only scan the bytes, you miss what the bytes are for. If you only check the domain, you miss the page that changed after it loaded. If you only watch identity, you miss what a valid session did with it. If you only log the API call, you miss the person who was talked into making it.

The missing layer is the situation itself.

My guess is that this will look obvious in hindsight. We'll talk about situational context in the browser the way we now talk about identity, isolation, or posture. A distinct layer that had to emerge once the environment changed.

But right now the space is still open enough that the categories blur together. One company matches strings. Another checks domains. Another governs identity. Another isolates the session. All useful. None of them holds the situation.

That's the opening.

The situation is right there, in the browser, fully visible. Security needs to start reading it.
