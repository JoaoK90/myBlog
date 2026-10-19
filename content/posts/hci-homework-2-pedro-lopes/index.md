+++
title = "Can a Virtual Punch Feel Real?"
date = 2026-10-09
draft = false
slug = "pedro-lopes-virtual-punch"
description = "Pedro Lopes's lab makes the kind of inventions that bring out the gamer in me."
tags = ["HCI", "Homework", "Research", "Virtual Reality", "Haptics"]
image = "impacto-cover.jpg"
imageAlt = "A person wearing an Oculus headset and the Impacto prototype on their arm during a virtual boxing demonstration."
+++

In a game, I can swing a sword, block a punch, or pick up something much heavier than myself. The game can show the collision and play the right sound. Giving my body a convincing response is another problem. What should I actually feel when my hand reaches a virtual object?

As a fan of games and a student in Virtual & Augmented Reality, this is the part that interests me most. Better graphics are exciting, but I also want to know how we could physically interact with those worlds.

For this assignment, I chose **Pedro Lopes**, a researcher in **Human–Computer Interaction (HCI)**: the study of how people interact with technology. His work includes devices that stimulate muscles, create sensations of temperature, and help people perform physical actions. It is the kind of research that makes me want to try the demonstration before I have finished reading the paper.

## The kind of lab I would like to visit

