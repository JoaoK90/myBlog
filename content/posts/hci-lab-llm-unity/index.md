+++
title = "Talking to a Local AI in Unity"
date = 2026-11-07
draft = false
slug = "talking-to-a-local-ai-in-unity"
description = "Building a local chatbot in Unity and giving it some context about Joao's Files."
tags = ["HCI", "Lab", "Unity", "AI", "LLM"]
image = "cover.png"
imageAlt = "A fantasy character and dialogue from UndreamAI's LLM for Unity demonstration."
+++

In my [first Unity project]({{< relref "posts/hci-lab-1b" >}}), I built a small world where I could walk around and collect objects. This time, I wanted an interaction through conversation: typing a message and getting an answer inside the application.

For that, I used a **large language model**, or LLM, which generates text in response to instructions and messages. The model runs on my own computer, with Unity providing the chat interface. My character does not have a face or a 3D body yet. It is a text-based agent, and getting its messages to appear in a readable, organised window already gave me plenty to work on.

## Setting up the local model

I used [LLM for Unity, by UndreamAI](https://github.com/undreamai/LLMUnity), to connect Unity to a local model. Once the package and model are downloaded, this setup can generate replies without sending messages to an online service or requiring an API key.

{{< homework-photo src="llm-for-unity.png" alt="The LLM for Unity package by UndreamAI in the Unity Asset Store, showing an example fantasy character." caption="The package's example character." >}}

The project has two main objects on the model side. **LLM_GameObject** hosts the component that loads and runs the model. **AI Character** contains **LLMAgent**, which connects to that model and manages the conversation and its instructions.

My saved configuration uses **Qwen 3.5 4B**. This configuration uses the CPU for inference. The context size is **8,192 tokens**.

The agent's initial **System Prompt** asked for natural, brief replies of one to three sentences, without emojis. That prompt gives the model guidance about how to respond. Later, I expanded it with information about my blog.

{{< homework-photo src="model-settings.png" alt="LLM settings showing Qwen 3.5 4B, zero GPU layers, local execution and an 8192-token context size." src2="agent-settings.png" alt2="LLMAgent settings linked to LLM_GameObject, with the initial system prompt requesting brief replies without emojis." caption="The model configuration and the agent's initial instructions." >}}

The **Canvas** holds the interface: an input field for my message, a **Send** button, and a separate panel for the conversation. Inside **ChatScrollView**, the **ChatLogText** element displays the messages. For longer conversations, the layout work involved a **Vertical Layout Group** and **Content Size Fitter** to accommodate the growing history. The distinction between the conversation window and its content mattered: the window should keep its size while the text inside grows, and the view should follow the new text smoothly.

## Making the text readable

An early version had very small, rough-looking text. The screenshot below also shows how much empty space surrounded the chat. It was already displaying a reply, but I still needed to make the interface comfortable to read.

{{< homework-photo src="early-chat-display.png" alt="An early Unity Game view with small, pixelated-looking chat text, a pale conversation panel and a separate input field." caption="An early version, before the later layout and colour adjustments." >}}

I fixed the Game view resolution, its preview scale and the font size. The later captures use Full HD at 1×, with larger, clearer text. The visual changes also separated the controls more clearly. The input field became a light rectangle with a placeholder, and the turquoise button was labelled **SEND**. The conversation stayed in its own panel. None of that changes the model's answer, but it changes the human-computer interface.

## Connecting Send to the conversation

The **NPCController.cs** script connects the input field, button, chat text and agent. I assigned those references in the Inspector so the script knew which objects to read from and update.

{{< homework-photo src="controller-references.png" alt="NPCController Inspector with the LLM agent, input field, chat log text and Send button references assigned." caption="The four references used by the controller." >}}

When I click Send or press Enter, `OnSendClicked()` reads the input and removes extra whitespace. If the message is empty, it returns without sending anything. Otherwise, it adds the message to the history and starts the agent's reply.

While the reply is being generated, the script disables the input field and Send button. `HandleReply()` updates the displayed answer as it grows. When generation finishes, `OnReplyComplete()` stores the completed exchange, enables the controls again and returns focus to the input field.

This gives the conversation a basic turn structure. I can send a message, read the answer, then write again. I also added a waiting indicator, described below, to make the pause before the reply clearer.

## Compiler errors and disappearing colours

I also ran into compiler errors while assembling the project. One early screenshot records Unity failing to recognise `TMPro`, `TMP_InputField` and `TextMeshProUGUI`.

{{< homework-photo src="missing-textmeshpro-types.png" alt="Unity Console displaying CS0246 errors for unresolved TMPro, TMP_InputField and TextMeshProUGUI types." caption="The early TextMeshPro-related compilation errors." >}}

The colours caused another problem. I had formatted the example conversation in the editor, but sending a message replaced that text with new content generated by the script. The coloured labels disappeared because the replacement strings did not include that formatting.

The fix was to put the rich-text tags into the strings appended to the history. For example, the AI label is added as:

```csharp
fullLog += "<color=#FF9F1C><b>AI:</b></color> ";
```

The user label uses the same approach in blue. The later screenshots show both colours remaining in an actual exchange. My message and the model's reply are easier to distinguish without colouring the entire conversation.

{{< homework-photo src="chat-working.png" alt="The working Unity chat showing a Hello message, an AI greeting, coloured speaker labels, an empty input field and a turquoise Send button." caption="The main screen by default." >}}

## Giving the agent some context about my blog

After the basic greeting worked, I added context about **Joao's Files** to the System Prompt. This included what the blog is for, what I study and how someone could contact me. I also had to ask the agent to answer about me in the third person.

In the preview conversation, I asked about the purpose of the blog and then how to get in touch. The agent answered using the information supplied in those instructions. This did not involve training a new model, searching the web or connecting it to the live blog. I gave the existing model a description to use during the conversation.

{{< homework-photo src="final-conversation.png" alt="A conversation asking what Joao's Files is for and how to get in touch, with the agent answering from the supplied blog context." caption="Testing the agent with information about Joao's Files." >}}

## Waiting for the first word

Adding the blog context made the agent more relevant, but it also came with a frustrating delay. I timed three prompts, recording both the wait until text first appeared and the total time until the response finished:

| Prompt  -  |      First text appears  - |     Total response time |
| --- | --- | --- |
| 1     |           7.5 seconds     |   15.3 seconds |
| 2     |           8.4 seconds     |   11.2 seconds |
| 3     |           9.3 seconds     |   14.4 seconds |

Across these three prompts, the initial wait increased, although the total response time varied. What bothered me most was the pause before anything appeared. Once the answer started coming through, the generation itself did not feel that slow.

When I removed the added context, the response was immediate. That comparison suggests that processing the extra context and growing conversation was contributing to the delay before generation. I did not separately time that processing, but the difference was very noticeable while using the chat.

I added an **“AI is thinking”** indicator during the wait. It made the interface feel more responsive to me, as though the agent was thinking before answering. The indicator gave me feedback that my message had been received, even before the first word appeared. This was my own impression from using it, rather than a result from a participant study.

## Losing the layout when switching windows

I also found a bug when leaving Unity to answer while I opened another window. The text lost its framing, and returning to Unity did not restore the layout. I could not get it back into place during that interaction. The readable conversations shown above therefore do not mean the interface behaved correctly in every situation: switching away while a reply was being generated could leave the chat unusable.

The local conversation works, and the waiting indicator makes the delay easier to understand. The longer pause with added context and the layout failure when switching windows were the main problems I observed in these tests.

*Built for the talking-character lab of my Human–Computer Interaction course at Télécom SudParis.*

*Cover: demonstration image from UndreamAI's [LLM for Unity](https://github.com/undreamai/LLMUnity). Project screenshots are my own.*
