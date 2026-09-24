+++
title = "HCI — Lab 1B: Getting Started with Unity"
date = 2026-09-24T00:00:00+02:00
draft = true
slug = "hci-lab-1b"
description = "My first Unity project: materials, prefabs, lighting, physics, and a player capsule."
tags = ["HCI", "Lab", "Unity"]
image = "unity-starting-main-photo.png"
+++

For Lab 1B, I installed Unity and started a small 3D scene to learn the basics. I added walls, fences, a bridge, and a player. The project is still in progress; these are the steps I've completed so far.

## Installation and first project

I downloaded Unity and created a project using the **Universal 3D** template, which uses the Universal Render Pipeline (URP).

{{< homework-photo src="unity-download.png" alt="Unity download page." src2="unity-setup-project.png" alt2="Creating a project with the Universal 3D template." caption="Downloading Unity and setting up my first project." >}}

I started by getting used to the editor: navigating the Scene view, finding objects in the Hierarchy, and locating files in the Project window. Understanding those panels made it easier to follow the next steps.

{{< homework-photo src="empty-world.png" alt="Unity editor showing the Scene view, Hierarchy, and Project window." caption="Getting familiar with the editor layout." >}}

## Materials and normal maps

My first tests were a brick block and a ground block. I applied textures and tried normal maps to give their surfaces more detail under the lighting. The normal map changes how the surface catches light without adding that detail to the mesh itself.

{{< homework-photo src="blocks-textures.png" alt="Two blocks with ground and brick materials applied." caption="Testing the ground and brick materials." >}}

## Walls, fences, and prefabs

I then assembled sections of wall and fence. I learned to group objects and save them as **prefabs**, so I could reuse a whole section. I also practised placing existing prefabs in the scene.

{{< homework-photo src="hierarchy-fences-walls.png" alt="Wall and fence groups selected in the Unity Hierarchy and Scene view." caption="Organising the walls and fences in the Hierarchy." >}}

For the stone bridge, I imported files from a downloaded asset folder and placed the model in the scene. This helped me understand how an imported object and its materials fit into the project.

{{< homework-photo src="stone-bridge.png" alt="Imported stone bridge above its asset folder in the Project window." caption="The imported bridge and its files." >}}

## Lighting the scene

I experimented with a point light near the wall and a spotlight aimed at the bridge. Moving the lights and changing their settings let me see how they affected the materials and which parts of the scene stood out.

{{< homework-photo src="light-pink-spotlight.png" alt="Pink light illuminating the wall and fence, alongside a spotlight aimed at the bridge." caption="Testing a coloured light and a spotlight." >}}

## Physics and animation

I used a ball on the bridge to let it slide down and test collisions and gravity. I also made a basic animation of a fence opening and closing.

{{< homework-photo src="ball-gravity.png" alt="Ball on the stone bridge during a physics test." src2="fence-animation.png" alt2="Fence section rotated into an open position." caption="Testing the ball's physics and a gate-opening animation." >}}

## Adding a player

I downloaded Unity's [First Person + Third Person Character Controllers](https://assetstore.unity.com/packages/3d/characters/first-person-third-person-character-controllers-196526) package from the Asset Store and imported a player into the scene.

{{< homework-photo src="asset-store.png" alt="Character Controllers package by Unity Technologies in the Asset Store." caption="The character controller package I used." >}}

For now, the player is just a capsule. I moved **Main Camera** inside **PlayerCapsule** in the Hierarchy, making the camera a child of the player so it moves with it. This was a useful example of how parent-child relationships work in Unity.

{{< homework-photo src="player-capsule.png" alt="Player capsule in the scene, with Main Camera nested under PlayerCapsule in the Hierarchy." caption="The player capsule with its camera attached." >}}

## What is still missing

- Collectible items around the scene.
- A sound when an item is collected.
- A score counter.

The basic scene is there. Next, I want to connect these parts so the player has something to interact with.
