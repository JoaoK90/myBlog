+++
title = "Using dice to explain production bottlenecks"
date = 2026-10-18
draft = false
slug = "toc-game-simulator"
description = "A post about the dice game I built to make production bottlenecks easier to see and learn."
tags = ["Simulation", "AnyLogic", "Theory of Constraints"]
image = "gifcapa.gif"
imageAlt = "Animation of the TOC Game Simulator, with dice setting each station's capacity and coloured balls moving along a production line."
+++

**Quick link:** [Try the TOC Game Simulator in your browser](https://cloud.anylogic.com/model/b09c5f6f-c492-4a24-9187-15685c71f4e0). Choose **Play** to see the animation.

A chain's strength is determined by its weakest link. To make the chain stronger, I need to improve that link. Strengthening the others will not increase the load the chain can hold.

This is the basic idea behind the **Theory of Constraints (TOC)**, a management approach developed by Eliyahu M. Goldratt. It focuses on what limits the performance of the whole system. In a production line, improving one machine will not necessarily increase deliveries. I need to find what is holding the line back and organise production around it.

My undergraduate research at **UNESP in Bauru, Brazil**, was about making these ideas easier to teach. My supervisor, **Professor Fernando Bernardi de Souza**, had found it difficult to teach them using physical dice alone. The idea was to build a software version where students and teachers could change the settings and watch what happened.

I developed the simulator myself. Professor Fernando guided the theory and helped me decide how the game should work. The result was the **TOC Game Simulator**, built in AnyLogic during my 2023–2024 research project.

## What counts as a constraint?

A **constraint** is the factor that limits a system's progress towards its goal. An **internal constraint** exists when the factory cannot produce enough to meet market demand. An **external constraint** exists when the market wants less than the factory can produce and deliver.

A **bottleneck** is more specific: a resource whose capacity is less than or equal to the demand placed on it during a given period. A factory can have several bottlenecks, or none. Its main constraint can still be the market.

**Interacting constraints** occur when two or more resources or factors have similar capacities. With normal variation, the main limit can shift between them. This makes it harder to choose a steady production pace.

## How the Dice Game works

I based the model on the Dice Game described in *The Goal*, by Eliyahu M. Goldratt and Jeff Cox. The game uses dice to represent variation in a production line. Even if a station has the same average capacity every round, its actual output changes.

My simulator has five production stations, followed by a market stage. The balls on screen represent units of material. Each die gives a station's capacity for that round. A station can pass on only as many units as it has available.

If a station rolls a six but has only two units waiting, it processes two. The other four units of possible production are lost for that round. If it rolls a two while six units are waiting, four remain in its queue.

Those two rules create most of what the game needs to show. A good roll cannot always make up for a bad one. The next station depends on what the previous one sends. Equal average capacities do not mean a steady flow of finished products.

{{< homework-photo src="simulation-original.jpg" alt="The original Portuguese simulation interface, showing five production stations, the market, a rope linked to station 3, and charts for utilisation and inventory." caption="The simulation in my 2024 final report. The red outline marks the main constraint. The charts show station utilisation and average material waiting at each stage." >}}

The animation shows stations acting in sequence so their actions are easy to follow. Real factory stations can work at the same time. I kept the game simple enough for someone to pause it and explain where each unit went.

## Changing the production rules

The original rules are available as **Balanced and Push**. The stations have equal capacity settings, and material moves forward as each station processes it. This shows how variation and dependence between stations can disrupt flow, even when their average capacities are the same.

**Drum-Buffer-Rope (DBR)** organises production around an internal constraint. I identify the resource that sets the line's pace, then connect three parts:

- The **drum** is that resource's production schedule. It sets the pace for the rest of the line.
- The **buffer** protects the constraint from variation in the stations that supply it, reducing the risk of running out of work.
- The **rope** controls when new material enters the system, keeping its release in line with the drum.

In my game, I select a station as the main constraint. When it processes material, the rope releases the same number of new units into the line. This controls the amount of material up to that station.

**Protective capacity** is the spare capacity other resources need to recover from delays and rebuild the stock protecting the constraint. I represent it by adding to their dice rolls, normally up to a limit of six.

**Simplified Drum-Buffer-Rope (S-DBR)** assumes that market demand is the main constraint. Production resources need spare capacity relative to that demand. A single production buffer protects deliveries, and the rope controls material release at the market's pace. In the game, a sixth die represents how many finished units customers can take each round.

**Buffer Management (BM)** supports both DBR and S-DBR. It monitors the protection available to the constraint and sets priorities when it runs low. The buffer has three zones:

- **Green:** more than about two-thirds of the protection remains. No action is needed.
- **Yellow:** between about one-third and two-thirds remains. The situation needs attention.
- **Red:** less than about one-third remains. Orders need to be sped up to protect the constraint.

In the game, a red buffer adds one unit to the rolls of stations before the main constraint. This represents extra effort, such as overtime. The scenarios without BM are comparison cases. The complete methods rely on it.

BM also has a wider role beyond the game's immediate response. Recording why orders enter the red zone helps identify recurring problems and review whether the buffer size is suitable.

There is one simplification I explain in the manual: my buffer and rope settings use **units of inventory**. In the production methods the game is based on, these protections are expressed in time. A buffer of 20 balls helps show the idea, but it is not a full model of scheduling orders in a real factory.

## How to try the simulator

The [English version is available on AnyLogic Cloud](https://cloud.anylogic.com/model/b09c5f6f-c492-4a24-9187-15685c71f4e0). It runs in a browser. The sidebar has five starting scenarios:

| Scenario | What it lets me explore |
| --- | --- |
| Balanced and Push | Variation and stock buildup with equal capacity settings. |
| DBR without BM | A production station setting the pace. |
| DBR with BM | The same method with a response to low buffer levels. |
| S-DBR without BM | Market demand setting the pace. |
| S-DBR with BM | Market demand with Buffer Management enabled. |

{{< homework-photo src="cloud-scenarios.jpg" alt="AnyLogic Cloud showing the five English scenarios in the sidebar and inputs for the constraint, rope length, Buffer Management, warm-up, and protective capacity." caption="The current browser version uses Cloud's input panel. Selecting a scenario loads a starting setup that I can then adjust." >}}

For a first try, I suggest this:

1. Open **Balanced and Push** and choose **Play** to see the animation. Cloud's **Run** option calculates results without showing the animated game.
2. Turn on **Pause at Each Step** inside the game. Use **Next Step** to follow each station's action. Watch what happens when a station's roll is larger than its available stock.
3. Turn on **Show Statistics** when the movement makes sense. Compare delivered units with the material still waiting in the line.
4. Close the animation and try **DBR without BM**. Choose station 3 as the constraint. Change the rope length or protective capacity, one setting at a time.
5. Compare it with **DBR with BM** using the same settings. Then try the two S-DBR scenarios, where the market becomes the main constraint.

**Warm-up** skips the first ten rounds when collecting statistics. I can turn it off to explain the line from its initial state. For comparisons, I keep that choice the same across runs.

The [original user guide](toc-game-simulator-user-guide-pt.pdf) explains the controls in more detail. It is in Brazilian Portuguese. The local AnyLogic version also includes a setup for **interacting constraints**. That option is not part of the current Cloud menu.

## Developing the model

### From the theory to a working simulation

I started by studying DBR, S-DBR, Buffer Management, and interacting constraints. I returned to the Dice Game in *The Goal* and used the TOC literature to define the rules before implementing them.

I also had to learn AnyLogic. I first organised the decisions in a flowchart, then translated them into the model in stages. I began with the basic dice game. After that, I added DBR, S-DBR, Buffer Management, and interacting constraints.

{{< homework-photo src="model-flowchart.png" alt="The original Portuguese flowchart showing material release, dice rolls, the Buffer Management check, station actions, statistics collection, and the rope releasing replacement material." caption="The simplified model flowchart included in the user guide. It follows a round from the dice rolls to the next release of material. The original labels are in Portuguese." >}}

I tested each addition before moving on. In meetings with my supervisor, I paused the simulation at specific events and checked the state against what the theory said should happen. This helped me find errors in the rules and their implementation.

I also ran tests rounds and exported tables for another check. For the Balanced and Push mode, I entered the dice values from the example in *The Goal*. The model reproduced the example's results. That gave me a concrete reference alongside the checks of the other methods.

### Collecting useful data

I wanted the model to show more than moving balls. I recorded deliveries, lost production at the main constraint, Buffer Management activations, station utilisation, and inventory.

Some measures changed during development. I stopped displaying the count of times the constraint ran out of material because it overlapped with the lost-production measure. I kept recording it for possible research use. I also added live counts of available material and units processed in each round, so users could follow the animation.

For larger experiments, I created a separate model without the graphics and exported its data to Excel. In my last data collection it ran for milions of rounds.

### Building the interface and the guide

My first sketches of the settings screen was made with some papers and a pen (somewhere close from what you can see bellow), then I passed the best solution to Canva with buttons and colors. I then built and programmed the interface in AnyLogic, including the mode choices, sliders, dice, moving stock, and buffer colours.

{{< homework-photo src="parameter-menu-original.png" alt="The original Portuguese settings screen, with production mode buttons, primary and secondary constraints, Buffer Management, rope length, protective capacity, and the FAPESP support logo." caption="The local settings screen from my 2024 final report. It includes options that are not in the browser menu. The original FAPESP credit is preserved." >}}

I wrote the user guide to explain both the controls and a suggested teaching sequence. It starts with the original dice game, then introduces DBR, S-DBR, and Buffer Management. The teacher can pause at an event and discuss it before going to the next step or adding another concept.

By the time of my final report, my supervisor had used Balanced and Push twice in a production management course. A broader classroom evaluation was still planned. The checks I described above tested the model's behaviour; I did not report a measured improvement in student learning.

## Bringing the game to the browser

The Cloud version was an extra step beyond the original plan. I wanted people to try the game without first installing AnyLogic.

The main difficulty was the custom settings screen. AnyLogic Cloud does not export the desktop experiment's interface, as its [export documentation explains](https://anylogic.help/cloud/export-cloud.html). I tried moving that screen into the simulation, but the approach created too many errors and workarounds. I used Cloud's standard parameter panel instead.

The original project was in Portuguese because it was intended for classes in Brazil. I have now made a separate English version for local use and published it as a new Cloud model. The named scenarios make the main comparisons easier to find, while the original guide remains in Portuguese.

*This project was supported by FAPESP, the São Paulo Research Foundation, under grant 2023/05412-7. I developed the software at UNESP's School of Engineering in Bauru, with theoretical supervision from Professor Fernando Bernardi de Souza. The historical screenshots and flowchart come from the original project materials; the cover GIF shows the English version.*

*The TOC explanations in this post are translated and adapted from the introduction and theory sections of my [SIMPEP 2024 paper](simpep-2024-sdbr-buffer-management.pdf). I wrote it with Fernando Bernardi de Souza, Lucas Martins Ikeziri, and Isidoro Rays Filho. The paper includes the original references. The project also led to a paper on [DBR and Buffer Management at ENEGEP 2024](https://doi.org/10.14488/ENEGEP2024_TN_WG_411_2015_47255).*

