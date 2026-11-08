+++
title = "I'd Rather Look at the City"
date = 2026-11-08
draft = false
slug = "ar-navigation-paper-prototype"
description = "Getting lost with Google Maps gave me an idea. I tried the first version with paper arrows in my residence."
tags = ["HCI", "Homework", "Augmented Reality", "Design", "Prototyping"]
image = "paper-path-maisel.jpeg"
imageAlt = "My friend at the start of a paper trail in the Maisel residence, with arrows leading around the corridor to two footprints."
+++

When I travel around Europe with my friends, Google Maps is almost always open on someone's phone. We want to enjoy the view, but we also need to know where we are going. Sometimes we try to do both and end up walking around the same block without noticing.

At a confusing junction, we stop and everyone looks between the map and the streets, trying to work out which direction it means. It gets worse when the route involves stairs or different levels. A direction on a flat map does not always make the next move obvious when you are standing there.

We all wear glasses, so I started imagining a route drawn directly into our view through them. That is the idea of **augmented reality (AR)**: adding digital information to the real environment we see. Could the directions appear on the actual street, so we could leave the phone in a pocket?

## Three things I would like help with

The navigation problem was my starting point. I also wanted to consider other ways AR could help during a trip. These are three concepts, each extending a different ability: finding our way, understanding a language and recognising how a place has changed.

### Following a path through the city

My first idea is a visible trail along the route, with arrows at turns and a clear indication of the destination. Instead of matching a line on a map to the streets around me, I would follow a line attached to those streets. At a staircase, the indication would need to show which level to take, rather than just point in its general direction.

I would want this to stay simple. The aim is to enjoy the place I am visiting, so I would not want a dashboard of information covering the buildings. A short cue at the right moment could be enough. The drawing below shows the concept; the version I tested later was much simpler.

{{< figure src="concept-navigation.svg" alt="Concept drawing of a dashed AR trail turning left towards a doorway, with direction and arrival cues." caption="The route concept: directions connected to the place where the decision happens." class="homework-photo" >}}

### Understanding a sign without taking out my phone

The second idea is an on-demand translation over a sign. Looking at a station exit or a notice, I could activate the translation and see it beside the original text, still attached to the thing it describes. This would extend my ability to understand the language around me.

I would keep the original visible and make the translation easy to hide. Translating every word in the street at once could become overwhelming. Another important detail would be indicating uncertainty: a translation that looks definitive could be misleading when the wording is ambiguous.

{{< figure src="concept-translation.svg" alt="Concept drawing of a station sign reading SORTIE with an EXIT translation beneath it and a control to hide the translation." caption="Translation when needed, with the original sign still visible." class="homework-photo" >}}

### Comparing a place with its past

The third idea connects more to my interest in photography and travelling. I would like to compare the place in front of me with an old photograph or a documented reconstruction, aligned with the current view. A transparency control would let me look between the two and notice what has changed.

This could help when looking at a ruin or a square whose earlier appearance is difficult to imagine. The source and date would need to be available, and a reconstruction should be clearly labelled. I would want to know which details were recorded and which were inferred. The drawing is an illustration of the interaction, not a reconstruction of an actual site.

{{< figure src="concept-history.svg" alt="Concept drawing of a building split between a past overlay and a present view, with controls for comparison and transparency." caption="A comparison layer for exploring changes over time." class="homework-photo" >}}

## Making the route with paper

I developed the first idea into a **low-fidelity prototype**: a simple physical version that someone could try before I built any AR software. I used paper strips and arrows on the floor to form a route, ending with two paper footprints. The strips connected the route, the arrows indicated direction, and the footprints marked where to stop.

I set it up inside the Maisel residence building where I live. The route went around a corner, giving my friend something to follow beyond a single straight line. This was manageable to build with paper and let me focus on whether the instructions made sense.

The paper represented the visual layer that the glasses would eventually display. In this version, everyone could see it, and it stayed fixed on the floor. There was no positioning system, automatic route calculation or graphics inside the glasses. I was testing the meaning and placement of the cues.

The question was quite small: would another person understand the route and know when they had reached its end?

## Letting my friend follow it

I asked a friend to try it in the building. I did not explain the route beforehand. He noticed the markings, started following them and stopped at the footprints. The video below records the interaction.

<figure class="homework-photo">
  <video controls playsinline preload="metadata" poster="paper-path-video-poster.jpg" width="478" height="850" aria-label="My friend following the paper arrows through the Maisel residence corridor" style="display:block;width:auto;max-width:100%;height:auto;max-height:min(480px,65vh);margin:0 auto;border-radius:12px;background:#0b1020;">
    <source src="following-the-paper-path.mp4" type="video/mp4">
    Your browser does not support embedded video. <a href="following-the-paper-path.mp4">Open the video of the prototype test.</a>
  </video>
  <figcaption>Following the paper route at Maisel. The glasses do not display anything in this prototype.</figcaption>
</figure>

His feedback was that the instructions were easy to follow and that the route had a good density of points on the floor. For this short indoor route, the spacing gave him enough information to continue following it. That was useful feedback about a decision that could otherwise have been quite arbitrary: how many marks to put down.

The ending was less clear. He stopped at the footprints, but then stayed there without interacting with the destination. The marks communicated a stopping position, but did not explain what should happen next.

My interpretation is that I had made the route clearer than the arrival. For the next version, I would add a message such as **"You have arrived"** and highlight the actual destination: the red door near the mailbox sign. If the person needs to do something there, the interface should say what that is. Otherwise, they may keep waiting for another instruction.

### What this first test leaves open

There is also a tension with my original goal. A trail on the floor can still make someone look down. Following the paper successfully does not tell me whether the glasses would help us spend more time looking at the city. I would want to try fewer cues between decisions and a turn indication closer to the person's normal line of sight.

This was one person following a short route inside a building. We did not test outdoor distances, crowds, stairs or changes of level, even though those situations helped inspire the idea. I would need further tests to understand how the cues should behave there. For now, I have feedback that the route was understandable in this setting, and a concrete change to make at the destination.

The two footprints were enough to make him stop. My next version needs to make it equally clear why he has stopped and what he can do next.

*Written for Homework 3, Lectures 7, 8 and 9, of my Human–Computer Interaction course at Télécom SudParis. The three drawings show proposed AR interfaces; only the navigation concept was prototyped and tested.*
