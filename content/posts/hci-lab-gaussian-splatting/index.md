+++
title = "Turning My Room and Plush Toys into Gaussian Splats"
date = 2026-11-08
draft = false
slug = "my-room-and-plush-toys-in-unity"
description = "Making a virtual rendering of my room."
tags = ["HCI", "Lab", "Unity", "Gaussian Splatting", "3D Reconstruction", "Computer Vision"]
image = "cover.png"
imageAlt = "The Gaussian splats of my room and plush toys combined in Unity, viewed close to the computer desk."
+++

I spend enough time in my room that I know what should be there. A ramp rising through the middle of it towards my computer desk is definitely not one of those things. That was one of the surprises I got while trying to bring the room into Unity.

**3D Gaussian Splatting** creates a representation of a scene from photographs taken from different viewpoints. It uses many small, overlapping 3D Gaussians, with properties such as position, shape, colour and opacity, to reproduce the appearance of the scene when viewed from different angles.

I had already worked with this during my summer internship at ARTEMIS Laboratory, so I wanted to go beyond importing the provided example. I chose to capture my own plush toys and my room.

## Starting with the plush toys

I began with the smaller scene. I placed the plush toys on a surface with good lighting and took photographs from different positions around them, trying to capture their shape and the details of the fabric.

The final plush-toy dataset contained **46 photographs**, filtered from the **72** I had taken.

{{< homework-photo src="plush-toys-dataset.jpg" alt="An original dataset photograph of the plush toys on a light blue surface, before background masking." caption="One of the original photographs, before masking the background." >}}

Getting the focus right was not easy. The fur has fine detail, and the camera was not consistently picking it up. This is what eliminated most of my dataset. I had to pay attention to the focus and adjust it as I worked.

Before reconstruction, using the OpenCV library, I created a mask for each image to separate the toys from the background. The aim was to keep the reconstruction focused on the objects and avoid bringing the surrounding scene into the splat. That added a preparation step, but I wanted the toys to remain separate objects that I could later move through the Unity Scene.

I then used **COLMAP** to generate the point cloud. It finds corresponding features across photographs and estimates both the 3D structure and the camera positions. That gave the Gaussian Splatting training a starting point.

After the 3DGS training, the plush-toy splat was ready. It was a pretty good result, although there were still some unwanted fragments around it. The Unity screenshots further down show the result.

## Capturing the whole room

For my room, I used a video instead of taking each photograph separately. After my first attempt at recording it, I learned to move slowly around the room, stopping roughly every second so the camera could capture a steadier view. I tried to cover all the space as I walked through it.

{{< homework-photo src="room-dataset-frame.jpg" alt="A frame from the room dataset showing the laptop, monitor and computer desk." caption="A frame from the room dataset." >}}

I also wrote a script to select images from the recording. It divides the video into one-second time windows, scores the frames for sharpness, and keeps the sharpest candidate in each window. That way, the dataset is not simply every frame or an image picked blindly at a fixed timestamp.

The first video extraction contained **554 frames**. It was discarded because I moved through the whole studio too fast (even though the video was about 3 min long). The second capture that was about 11 minutes long produced **669 frames**, which were used as input to the recorded reconstruction run. Only **658** of them were successfully registered.

This made the capture process quite different from the plush toys. I was moving through a whole environment, with furniture and objects covering parts of one another, while trying to collect enough views of everything I wanted to reconstruct.

## The room folded into a ramp

The first obvious problem appeared in the point cloud, before Gaussian Splatting. Part of the room seemed to fold over itself and form a ramp through the middle of the space, rising towards the desk where my computer sits.

It was a very strange result to inspect because I could recognise the room around it, but the geometry in that area was clearly wrong. I opened the reconstruction in **CloudCompare** and manually removed the misplaced points.

{{< homework-photo src="room-point-cloud-before.png" alt="The room point cloud before manual cleaning, with a broad misplaced band of points crossing the space near the desk." src2="room-point-cloud-after.png" alt2="The room point cloud after manual cleaning, with the misplaced band removed from the central area." caption="The point cloud before and after the first manual cleanup." >}}

That was the first cleanup, on the reconstructed point cloud. I then continued with Gaussian Splatting, expecting to see how the room would look after training.

Unfortunately, when I performed the Splatting, a large unwanted patch appeared in the middle of the room again, and this time it was worse because removing it would impact the Splat directly. I went back to CloudCompare and manually cleaned the splat as well, before importing it into Unity.

These were two separate interventions: one before training and another afterwards. The second pass removed the large patch, but it did not turn the whole room into a clean reconstruction. There was still noise elsewhere, which is visible in the final views.

## Bringing the splats into Unity

With both splats ready, I downloaded the [UnityGaussianSplatting project by Aras Pranckevičius](https://github.com/aras-p/UnityGaussianSplatting), following the suggested renderer, and opened its URP example in Unity. I used the Gaussian Splat Renderer component to load my own PLY files.

Once imported, I had to correct the orientation manually. The plush toys were not initially aligned with the world the way I wanted, so I adjusted their rotation and put the splat under an empty **parent object** in the Hierarchy.

The child retained the rotation correction, while the parent gave me a neutral transform for positioning the group. This made it easier to work with the corrected orientation.

{{< homework-photo src="rotation-and-parent.png" alt="Unity Hierarchy showing Splat_Pelucia beneath an empty Parent object, with the splat's corrected rotation visible in the Inspector." caption="Correcting the orientation and organising the splat under a parent object." >}}

## Analysing the results

The plush toys were the more successful reconstruction. Their shapes and faces are recognisable, and the result looks reasonably clear from the view below. There are still dark fragments floating around them, so the masks and preparation did not remove every unwanted element.

{{< homework-photo src="plush-toys-in-unity.png" alt="The reconstructed plush toys in Unity, with recognisable faces and fabric surfaces and some dark floating artifacts around them." caption="The plush toys after correcting their orientation in Unity." >}}

The room was much less consistent. I found a few angles that showed it reasonably well. I would call it a reasonable first result for this capture, but it was far from the quality I wanted across the whole space.

{{< homework-photo src="room-desk-in-unity.png" alt="The room splat viewed towards the computer desk, showing recognisable furniture alongside blurred surfaces and reconstruction noise." src2="room-kitchen-in-unity.png" alt2="Another view of the room splat showing the kitchenette, wall shelves, table and remaining reconstruction artifacts." caption="Views of the room." >}}

Cleaning the large artifact helped make the result usable for this scene. It did not fix all the weaknesses of the reconstruction. I could recognise my furniture, but inspecting different angles made the limitations hard to ignore.

## Putting the two captures together

Finally, I placed the separately reconstructed plush toys inside the room, on the table. This brought the two capture processes into the same Unity scene. The image below shows both objects in the Hierarchy and the resulting composition.

{{< homework-photo src="plush-toys-and-room.png" alt="The combined Unity scene, with Splat_Pelucia and Splat_Quarto in the Hierarchy and the plush toys placed on the room's table." caption="The two separately captured splats together in Unity." >}}

Choosing my own subjects meant dealing with focus, image preparation and reconstruction errors before I even reached the Unity import. My internship experience gave me a starting point, but this room still required much more experience. I do intend to capture it again. This attempt gave me a clearer idea of what I need to be sure of along the way.

*Built for the Gaussian Splatting lab of my Human–Computer Interaction course at Institut Polytechnique de Paris. Creating my own captures was a personal extension of the provided workflow.*
