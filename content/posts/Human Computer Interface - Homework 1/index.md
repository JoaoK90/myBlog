
+++
title = "HCI — Homework 1"
date = 2026-09-23
draft = false
slug = "hci-homework-1"
description = "Everyday examples of affordances, Gestalt principles, and dark patterns."
tags = ["HCI", "Homework", "Everyday life"]
image = "good_design.jpg"
+++

For this assignment, I looked at things I use at home, on campus, and online. Here are my examples and what I would change.

## Exercise 1: Affordances

### Bad design: my toothbrush charger

{{< homework-photo src="bad_design1.jpg" alt="Electric toothbrush on its charging base." src2="bad_design2.jpg" alt2="Close-up of the recessed charging base." caption="The toothbrush and its bowl-shaped charging base." >}}

The shape of this base makes it obvious where to put the toothbrush. Unfortunately, it also collects the water and toothpaste that run down the handle after brushing. There is nowhere for them to drain.

After about two weeks, I noticed a blue-green buildup. I don't know what it was, but having to scrub toothpaste residue out of a charger is annoying. Now I only use the base when the battery runs out.

The base supports the brush and suggests leaving it there, but it doesn't handle a wet toothbrush well. **I would redesign it** with some holes to let the water drains out.

### Good design: attached bottle caps

{{< homework-photo src="good_design.jpg" alt="French bottle with an attached cap on the left, Bosnian bottle with a loose cap on the right." caption="Left: bought in France. Right: bought in Bosnia." >}}

In Brazil, I was used to caps that came off completely. You could lose them, mix them up with other caps on the table, or need your other hand just to hold one while drinking.

I really like the attached caps I've been using in France. In Bosnia, I opened a bottle and let go of the cap out of habit. I just watched it fall, confused for a second.

The cap still affords gripping and twisting; the tether adds a physical constraint that keeps it attached. It's a small change, but it saves me from having to find somewhere to put the cap.

## Exercise 2: Gestalt principles

### The TSP timetable

{{< homework-photo src="gestalt1.png" alt="University timetable with touching coloured blocks and no visible lunch gap." caption="My timetable on SI Étudiants." >}}

At first glance, this looks like classes from 10:00 to 18:00 without a break. We actually have lunch from 13:15 to 14:30, but the timetable doesn't show that gap clearly.

This relates to **proximity and similarity**: adjacent blocks with the same colour look like one continuous session. The layout groups together periods that should look separate.

Finding the classroom is also unnecessarily difficult. I have to hover over the small orange icon and scroll through the details.

**My fix:** separate the sessions using their actual times, leave a visible lunch gap, and put the room number directly below the course name.

### The residence card readers

{{< homework-photo src="gestalt2.jpg" alt="Residence entrance with a turnstile on the right and, on the left, an intercom above the TSP and Maisel card readers." caption="Turnstile on the right. Left, top to bottom: intercom, TSP reader, Maisel reader." >}}

We have two cards here: the TSP student card and the Maisel residence card. At the entrance, there are two readers with no labels saying which card to use. New residents have to try them and eventually memorise the reader shapes.

This is mainly a missing-label and mapping problem. **Gestalt similarity** could help: a shared symbol on each card and its reader would make the pairing easier to recognise.

**My fix:** label the middle device “TSP” and the bottom one “Maisel,” with matching card illustrations. Colour could help too, as long as it isn't the only cue.

## Exercise 3: Dark patterns

### Google Drive: pressure to buy storage

{{< homework-photo src="dark_design1.png" alt="Google email warning that Gmail will stop working in five days." caption="The warning I received after my student offer ended." >}}

I had a one-year Google student offer with extra storage. I got used to it and stored important files there. When it ended, I was over the new limit: I couldn't edit some documents, and Google warned that I would stop receiving emails on my main account.

The suggested solution was to buy storage. I ended up moving files elsewhere and downloading others to free up space.

What bothers me is the pressure to pay once moving everything becomes a chore. The warning does mention freeing space, and the restrictions are [documented by Google](https://support.google.com/mail/answer/9312312?hl=en). So the limit itself isn't automatically a dark pattern; my criticism is how the urgency and emphasis on buying affect the choice.

**My fix:** show the future limit well before the offer expires, then give equally clear options to clean up, download files, or upgrade.

### Instagram: infinite scroll

{{< homework-photo src="dark_design2.jpg" alt="Illustration of an Instagram feed unrolling from a phone." caption="Artwork: Ben Fearnley™, [@benfearnley.studio](https://www.instagram.com/benfearnley.studio/)." >}}

With Instagram, there is always another video one swipe away. There is no end to the feed, so nothing really prompts you to stop. It's easy to spend much longer there than you planned.

I see this as **attention capture**: removing stopping points benefits the platform by keeping people watching, even when they wanted a short break.

This was also part of the [2023 case brought against Meta by US state attorneys general](https://ag.ny.gov/press-release/2023/attorney-general-james-and-multistate-coalition-sue-meta-harming-youth), which alleged harm to young users. An [August 2026 announcement](https://ag.ny.gov/press-release/2026/attorney-general-james-secures-171-billion-and-groundbreaking-reforms-meta) describes a settlement of up to $17.1 billion, subject to court approval and conditions. The case covers several practices, not just scrolling.

**My fix:** show a limited set of posts with a “Load more” button, and let users choose a session limit that actually pauses the feed. Continuing should be a conscious choice.
