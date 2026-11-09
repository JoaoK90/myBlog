+++
title = "A Future Imagined in 1965"
date = 2026-11-06
draft = false
slug = "pedro-lopes-ultimate-display"
description = "Looking at today's headsets and body interfaces through Ivan's 1965 essay."
tags = ["HCI", "Homework", "Virtual Reality", "Haptics", "Research"]
image = "meta-vr-glasses-cover.jpg"
imageAlt = "A person wearing the Meta VR Glasses announced in September 2026."
+++

Pedro Lopes is back, although this story starts long before his lab existed. In **1965**, Ivan Sutherland wrote [*The Ultimate Display*](https://worrydream.com/refs/Sutherland%20-%20The%20Ultimate%20Display.pdf), imagining computer-generated worlds that people could experience physically. Reading it today, I kept thinking about the unusual interfaces I explored in my [previous post]({{< relref "posts/hci-homework-2-pedro-lopes" >}}). Lopes's lab feels like a small part of that paper brought to life.

As someone who enjoys games, I find that connection hard to ignore. Seeing a virtual world is already familiar. Being able to feel it, move inside it and interact without reaching for a keyboard makes the possibilities much more interesting. Getting there has taken decades, and the work is still going on.

## From a ceiling-mounted display to a pair of glasses

In **1968**, Sutherland and his collaborators described a head-mounted display that changed its perspective as the user moved. It is a useful landmark in the history of VR: the image responded to the position of the person looking at it. Suddenly, looking around could become part of using a computer.

The equipment was very different from a headset today. It used two miniature cathode-ray tubes and displayed transparent wireframe drawings. One tracking mechanism was a mechanical arm hanging from the ceiling, which the paper describes as heavy and uncomfortable. Even making a simple object appear stable while someone moved required specialised hardware.

{{< homework-photo src="sutherland-mechanical-head-tracker-1968.png" alt="A person wearing Sutherland's head-mounted display, connected to a mechanical head-position sensor suspended from the ceiling." caption="Mechanical head-position sensor in use. Image: Ivan Sutherland, [A Head-Mounted Three-Dimensional Display (1968)](https://doi.org/10.1145/1476589.1476686)." >}}

By **September 2026**, Meta was announcing **Meta VR Glasses**. The company describes the glasses themselves as weighing about **100 grams**, with computing and battery handled by a separate, tethered puck. It also describes control through gaze and hand gestures.

{{< homework-photo src="meta-vr-glasses.jpg" alt="Meta VR Glasses connected by a cable to their separate computing and battery puck." caption="Meta VR Glasses. Image: [Meta](https://about.fb.com/news/2026/09/introducing-meta-vr-glasses-3d-movies-immersive-live-sports-100-grams/)." >}}

That comparison makes the progress of almost 60 years visible. But still, it's not guaranteed to be comfortable and useful over time. For a gamer, entering the scene is exciting; having a good reason to stay there matters too.

## Pedro Lopes gives the virtual world a physical response

The screen is only part of the experience. In **1965**, Sutherland also described a joystick whose resistance could be controlled by a computer. That would let someone feel simulated forces while manipulating a model. The physical response would become another way to understand what the computer was showing.

A familiar example is racing and flight simulators, with steering wheels, flight sticks and throttle levers. These controls make the movements closer to driving or flying. Some also respond physically: [force-feedback wheels reproduce road and steering sensations](https://www.logitechg.com/en-us/discover/technology/trueforce), while [force-feedback flight sticks can change their resistance](https://mozaracing.com/products/ab9-base) to simulate forces acting on the aircraft. Your hands can feel something happening before you need to read it on a screen.

{{< homework-photo src="flight-simulator-controls.jpg" alt="A flight-simulator controller with a joystick on the right and twin throttle levers on the left." caption="A flight stick and throttle setup. [Image source](https://www.windowscentral.com/best-joysticks-and-flight-sticks-microsoft-flight-simulator)." >}}

This is where Pedro Lopes fits naturally into the story. In **2015**, he, Alexandra Ion and Patrick Baudisch published **Impacto**, the boxing prototype I discussed last time. A small actuator tapped the skin while electrical muscle stimulation moved the arm. Together, those responses simulated an impact. The virtual collision had a physical consequence.

In **2024**, **ThermalGrasp**, by Alex Mazursky and colleagues including Lopes, explored temperature feedback while leaving the hands and feet usable. Someone could hold a physical prop representing a torch and feel its thermal state. [The researchers moved bulky components away from the palm and sole](https://lab.plopes.org/published/2024-VR-ThermalGrasp.pdf), addressing a practical problem: equipment for feeling a virtual object should still let you grasp something.

By **2026**, **Myo Action**, by Yudai Tanaka and colleagues including Lopes, was exploring movement assistance. It detects the onset of muscle activity through electromyography, then applies electrical muscle stimulation to assist the action. [Its experiments examine faster reactions while preserving the user's sense of control](https://lab.plopes.org/published/2026-CHI-MyoAction.pdf).

{{< homework-photo src="myo-action.jpg" alt="The Myo Action prototype sensing muscle activity during a table-tennis movement." src2="thermal-grasp.jpg" alt2="A person using ThermalGrasp while holding a physical torch prop in a virtual environment." caption="Left: My(o) Action, 2026. Right: ThermalGrasp, 2024. Images from [Lopes's lab](https://lab.plopes.org/)." >}}

These projects make the connection. The methods differ, and movement assistance goes beyond simply displaying a sensation. But each project gives the body a larger role in the interaction. I like imagining what that could add to a game.

## When the command starts before the hand can move

Sutherland's **1965** essay also considered using more of the body for input and changing a display according to where someone looked. Gaze-controlled interfaces are one route toward that idea. Brain–computer interfaces take a different route: interpreting activity inside the brain to control an external device.

In **2024**, Neuralink's first PRIME Study participant, **Noland Arbaugh**, received an implant. By May, he was using it to control a computer, including playing games. [The company's update describes his experience](https://neuralink.com/updates/prime-study-progress-update-user-experience/). For someone with paralysis, being able to move a cursor independently can make a very ordinary activity possible again.

{{< homework-photo src="neuralink-implant.png" alt="A Neuralink implant held between two fingers, with its thin electrode threads visible below." caption="Neuralink implant." >}}

By **January 2026**, Neuralink was reporting participants controlling cursors and an assistive robotic arm. According to [its two-year update](https://neuralink.com/updates/two-years-of-telepathy/), participants initially attempt hand movements and can learn to control the cursor more naturally. These are company-reported results from clinical research focused on people with paralysis. 

As an input device, Neuralink is an **implanted brain–computer interface**. Thin electrode threads record neural activity, and a trained decoder translates patterns into commands. The implant sends the recorded data wirelessly to an external device. It offers another path for an intention to reach a computer when movement cannot reliably do the job. [Neuralink explains the hardware on its technology page](https://neuralink.com/technology/).

Sutherland's most radical room, where a displayed chair would actually support someone, remains far beyond these examples. What we got right now are headsets, experimental sensations and new input methods. I can imagine future systems combining more of them, but that still leaves a lot of engineering for labs like Lopes's to do.

### A new input to voice

Neuralink's recent video, [*Speaking With The Mind*](https://www.youtube.com/watch?v=_j806JHhCRo), shows one more use of that idea. It follows **Terry**, the third participant in its voice study, who has **amyotrophic lateral sclerosis (ALS)**. The video opens with him trying to deal with an automated phone service. His speech is difficult for the system to recognise, and it asks him to try again. We have all been frustrated by a machine that does not understand us. For Terry, being understood has become a problem in everyday conversations too.

What caught our attention is how ordinary his goal is: being able to join a conversation again. His wife describes Terry as someone who loves talking, whose career involved communicating with clients and colleagues. As his speech became harder to understand, that part of his life became harder to maintain. It makes the purpose of this technology much easier to understand than a demonstration of a cursor speed.

In the training shown in the video, Terry sees sentences on a screen and attempts to say them. The team records the associated neural activity and uses those examples to train a speech decoder. It is learning a relationship between recorded signals and the speech he is attempting to produce. This is not a microphone trying harder to recognise his voice, or a machine freely reading everything he thinks. The input comes from activity associated with attempted speech.

For now, this is investigational technology being studied for people with significant disabilities. Neuralink's **VOICE study** focuses on adults with severe speech impairment and impaired upper-limb function from conditions including ALS, stroke and spinal cord injury.

I think this has a strong reason to succeed: for someone who cannot reliably use their hands or voice, another way to interact with the world could make a huge difference. There are difficult conditions for that success, though. It requires surgery, personalised training and a system that remains reliable outside a research session.

I have high hopes for where this research could go. We keep finding patterns and logic in things that once seemed almost mystical, and the brain is one of the examples I find most fascinating. There is still so much we do not understand, but even a partial understanding can become useful when we learn how to work with it. Near the end of the video, Terry tells his wife he loves her through the system. For all the engineering involved, that is the moment I would choose to show someone why it matters.

{{< homework-photo src="neuralink-terry-speaking-with-the-mind.png" alt="Screenshot from Neuralink's video showing recorded neural activity, the decoded words I love you, and Terry speaking with his wife." caption="Terry communicating with his wife. [Speaking With The Mind](https://www.youtube.com/watch?v=_j806JHhCRo)." >}}

*Written for Homework 2, Lectures 5 and 6, of my Human–Computer Interaction course at Télécom SudParis.*

*Cover image: Meta. Product information checked on 7 November 2026.*
