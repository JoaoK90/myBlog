# Writing posts for Joao's Files

Write in English, in João's voice: an engineering student learning by building, testing, and noticing things. Use his notes as the source for personal experiences. Don't invent conversations, emotions, results, or steps he hasn't completed.

## Start by welcoming someone unfamiliar with the topic

Every post begins with a short introduction before the first heading. Usually 80–160 words is enough; a longer opening is fine when it earns its space, as in “Why Is This So Annoying?”.

1. Start with a concrete observation, question, or familiar situation.
2. Explain the topic in plain English and why it matters.
3. Connect it to what João noticed, built, or tried.
4. Give the reader a reason to continue, without listing the whole article.

A connection outside class can help, but it should be relevant rather than forced. Explain specialised terms at their first appearance. Someone without HCI, Hugo, or Unity experience should understand the opening.

Natural writing comes from João's own wording and specific details about what he did. Preserve humour and reactions he supplied, but don't invent jokes, witty asides, emotions, or polished closing lines to make a post feel human. Avoid dramatic narration and generic lessons. Read the text aloud: would João actually say it?

## Shape the rest around the subject

For an analysis: situation → observation → concept → effect on the user → possible improvement. Use descriptive headings instead of “Exercise 1”. Keep the course and assignment reference in a short note at the end.

For a lab: explain what was being built, then group steps by what they taught. Show useful screenshots, describe what changed, and explain problems or decisions that matter. Don't narrate every click. Clearly separate completed work from what is still missing.

Use an interesting title and a specific description. Keep captions short and factual. The text should still make sense without the screenshots.

## Length and accuracy

For an analysis like the first Homework, aim for about 6–9 minutes of reading. A short lab can be shorter; don't pad it to match. Check Hugo's actual reading estimate after building.

Check claims about health, laws, court cases, product policies, and statistics against reliable sources. Link the source beside the claim. Distinguish João's criticism from an established fact. A design can be inconvenient without necessarily being deceptive.

## Images

Keep each post in a folder with `index.md` and its images. Set `image` in the front matter to the cover filename. Prefer a relevant photo, screenshot, or illustration; a new custom artwork is optional.

For body images, use the existing `homework-photo` shortcode. It keeps photos small, adds rounded corners and a caption, and lets readers click to open the full image.

```text
{{< homework-photo src="example.png" alt="What the image shows." caption="A short, factual caption." >}}
```

For a pair, add `src2="second.png"` and `alt2="What the second image shows."` to the same shortcode. Credit other people's work when known. Don't invent an artist's name.

## Creating the next post

From the blog folder:

```powershell
hugo new content posts/my-next-post/index.md
```

The posts archetype adds the front matter and private writing reminders. Fill in the title, description, tags, cover filename, and introduction; remove any unfinished placeholder text. Preview with `hugo server -D`. Set `draft = false` when the post is ready.

[Hugo's archetype documentation](https://gohugo.io/content-management/archetypes/) explains how these templates work.

## João's own edits to Homework 1 — 9 October 2026

Use the author's edited version of “Why Is This So Annoying?” as a voice reference. His changes show these preferences:

- Keep conversational humour and asides, including self-deprecating comments. Don't turn them into polished slogans or remove them just because they are informal.
- Anchor explanations in specific experiences: seeing the timetable while still in Brazil, the joke about “déjeuner”, new residents thinking their cards were broken, the storage prompt and hours spent moving files.
- Keep first-person admissions and frustration, such as “I did fall for it” and having to “fight against the algorithm”. Don't soften his viewpoint without a factual reason.
- Use a short description with curiosity or irony rather than a list of everything in the post.
- Omit captions that merely repeat an obvious image, and avoid explaining the same photo again in the body.
- Don't append a generic redesign paragraph to every example. Include proposals when the author has a concrete idea, such as alternating gray columns or distinct reader feedback.
- Preserve the introduction, concept explanations, and six-example structure he chose to keep. Personal writing can still explain the subject clearly to an outsider.
- When asked for English correction only, fix clear grammar, spelling, agreement, and broken constructions. Keep deliberate informal wording, jokes, opinions, punctuation used for voice, and valid British or American spellings. Explain any sentence that needed substantial grammatical repair.

These preferences do not remove the need to check factual claims when researching or drafting new posts.

## João's edits to the Unity lab — 9 October 2026

Use his rewritten opening and material section as the reference for lab posts. He prefers a direct account of what he built and how it works, with brief explanations where needed.

- Preserve his title, description, and edited paragraphs; repair their English without replacing his wording with a different voice.
- Write straightforward headings such as “Testing the lighting” and “Adding the score and pickup sound”.
- Describe concrete actions and results. Don't add a lesson, reflection, or clever comment after every step.
- Keep theoretical introductions short. His shorter Unity introduction takes precedence over the usual introduction length above.
- Human writing does not require jokes. Keep the tone simple and personal, without manufacturing humour or enthusiasm.