Lopes is an Associate Professor of Computer Science at the University of Chicago, where he leads the **Human Computer Integration Lab**. His research brings together HCI, wearable devices, haptics, and AR/VR. **Haptics** means feedback through touch and physical sensations, including vibration, pressure, or forces. [His university profile introduces these research interests](https://cs.uchicago.edu/people/pedro-lopes/).

The lab explores how interfaces can work directly with our bodies. That includes **electrical muscle stimulation (EMS)**, which uses electrodes on the skin to make muscles contract. Instead of relying only on an external motor to move a limb, these prototypes use the person's muscles as part of the system.

Some inventions look strange at first. I might not buy them, and I cannot immediately imagine using all of them every day. But a laboratory is a good place to ask those questions and build a first version. Looking through [the group's projects](https://lab.plopes.org/), I imagine it must be satisfying to turn so many unusual ideas into things that actually work.

His work already has a substantial research audience. These were the numbers on his [Google Scholar profile](https://scholar.google.com/citations?user=dhPGPoIAAAAJ&hl=en) when I checked it on **9 October 2026**:

| Metric | All time | Since 2021 |
| --- | ---: | ---: |
| Citations | 6,792 | 5,348 |
| h-index | 43 | 41 |
| i10-index | 88 | 80 |

An h-index of 43 means that at least 43 of his publications have received at least 43 citations each. The i10-index counts publications with at least ten citations. These numbers show how much other researchers reference his work; they do not tell us whether a prototype is ready to become a product.

## What the lab is working on now

One recent project, **Generative Muscle Stimulation**, was presented at CHI 2026, a conference on human factors in computing. Lopes is a coauthor with Yun Ho, Romain Nith, and other collaborators. The system combines computer vision and AI with muscle stimulation to provide physical assistance based on the person's situation.

For example, someone can ask for help opening a window. The system considers the object, the person's body position, and their request, then generates movement instructions. Those instructions are constrained by knowledge about muscle stimulation and joint limits before being translated into physical assistance. [The project page explains the system and its evaluation](https://embodied-ai.tech/).

{{< homework-photo src="generative-muscle-stimulation.png" alt="Four panels showing the Generative Muscle Stimulation system assisting a person in turning a handle and tilting a window open." caption="Window-opening demonstration: Ho, Nith et al., [Generative Muscle Stimulation](https://embodied-ai.tech/), [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)." >}}

I find this particularly interesting because most AI tools I encounter give their response through text or images. Here, assistance can take the form of a movement. That also makes the question of control much more concrete: how does the person understand the instruction, stop it, or correct it when the system gets something wrong?

Another 2026 project, **My(o) Action**, investigates faster reactions while keeping the person in control. It detects the onset of muscle activity using **electromyography (EMG)** and then applies muscle stimulation to assist the action. The movement is initiated by the user's own muscle signal. In their experiments, the researchers found faster reactions while preserving participants' sense of agency—the feeling that they were choosing their actions. [The paper describes the approach and its limits](https://lab.plopes.org/published/2026-CHI-MyoAction.pdf).

The group's earlier **ThermalGrasp** project, from 2024, tackles another detail of immersion: feeling temperature while still being able to hold objects or walk. Its hardware moves the bulky heating and cooling components away from the palm and sole. A real prop can then represent a virtual object, such as a torch, with thermal feedback. [ThermalGrasp's paper explains the design](https://lab.plopes.org/published/2024-VR-ThermalGrasp.pdf).

{{< homework-photo src="myo-action.jpg" alt="The My(o) Action prototype sensing muscle activity and assisting a table-tennis movement." src2="thermal-grasp.jpg" alt2="A person using ThermalGrasp with a physical torch prop in a virtual environment." caption="Left: My(o) Action, 2026. Right: ThermalGrasp, 2024. Images from [Lopes's lab](https://lab.plopes.org/)." >}}

These projects are developed by teams. What connects them is a question I like: what could an interface communicate through the body that a screen alone cannot?

## Impacto: feeling the collision

The project I wanted to explore more closely is older: **Impacto**, published at UIST in 2015 by Pedro Lopes, Alexandra Ion, and Patrick Baudisch, while they were at the Hasso Plattner Institute. Its goal was to simulate hitting and being hit in virtual reality.

In its boxing demonstration, a virtual opponent throws a punch. Rather than building a large machine to reproduce the whole impact, Impacto divides the sensation into two parts:

- A **solenoid**, an electrically driven actuator, taps the skin to create the local feeling of contact.
- **Muscle stimulation** contracts the biceps, moving the arm backwards to simulate its response to the hit.

The tap tells the user where contact happened. The movement adds a physical response. Combining them lets a relatively small wearable device create an impact sensation. [The original paper explains this combination](https://doi.org/10.1145/2807442.2807443).

{{< homework-photo src="impacto-components.png" alt="Impacto's opened bracelet showing the microcontroller, batteries, solenoid, muscle stimulator, and electrodes." caption="Inside Impacto. Figure 4 from Lopes, Ion and Baudisch's [2015 paper](https://doi.org/10.1145/2807442.2807443)." >}}

The authors also demonstrated football and baseball interactions. For baseball, the actuator taps a physical prop while muscle stimulation moves the wrist, producing feedback when the virtual ball meets the bat. This is a detail I like: the object in the user's hand does not have to reproduce every property of the object shown in VR.

There is also a connection to my first Unity project. The paper's simulators were built in Unity, where collisions triggered messages to the wearable device. I have only used collisions for much simpler things so far, but I can understand that starting point: an event in the scene happens, and another system responds. Here, the response reaches the user's arm.

The study analysed **12 participants**, who rated combinations of tactile and muscle stimulation while experiencing a simplified boxing simulation. The combined feedback was rated as more realistic than either technique alone. That supports the main idea, although it is a small, controlled study.

The paper also discusses practical limitations: electrodes need correct placement and calibration, the system has latency, and simulating more impact locations requires more units. I would be excited to try it. I would also want to know how comfortable the setup remains after a longer session.

## Would I actually buy something like this?

The broader idea of wearable feedback has already reached consumer products. **bHaptics' TactSuit Pro**, for example, uses **32 vibration motors** to deliver feedback around the torso. Its official US store listed it at **$565** when I checked on 9 October 2026. [The product page lists its specifications and supported platforms](https://www.bhaptics.com/shop/buy-tactsuit/tactsuit-pro/).

{{< homework-photo src="tactsuit-pro.png" alt="The bHaptics TactSuit Pro wearable haptic vest." caption="TactSuit Pro. Product image: [bHaptics](https://www.bhaptics.com/shop/buy-tactsuit/tactsuit-pro/)." >}}

It shares the ambition of making virtual events physically noticeable, but uses vibration rather than Impacto's combination of a tap and muscle contraction. It is an example of commercial haptics, rather than evidence that Impacto itself became a retail product.

Even as someone who likes games, I would think carefully before spending that much on another accessory. I use a computer for studying, working, communicating, and playing. A specialised wearable needs compatible content and a reason for me to keep putting it on. The demonstration can be impressive while the everyday value remains harder to justify.

Professional training offers another possibility. Rubens Barrichello is an example I already knew: the former Formula One driver uses a racing simulator at home, and SimPad publishes his account of practising with his sons, Dudu and Fefo. [The manufacturer's page includes that testimonial](https://www.simpad.com.br/).

{{< homework-photo src="rubens-simulator.jpg" alt="Acelerados video thumbnail showing Rubens Barrichello seated at his racing simulator with a steering wheel and screens." caption="Rubinho's simulator, shown in this [Acelerados video](https://www.youtube.com/watch?v=s_vlOjfqqog). Image: Acelerados." >}}

That makes the cost easier for me to understand: equipment can have value beyond a few entertaining sessions when it supports repeated practice. I can imagine richer physical feedback contributing to training too, provided it teaches useful responses. Showing that someone feels immersed would still be different from showing that they perform better afterwards.

## Some ideas need time

The recent boom in AI makes me think about how long research can take to reach everyday life. A well-known paper by Rumelhart, Hinton, and Williams on learning through backpropagation was published in **1986**. Today's attention to AI does not mean its underlying ideas appeared yesterday. [Hinton's publication list includes that early work](https://www.cs.toronto.edu/~hinton/backprop.html).

I see these unusual interfaces with that possibility in mind. Some may remain experiments. Others might become useful after changes in hardware, cost, or the activities we want to support. Lopes already has a recognised research career, and I am curious to see which ideas his group and other researchers will develop further.

Theme parks are one place where I can imagine trying expensive, specialised interfaces without buying them. I remember Disney's **Spider-Man W.E.B. Adventure**, where I made Spider-Man's web-shooting gesture to catch escaping Spider-Bots. It was so responsive that I really felt as if I were shooting webs. [Disney describes the attraction's gesture recognition](https://news.disneylandparis.com/en/avengers-campus/).

That experience used a different mechanism from Impacto, but it made the appeal of bodily interaction very clear to me. I will return to theme parks and the idea of convincing virtual worlds in the next post, when I discuss Ivan Sutherland's *The Ultimate Display*.

*Written for Homework 2, Lecture 4, of my Human–Computer Interaction course at Télécom SudParis.*

*Cover: Impacto demonstration, from [Pedro Lopes's project collection](https://lab.plopes.org/). Impacto paper: Pedro Lopes, Alexandra Ion and Patrick Baudisch (2015), “Impacto: Simulating Physical Impact by Combining Tactile Stimulation with Electrical Muscle Stimulation,” UIST. [DOI: 10.1145/2807442.2807443](https://doi.org/10.1145/2807442.2807443).*
