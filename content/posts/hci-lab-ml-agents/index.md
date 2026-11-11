+++
title = "Teaching My Game To Play Itself - Reinforcement Learning"
date = 2026-11-10
draft = false
slug = "teaching-my-unity-character-to-play"
description = "Reward functions, floating balls, and some millions of training steps later..."
tags = ["HCI", "Lab", "Unity", "AI", "Machine Learning", "Reinforcement Learning"]
image = "cover.webp"
imageAlt = "Two cube-shaped agents, one blue and one purple, beside a large ball in a Unity scene."
+++

I already knew how to finish my own game I made in Unity for another project: collect five mysterious balls, wait for the gate to open, cross the stone bridge and reach the last suspicious ball at the bottom of the well. I had built the world, placed its obstacles and tested the controls myself. This time, I wanted the character to do it without me. A Windows build of the game is available [here](https://drive.google.com/file/d/1Nd0hNVmiRXy_b9TnYeAgU1qJqkPCLVyx/view).

For that, I used **reinforcement learning**. The agent receives information about the game, chooses an action and gets a numerical reward. Repeating that process gives the training algorithm experience to learn from using a reward system.

## Turning my game into a training environment

This is an extension² of the world from my [first Unity walkthrough]({{< relref "posts/hci-lab-1b" >}}). I later made it playable, and have now made separate copies for the machine learning experiments, so changing the learning rules would not break the human version.

The agent can move in any direction, jump and use a dash. I used **Unity ML-Agents** with **PPO**, an algorithm that updates the agent's behaviour from its collected experience.

The camera in the recordings is for me. The network receives **31 numerical observations**, including its position and velocity, the ball's relative position, the score, the gate state and twelve distances to obstacles. So it already knows where the ball is; it must learn to use that information to reach it.

Only one ordinary ball is active at a time, at one of five possible positions. For this training, I let it remain until collected; the next one appears a second later. In the original game the player had a five-second window to get the ball before it disappears. I removed it because the agent needed to learn to form routes to the target. Each ordinary ball gives **+1**, and the final one gives **+5**. A complete game therefore earns **10 reward points**.

An **episode** is one attempt, ending in a win, a fall outside the map (just to be sure, I hope it's impossible) or a timeout. The environment then resets. An important observation: I had to allow the negative height of the well, so reaching the destination would not count as falling out of the map.

## Spoiler of the first attempt: agents stuck in a corner

My first training was about 37 minutes long. At normal simulation speed, progress felt very slow. The character developed a strong preference for the lower-left corner and kept pushing into it. 

I wondered whether there was a bug rewarding the agent in that location, but I did not find anything that rewarded that corner. Under the early settings, standing there for the full **300 seconds** cost about **−1.5**, with another **−0.5** at timeout. It was getting stuck, but there was no evidence that staying in the corner was secretly profitable.

{{< post-video src="first-training-corner.mp4" label="The first training run, with the character repeatedly pushing against the same area" caption="One of the windows' simulations">}}

The initial approach bonus was 0. It was added later, but was also very small: **+0.001 per metre of a new closest distance**, capped at **+0.02**. At a walking speed of 4 m/s, a direct approach could earn +0.004 each second, while time cost −0.005. So moving towards the ball was still better than standing still, but that small directional signal could run out before reaching a distant ball.

## Lowering the time cost, then removing it

In my next attempt I reduced the clock penalty from **−0.005 to −0.001 per second** and increased the approach budgets to **0.20 for an ordinary-ball stage**. The idea was to give movement towards the goal more room to matter. It still didn't work, and the agents stayed stuck in the lower-left corner.

After that, I tried removing the time penalty. Removing the clock cost gave the agent more freedom to explore, but the movement still looked scattered and did not evolve. Still, having fewer penalties did not tell it how to finish the task.

## Trying a logarithmic reward

Next came a dynamic distance reward; I wanted the last few metres towards a ball to matter more than the same distance far away.

The logarithmic bonus was:

```text
bonus = 0.10 × ln((5 + previous best distance) / (5 + new best distance))
```

For example, improving from 30 to 29 metres gave about **+0.0029**, while improving from 2 to 1 metre gave about **+0.0154**. That was a much stronger signal near the target.

It still fell into repetitive movement, even though the code only rewarded a new closest distance. The reason for the attempt at an infinite-reward exploit was not found.

## More speed, twelve windows and 1.5 million steps

I then returned to the version without the time penalty and let it run much longer to see if anything changed and I was only being impatient. After a bug caused one of the windows to run at 5x speed, I discovered that I could increase the **simulation speed**. It made a big difference to how practical this was. I opened **twelve instances** and recorded roughly twenty minutes of training.

Those windows were contributing experience to **one shared policy**, rather than training twelve independent models. It is important to notice that speeding up simulation time did not change the game rules.

By around **1.5 million steps**, the character had a recognisable routine around the house. It looked as though it had learned where the nearby balls could appear and kept circulating through those positions, while neglecting the ones farther away.

In the logs there were 50 attempts in the run where the collected-ball value reached five, so it sometimes managed to open the gate. But as it was trapped in an infinite loop around the house, it still never tried to collect the final ball.

{{< post-video src="circling-the-house.mp4" label="An excerpt from the no-time training run, showing the repeated movement around the house" caption="One attempt from the 1.5-million-step looping around the house." >}}

I know I had to change something big...

## Reward system V2

For V2, I used a function called **Near**, which changes more strongly close to the ball. Instead of keeping a record of the closest distance ever reached as used before, Near assigns a value to the current state:

```text
potential = B × 10 / (10 + distance)
extra reward = 0.999 × new potential − previous potential
```

Here, distance is measured from the centre of the character's body, and **B is 0.5 for an ordinary ball and 1 for the final ball**. This is a reciprocal function, different from the earlier logarithmic attempt.

The calculation happens once per decision, about ten times per simulated second. Changing the target remains part of the calculation, and ending an episode includes a correction that brings the terminal potential to zero. This follows the idea of [potential-based reward shaping](https://people.eecs.berkeley.edu/~russell/papers/icml99-shaping.pdf): provide intermediate guidance while keeping its relationship to the actual task consistent.

I also increased **gamma from 0.995 to 0.999**. Gamma controls how strongly future rewards are discounted. At this decision rate, a reward's weight halves after roughly **69 seconds instead of 14**, giving the distant final ball more importance.

V2 kept the latest 100-second limit for each episode. Several things changed together, including the distance reference and reward timing. This revised setup worked better, but the experiment does not isolate which change helped most.

{{< homework-photo src="progress-no-time-vs-v2.png" alt="TensorBoard curves comparing ordinary balls collected and the success signal: the no-time run remains unsuccessful through 1.525 million steps, while V2 Near improves and repeatedly finishes before 680 thousand steps." >}}

## The first win, and then many more

V2 Train had **six instances at 10× simulation speed**. The whole run lasts about thirteen minutes. The first success summary appears at **~260,000 training steps**.

After all the previous attempts, seeing the character actually finish meant much more than watching its reward go up. It had collected the five balls, opened the gate and reached the one at the bottom of the well. It seemed an impossible task at the start.

{{< post-video src="v2-first-win.mp4" label="The first observed V2 win, with the successful-episode counter changing from zero to one" caption="The first win in V2 Train" >}}

After the first success, I continued the same training in the recording called **V2 Fine tune** to let the agents improve as much as possible. After 8 minutes of simulation, each of the six windows showed around **100 successful episodes**. That was the repeated success I had been hoping to see.

{{< homework-photo src="v2-final-counters.jpg" alt="Six V2 training windows showing accumulated successful-episode counters: 101, 104 and 108 on the top row, and 103, 93 and 94 on the bottom row." caption="The six instances near the end of V2 Fine tune" >}}

The final step was **680,000**. Looking at the last 100 summaries gives a better picture than choosing only the best-looking attempt:

<div style="overflow-x:auto;margin:1.5rem 0;">
<table style="width:100%;min-width:360px;border-collapse:collapse;font-variant-numeric:tabular-nums;">
  <thead>
    <tr style="background:var(--glass-surface);border-bottom:1px solid var(--glass-border);">
      <th scope="col" style="padding:12px;text-align:left;">Metric</th>
      <th scope="col" style="padding:12px;text-align:right;">No-time run</th>
      <th scope="col" style="padding:12px;text-align:right;">V2 Near</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid var(--glass-border);">
      <td style="padding:12px;">Ordinary balls collected</td>
      <td style="padding:12px;text-align:right;white-space:nowrap;">1.41 / 5</td>
      <td style="padding:12px;text-align:right;white-space:nowrap;">4.95 / 5</td>
    </tr>
    <tr style="border-bottom:1px solid var(--glass-border);">
      <td style="padding:12px;">Success signal</td>
      <td style="padding:12px;text-align:right;">0.00</td>
      <td style="padding:12px;text-align:right;">0.98</td>
    </tr>
    <tr>
      <td style="padding:12px;">Episode duration</td>
      <td style="padding:12px;text-align:right;white-space:nowrap;">100.02 s</td>
      <td style="padding:12px;text-align:right;white-space:nowrap;">41.11 s</td>
    </tr>
  </tbody>
</table>
</div>

The final duration summary was **37.1 simulated seconds**, with a success. The success curve becomes much more consistent around 400,000 steps, and the duration falls as it learns to finish instead of waiting for timeout.

{{< homework-photo src="v2-duration-and-reward.png" alt="V2 training curves showing episode duration falling from the 100-second limit to around 41 seconds, task reward approaching ten, and a small negative distance-shaping total." >}}

## What I learned

The corner bias was obviously wrong, but the house routine looked much more convincing when I looked at a standalone run. Recording the actual collections and wins kept me from judging progress only by how confidently the character moved. I could then take the right decision to address the emerging problems until finding a final solution.

{{< post-video src="v2-full-hd-playback.mp4" label="The trained model playing the full game in Full HD" >}}

*Built for the ML-Agents lab of my Human–Computer Interaction course at Institut Polytechnique de Paris. I extended the exercise by adapting my own Unity game and comparing several reward designs.*
