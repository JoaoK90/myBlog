+++
title = "HCI — Lab 1A: Building Joao’s Files"
date = 2026-09-23T23:00:00+02:00
draft = false
slug = "hci-lab-1a"
description = "Setting up Hugo on Windows, fixing installation problems, and choosing a theme for my blog."
tags = ["HCI", "Lab", "Hugo", "Web Development"]
image = "hugo.webp"
+++

For Lab 1A, I had to set up a blog to document my coursework. I started with the setup from class, then changed the theme and customised it to make Joao’s Files. Getting Hugo to run took more work than I expected.

## The first setup

I initially used `hugo-coder`. The first problem was copying the theme's example files: the command I had followed used Linux/macOS syntax and didn't work in PowerShell. I copied the files manually to continue.

Then `hugo server -D` failed while compiling SCSS. I had the standard Hugo edition, but the theme needed Extended for LibSass. The `+withdeploy` label in my version didn't mean that Extended was included.

Installing another version through Winget didn't fix it. Windows was still finding the executable in `C:\Users\joaok\go\bin` first. I had changed the installation without changing which Hugo actually ran.

To keep the installation through Go, I installed GCC using MinGW-w64 and rebuilt Hugo with CGO enabled:

```powershell
$env:CGO_ENABLED = "1"
go install -tags extended,withdeploy github.com/gohugoio/hugo@v0.166.0
```

After that, even `hugo version` exited without printing anything. The missing piece was the MinGW runtime: Hugo needed DLLs such as `libgcc_s_seh-1.dll` and `libstdc++-6.dll`. Adding `C:\Program Files\mingw64\bin` to `PATH` fixed it, and the version finally showed `+extended+withdeploy`.

## Getting the first version onto GitHub Pages

The deployment had two separate problems. I had put the workflow in `.github/workflow`, but GitHub expects `.github/workflows`, with an **s**.

Once the workflow ran, the SCSS error came back. The Action was downloading standard Hugo for Linux, so fixing my Windows installation hadn't fixed the build on GitHub. I changed the download to `hugo_extended` and added the image-cache configuration to `hugo.toml`.

That got the first version building locally and publishing through GitHub Actions. This was the original `hugo-coder` setup, before I moved to the current theme.

## Choosing a different theme

I wanted something different from the example we used in class. I spent quite a while browsing themes, looking for a minimal layout with a technical feel that still looked like a blog.

Some of the options I considered were [Rewired](https://themes.gohugo.io/themes/rewired/), [Shibui](https://themes.gohugo.io/themes/shibui/), [re-Terminal](https://themes.gohugo.io/themes/hugo-theme-re-terminal/), and [Solitude](https://themes.gohugo.io/themes/hugo-solitude/).

I ended up choosing [Mana](https://github.com/Livour/hugo-mana-theme). Its dark background, purple accents, and simple layout were close to what I wanted.

Changing themes meant I couldn't follow every step of the class tutorial exactly. I had to adjust filenames, paths, and configuration options. An old Hugo installation left in the project files also caused confusion after the earlier version changes.

## Making it my blog

I set the name to **Joao’s Files**, added **Between real and virtual** to the homepage, and used **Notes on vision, AI, and virtual worlds** as the description. I also added my About page, GitHub, LinkedIn, email, and a portrait illustration based on my photo.

For posts, I use a folder containing an `index.md` file and its images. This keeps the text and photos for each assignment together. After writing Homework 1, I also reduced the images in the post body: they were taking up too much of the screen. They now open at full size when clicked.

### So after all of that, I can finally say to you, my reader:

> Welcome to my Blog!