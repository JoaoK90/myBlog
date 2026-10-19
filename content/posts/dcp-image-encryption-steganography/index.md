+++
title = "Breaking ancient encryption"
date = 2026-10-19
draft = false
slug = "breaking-ancient-encryption"
description = "Implementing some really basic ciphers in Python and hiding messages inside images."
tags = ["Digital Content Protection", "Cryptography", "Python", "Image Processing"]
image = "images/coverimage.jpg"
+++

I can change the colours of a photograph and still recognise the face in it. Even after moving pixels around, the outline of a hat or a large uniform area may give the image away. That is what I wanted to investigate: how much information remains visible after an image has been transformed, and whether looking scrambled is enough to keep its content private.

Before changing anything, it helps to think about what an image actually is to a computer. A digital image is a grid of **pixels**. In an 8-bit grayscale image, each pixel is represented by a number from **0 to 255**: 0 is black, 255 is white, and the values between them are shades of gray. An RGB colour image stores three values per pixel, one for red, one for green, and one for blue. Changing those numbers changes the picture; changing where they are placed changes its structure.

**Encryption** transforms information using a **key**, which determines how the transformation is performed and lets us reverse it through decryption. The goal is to keep the content confidential without that key. I started with three deliberately simple approaches: shifting the pixel intensities, replacing them through a lookup table, and rearranging their positions. They are useful for understanding what an image can reveal, rather than methods I would use to secure a file. Recovering the original successfully does not, by itself, mean that the encrypted version kept it secret.

There is also another way to hide information: leave the photograph looking ordinary and put a message inside it. This is **steganography**. Its aim is to conceal the presence of the message, whereas encryption conceals its meaning. The hidden message is not necessarily encrypted. Here, I used a pattern of zeros and ones, stored in the **least significant bits (LSBs)** of the pixel values. A bit is a binary digit, either 0 or 1. Changing only the last bit alters a pixel's intensity by at most one unit, which can be difficult to notice in the photograph.

An embedded mark can also carry information about the content, such as an identifier. This is the idea behind a **digital watermark**. Whether that mark survives normal image processing is important if we want to read it later.

That creates a different question: will the message survive when I save the image? **Lossy compression**, such as ordinary JPEG compression, can change pixel values while keeping the picture visually similar. **Lossless compression**, such as PNG, preserves those values. A photo can therefore look unchanged even after the information hidden in it has been damaged.

I implemented these experiments in **Python**, using **NumPy** in **VS Code**. My two grayscale test images were Lena, a portrait, and Baboon, an animal photograph, both 512 by 512 pixels. I also tried the Lego logo to compare detailed photographs with an artificial image containing large, flat colour regions. The code excerpts below focus on the transformations; image loading, allocation of result arrays, and plotting are omitted.

## Caesar cipher applied to images

The Caesar cipher replaces each letter with another letter a fixed number of positions away in the alphabet. Figure 1 shows a shift of three: A becomes D, B becomes E, and so on through the alphabet. After Z, the sequence comes back to A. With this key (3), `Hello world` becomes `Khoor zruog`. To recover the original message, I move each letter three positions in the opposite direction. 

{{< homework-photo src="images/caesar_shift.png" alt="Caesar substitution with a shift of three." caption="Figure 1. Caesar substitution with a shift of three. Source: [Syed Bilal Ali, Caesar Cipher in Cryptography](https://www.linkedin.com/pulse/caesar-cipher-cryptography-syed-bilal-ali/)." >}}

For the experiment, I applied the same idea to gray levels instead of the 26 letters. There are 256 possible intensities, from 0 to 255. Adding the key shifts these values by the exact amount, and `% 256` makes the values return to the beginning of the range when they pass 255. For example, a pixel at 250 plus a key of 10 becomes 4. Its position in the image does not change.

### Implementation

I converted the image to integers and generated five random keys. The loop repeats the experiment for each key, and `i` selects where to store its result. Later, decryption subtracts that same key and brings the values back into the range again. Both operations fit into a single expression.

```python
lena = lena.astype(int)
keys = np.random.choice(range(1, 256), size=5)

for i, key in enumerate(keys):
    lena_caesar[i] = (lena + key) % 256
```

```python
for i, key in enumerate(keys):
    lena_recovered[i] = (lena_caesar[i] - key) % 256
```

### Results for Lena

I can still recognize Lena in all five encrypted versions in Figure 2. The face, hat and background keep their positions, even when their intensities look very unnatural. The recovered images in the last row match the original.

{{< homework-photo src="images/example1.png" alt="Caesar applied to Lena. Original, Encrypted and Recovered, one column per key." caption="Figure 2. Caesar applied to Lena. Original, Encrypted and Recovered, one column per key." >}}

The version with key 245 looks close to the original, but slightly darker. A shift that large goes almost all the way around the range, leaving a result similar to a small shift in the opposite direction. The versions with keys 81 and 107 look much stranger, with strong light and dark regions.

The encrypted image for key 179 reminded me of a negative photograph. Two nearby intensities can end up on opposite sides of the 256 boundary: with key 81, 170 becomes 251 while 180 becomes 5, so depending on the image a certain key would produce this negative-like effect, explaining the abrupt changes in contrast. So intermediate keys can produce a weird/terrifying appearance, but the exact effect depends on the image's original gray levels.

### Results for Baboon

I obtained similar results with Baboon. With key 10, the encrypted image looks brighter; with key 240, it looks mostly darker, but there are no other big changes, which is really bad for something that was supposed to be encrypted. Even in the more distorted versions, the eyes and nose are still immediately recognizable.

{{< homework-photo src="images/example2.png" alt="Caesar applied to Baboon. Original, Encrypted and Recovered, one column per key." caption="Figure 3. Caesar applied to Baboon. Original, Encrypted and Recovered, one column per key." >}}

The textures explain some differences in appearance. Baboon has only 3 main regions: the nose, the area surrounding it, and the dense fur, so the changes in contrast appear all at once. In Lena, these large, distinct areas were less clearly defined, making it harder to identify which regions become large light or dark patches. In both cases, spatial structure remains almost the same for someone to understand the image without finding the key.

### Text and image content

When this method is applied to text, a shifted sentence usually stops being directly readable, even though the alphabet decoder wheel in Figure 4 makes manual recovery straightforward once the shift is known. In a photograph, I can recognize a face without recovering the original gray level. This makes Caesar look more effective on text, while the encrypted images still reveal their subjects.

{{< homework-photo src="images/caesar-decoder.png" alt="An alphabet decoder wheel illustrating manual letter substitution." caption="Figure 4. An alphabet decoder wheel illustrating manual letter substitution." >}}

This visual difference does not make the text version secure. There are very few possible shifts to try, and the same is true for the image version. For this reason, Caesar is only usable as a simple initial teaching example or at most a manual puzzle, rather than to protect a modern digital file.

## Simple substitution cipher applied to images

Simple substitution replaces each letter using a fixed table. Unlike the Caesar cipher, the replacements do not need to follow a regular shift. In Figure 5, each original letter is replaced by the letter directly below it: H becomes d, E becomes p, L becomes v, and O becomes w. Therefore, `HELLO` becomes `dpvvw`. The matching colors highlight these replacements. Both occurrences of L become v because the same input always receives the same output.

{{< homework-photo src="images/substitution_letters.png" alt="Simple substitution table with the replacements for HELLO highlighted. Adapted from The Detective Society." caption="Figure 5. Simple substitution table with the replacements for `HELLO` highlighted. Adapted from [The Detective Society](https://explore.thedetectivesociety.com/how-to-solve-ciphers/substitution-cipher/)." >}}

For grayscale images, I use the same idea with pixel intensities instead of letters. The table must cover all 256 possible values, from 0 to 255, rather than the 26 letters of the alphabet. The key therefore contains 256 entries arranged in a random order. Each original intensity selects its replacement from this table, while the pixel stays in its original position. To recover the image, you must look up the replacements in the opposite direction.

### Implementation

`np.random.permutation(256)` places every value from 0 to 255 into a random order. This is the key. Each value appears once, so I can reverse the substitution without confusing two different inputs.

```python
keys = []
for i in range(5):
    keys.append(np.random.permutation(256))

for i, key in enumerate(keys):
    lena_simple_subst[i] = key[lena]
```

Here, `key[lena]` uses each pixel intensity as an index into the table. If the entry at position 100 contains 230, every pixel originally equal to 100 becomes 230. 

```python
for i, key in enumerate(keys):
    inverse_key = np.argsort(key)
    lena_recovered[i] = inverse_key[lena_simple_subst[i]]
```

Thankfully, NumPy has a perfect function for recovering the original, keeping the code short. Basically, to undo the shuffling I need a table that takes each substituted intensity back to its initial value. For this permutation, `np.argsort(key)` provides that reverse lookup. The function is explained in Figure 6.

{{< homework-photo src="images/argsort.png" alt="Argsort returns the index values in an order that would sort the input array." caption="Figure 6. Argsort returns the index values in an order that would sort the input array. Source: [Sharp Sight](https://sharpsight.ai/blog/numpy-argsort/)." >}}

### Results for Lena

At first glance, the encrypted results in Figure 7 are much harder to interpret than the Caesar images. Parts of the hat, head and shoulder remain barely visible depending on the key used, but it's not possible to confidently identify Lena from these results alone. Having the original beside them makes the connection much easier.

{{< homework-photo src="images/example3.png" alt="Simple substitution applied to Lena. The rows show the original, encrypted and recovered images for five random keys." caption="Figure 7. Simple substitution applied to Lena. The rows show the original, encrypted and recovered images for five random keys." >}}

The result has a grainy, distorted and almost surreal appearance. Some areas also look blurred. Two close gray levels can receive very different replacements, turning small original variations into strong contrast. This gives the impression of high-frequency noise, with only some contours remaining.

The pixel positions have not been shuffled. Only their values have changed, which explains why parts of the original layout survive. The last row also shows that the inverse table successfully recovers the initial photograph.

### Results for Baboon

Baboon becomes very noisy, especially in the fur, but in Figure 8 I can still distinguish the area of the nose, and for some keys, the eyes. These features make it easier to recognize an animal rather than to identify a person.

{{< homework-photo src="images/example4.png" alt="Simple substitution applied to Baboon. The rows show the original, encrypted and recovered images for five random tables." caption="Figure 8. Simple substitution applied to Baboon. The rows show the original, encrypted and recovered images for five random tables." >}}

The visibility for this method also depends on the key. A smooth region contains many similar intensities, and pixels with exactly the same value always receive the same replacement, so for uniform color regions, as in artificial images, this would be a big problem for encryption. Even the smallest differences in colors can become noise. This is the reason that this really simple method works so well in real images. But as seen, groups of equal pixels can still outline a nose or another recognizable region. This is the image equivalent of the two Ls receiving the same substitution in the text illustration. This is what we are going to explore in the additional section below.

### Additional test: Lego logo

I tested the code on the Lego logo to see what would happen with an artificial image. In Figure 9, the colors change and some borders become noisy, but I can still read *LEGO* in every version. The large flat regions and the lettering preserve their shapes.

{{< homework-photo src="images/example3lego.png" alt="Simple substitution applied to the RGB Lego logo. The first row shows the original and the second shows the encrypted images for five random tables." caption="Figure 9. Simple substitution applied to the RGB Lego logo. The first row shows the original and the second shows the encrypted images for five random tables." >}}

This input has three color channels. The same table was applied separately to the red, green and blue values automatically, without having to change the code. However, color is not the reason the logo remains readable. As discussed, this effect is due to uniform areas in artificial images like logos, icons and interface graphics, which reveal a weakness that is less obvious in a detailed real photograph.

### Text, images and repeated substitution

Simple substitution changes the symbols, but it does not hide how often they appear. In text, a frequent letter becomes another equally frequent letter. The same idea applies to pixel intensities: if the value 100 appears 1,000 times and the table replaces it with 230, the encrypted image will contain 1,000 pixels with value 230. The histogram bars move to different gray levels, but their counts remain available. Comparing these frequencies with expected ones can give clues about the replacements, even when the photograph looks like noise.

Applying the method several times would not solve this problem. For example, if the first table changes 100 into 230 and the second changes 230 into 40, the two operations together are equivalent to a single table that changes 100 directly into 40. 

The difference between text and images is that repeated letters give you clues about words, but you need something else to decrypt them, while in images, groups of equal pixels can directly reveal shapes that a human brain has evolved over thousands of years to recognize, as Baboon's nose showed.

## Transposition cipher applied to images

Transposition doesn't change the original symbols. It simply changes their order. In Figure 10, the text is placed in rows below the keyword `KEYWORD`. The numbers (key) define an order for the columns, which are rearranged before the letters are read down the columns to produce the ciphertext. The letters themselves have not been replaced.

{{< homework-photo src="images/transposition_letters.png" alt="A columnar transposition example." caption="Figure 10. A columnar transposition example. Source: [Cryptanalysis of the Columnar Transposition Cipher with Long Keys, indexed by Semantic Scholar](https://www.semanticscholar.org/paper/Cryptanalysis-of-the-Columnar-Transposition-Cipher-Lasry-Hayarden/74e63f7f64c5a691b8b7c80fde75f07407f664c4)." >}}

I used this idea of reordering positions to implement transposition within pixel blocks, reducing the size of the key. The Python code takes consecutive groups from the flattened image and randomly rearranges the values inside each group based on the same key, as in Figure 10 but with pixel intensities. It does not reproduce the column-reading procedure in the illustration.

This was the code I found most difficult. I had to think about how to form the blocks, apply the same key repeatedly, recover their original order and handle the final block when the total number of pixels was not a multiple of the block size. Finding the appropriate NumPy indexing made the final code much shorter than my initial expectation about it.

### Implementation with pixel blocks

I started with blocks of 32 pixels. `flatten()` reads the image row by row and turns it into a vector. The key here is going to be an ordering of positions inside one block, so a block of 32 pixels needs a permutation of 32 positions. This is different from the 256-entry intensity table in the last section for simple substitution.

```python
block_size = 32
lena_flat = lena.flatten()

keys = []
for i in range(5):
    keys.append(np.random.permutation(block_size))
```

For example, applying the key `[2, 0, 3, 1]` to the block `[10, 20, 30, 40]` gives `[30, 10, 40, 20]`. In the image code, I repeat the selected ordering inside every block, then finally use `reshape()` to restore the image dimensions.

```python
for i, key in enumerate(keys):
    lena_flat_transp = np.zeros_like(lena_flat)
    for j in range(0, lena.size, block_size):
        block = lena_flat[j:j+block_size]
        block_key = key[key < len(block)] # to accept the last block key being smaller
        lena_flat_transp[j:j+block_size] = block[block_key]
    lena_transp[i] = lena_flat_transp.reshape(lena.shape)
```

Decryption visits the same blocks and again uses `np.argsort(block_key)` to undo their ordering. It needs the key and the block size, rather than the original pixel values.

```python
for i, key in enumerate(keys):
    lena_flat_transp = lena_transp[i].flatten()
    lena_flat_recovered = np.zeros_like(lena_flat)
    for j in range(0, lena.size, block_size):
        block = lena_flat_transp[j:j+block_size]
        block_key = key[key < len(block)]
        inverse_key = np.argsort(block_key)
        lena_flat_recovered[j:j+block_size] = block[inverse_key]
    lena_recovered[i] = lena_flat_recovered.reshape(lena.shape)
```

### Starting with blocks of 32 pixels

The first test in Figure 11 still clearly shows Lena. Her features are distorted into vertical strips, but the face, hat and shoulder remain identifiable. The recovered row matches the original.

{{< homework-photo src="images/example5blocks32.png" alt="Blocks of 32 pixels. Original, encrypted and recovered images are arranged in rows, with five random keys." caption="Figure 11. Blocks of 32 pixels. Original, encrypted and recovered images are arranged in rows, with five random keys." >}}

At first, I interpreted the vertical appearance as pixels moving up and down. In this particular case, each 512-pixel row contains 16 complete blocks. The pixels only change columns, and the same permutation is repeated in every row. Therefore a column fragment moves to the same new position throughout the height of the image, creating vertical strips from a horizontal pattern.

### Allowing other block sizes

My earlier code failed with `block_size = 33`. The final block had only 25 pixels, and this was crashing the code. The line below solved the problem by keeping only positions that exist in the current block:

```python
block_key = key[key < len(block)]
```

For recovery, I invert this filtered key, not the full key. This lets me choose any positive integer block size without adding padding. The block size affects the visual pattern. When it divides the width of 512, the block boundaries line up in every row. This new solution for choosing block sizes can weaken the vertical alignment, although repeating the same key can still create other visible patterns.

### Small blocks: 6 and 8 pixels

With a length of 6, Lena looks only slightly blurred in Figure 12. The middle encrypted result looks almost unchanged at this scale. This probably means that the key was close to the identity permutation, keeping the image pretty much the same.

With a length of 8, we align the blocks vertically so the vertical distortion is easier to notice, but the image is still completely recognizable. Again, some keys alter the appearance much more than others.

{{< homework-photo src="images/figure-12.png" alt="Encrypted Lena images with blocks of 6 pixels above and 8 pixels below." caption="Figure 12. Encrypted Lena images with blocks of 6 pixels above and 8 pixels below." >}}

### Larger blocks: 96 and 128 pixels

The length-96 results in Figure 13 look much more blurred and fragmented. I can connect them to Lena when comparing them with the original, but the subject is less obvious on its own.

With a length of 128 we again align the blocks vertically, so each image row is divided into four groups (512 / 128). The repetition of the same ordering creates four vertical bands across the width. We can still infer the face from the third band from the left, even though much of the surrounding image is too difficult to interpret. To be clear, these are four side-by-side bands, rather than the four quarters used later in the LSB experiment.

{{< homework-photo src="images/figure-13.png" alt="Blocks of 96 pixels above and 128 pixels below. The latter divides each 512-pixel row into four groups." caption="Figure 13. Blocks of 96 pixels above and 128 pixels below. The latter divides each 512-pixel row into four groups." >}}

### Blocks of 192 and 256 pixels

The length-192 images in Figure 14 remind me of a more blurred version of the length-128 results. Their boundaries do not align with every image row. At this point we cannot recognize Lena anymore.

At 256, each row has two complete blocks. The distortion is strong, yet elements of a human face remain visible. Increasing the block size therefore does not produce a perfectly regular progression in concealment: its alignment with the image width and the selected permutation also matter.

{{< homework-photo src="images/figure-14.png" alt="Encrypted results for blocks of 192 pixels above and 256 pixels below." caption="Figure 14. Encrypted results for blocks of 192 pixels above and 256 pixels below." >}}

### Blocks of 512 and 2048 pixels

With a length of 512, each block is one entire row. The result in Figure 15 looks mainly like vertical noise. However, applying the same key to every row is still equivalent to rearranging whole columns, so the result retains a strong directional structure.

With a length of 2048, each block contains four complete rows. Pixels can now move between those rows as well as between columns. The result looks more like grayscale noise, although broad variations in brightness remain, with darker bands through the image.

{{< homework-photo src="images/figure-15.png" alt="Blocks of 512 pixels above and 2048 pixels below, corresponding to one and four complete rows per block." caption="Figure 15. Blocks of 512 pixels above and 2048 pixels below, corresponding to one and four complete rows per block." >}}

### Using the entire image as one block

Finally, I set the block size to the number of pixels in the image:

```python
block_size = lena.size
```

For this grayscale image, that means 262,144 pixels. This is the same as multiplying lena's width by lena's height. In this setting, the block method becomes a global transposition, because there is only one block and a pixel can be moved to any position.

{{< homework-photo src="images/example5blocks-lenashape-.png" alt="One block containing all 262,144 pixels. These five encrypted results are fine noise." caption="Figure 16. One block containing all 262,144 pixels. These five encrypted results are fine noise." >}}

I can no longer recognize the face, hat, background, anything, in Figure 16. All five versions look like high-frequency noise. The pixel values have not become new random intensities; their positions have been randomized over the whole image. The key now contains 262,144 position entries, which is much larger than the short keys used for the local blocks.

### Baboon and the Lego comparison

The Baboon result in Figure 17 corresponds to this same full-image case. Even the nose and eyes, which remained useful clues after substitution, disappear into the noise. The last row shows the recovered image.

{{< homework-photo src="images/example6.png" alt="Baboon with all pixels in one block. The rows show the original, encrypted and recovered images." caption="Figure 17. Baboon with all pixels in one block. The rows show the original, encrypted and recovered images." >}}

Baboon's noise looks slightly brighter overall than Lena's. Transposition preserves the values, so it also preserves their average brightness and the number of occurrences of each gray level. The original smooth skin or dense fur no longer determines the local appearance when all positions can be mixed, but the overall intensity distribution remains. Someone with candidate original images could still compare these unchanged gray-level counts without knowing the key to determine what the original image was, if known.

The full-image setting also hides the Lego lettering in Figure 18, unlike substitution. This input is RGB, so flattening includes the individual channel values: the code can mix color components as well as their spatial positions. It preserves their combined values, but not necessarily the original color combinations.

{{< homework-photo src="images/figure-18.png" alt="The Lego logo before and after full-length transposition." caption="Figure 18. The Lego logo before and after full-length transposition." >}}

For short text blocks, the remaining letters can suggest anagrams, and language can help a person guess possible words. This becomes much harder when long blocks mix letters from several words. The image experiments show a similar dependence on the size of the region being rearranged. Small blocks preserve local clues, while the full-image block removes the visible shapes much more effectively.

## LSB steganography

LSB steganography hides information by replacing the last bit of a pixel value. This bit contributes only one single unit to the intensity, so changing it can leave the photograph looking the same to human eyes.

Figure 19 shows the idea for an RGB pixel. There is one value for red, one for green and one for blue. In each value, the final bit marked X is replaced with a hidden bit. For example, the red value can become `11011010` or `11011011`, corresponding to 218 or 219. The rest of the bits remain the same.

{{< homework-photo src="images/lsb_rgb.png" alt="LSB insertion into the three channels of an RGB pixel." caption="Figure 19. LSB insertion into the three channels of an RGB pixel. Source: [Image-Stegnography-using-LSB](https://github.com/raagul123/Image-Stegnography-using-LSB)." >}}

The illustration can carry one hidden bit in each of its three channels. Lena and Baboon inputs are grayscale, so each pixel has only one intensity value. In the first experiment, we stored one hidden bit per pixel.

### Hiding a pattern in Lena

We created a pattern with 0 in the bottom-right and upper-left quarters, and 1 in the other two. Starting from zeros means that I only need to fill the two quarters containing ones. After thinking it through, the code became as simple as this:

```python
rows, cols = lena.shape

pattern = np.zeros_like(lena)
pattern[:rows//2, cols//2:] = 1
pattern[rows//2:, :cols//2] = 1
```

For an integer pixel, `lena % 2` returns its last bit: 0 for an even value and 1 for an odd value. Subtracting it clears that bit, and adding the pattern inserts the value I want. The implementation uses basic matrix operations, without a special embedding function.

```python
lena_lsb = lena - (lena % 2) + pattern
```

Each pixel changes by at most one intensity unit. It's impossible to see a difference in the Lena photograph in Figure 20. Her face, hat and background look the same at this scale. However, a machine checking the last bit as shown below reveals the pattern exactly.

```python
hidden_pattern = lena_lsb % 2
```

{{< homework-photo src="images/example7-1.png" alt="The modified Lena image and the pattern extracted directly from the array." caption="Figure 20. The modified Lena image and the pattern extracted directly from the array." >}}

This extraction is what allows us to confirm that the code worked. The black and white contrast comes from displaying the extracted bits on a scale from 0 to 1, revealing the secret in the photo.

#### Saving the marked image as JPEG

The marked array was saved at qualities 100, 99 and 75. I used OpenCV to easily select the JPEG quality. Then I loaded each saved file with `plt.imread` and extracted its bits again.

```python
for i, quality in enumerate([100, 99, 75]):
    cv2.imwrite(
        f"lena_lsb_{quality}.jpg",
        lena_lsb.astype(np.uint8),
        [cv2.IMWRITE_JPEG_QUALITY, quality])

    lena_jpg = plt.imread(
        f"lena_lsb_{quality}.jpg").astype(int)
    lena_jpg % 2
```

The photographs in the top row of Figure 21 also remain very similar. The extracted information changes much more clearly. At quality 100, I can still identify the quarters, but incorrect pixels already appear inside them, even though the image is basically the same. Quality 99 already produces concerning visible errors in the mark, and it barely got compressed. At quality 75, the modified image is still the same but the mark is no longer recognizable and the extraction looks mainly like fine noise.

{{< homework-photo src="images/example7-2.png" alt="Marked Lena images saved as JPEG and their extracted patterns, at qualities 100, 99 and 75." caption="Figure 21. Marked Lena images saved as JPEG and their extracted patterns, at qualities 100, 99 and 75." >}}

JPEG aims to keep the picture visually similar while reducing the data needed to store it. It processes small blocks and rounds transformed image values, a step called quantization. After decoding, some pixel intensities are slightly different. It does not simply replace neighboring pixels with their average. A change from 218 to 219 would be hard to notice in the photograph, but it changes the extracted bit from 0 to 1.

I expected quality 100 to preserve the message, but this setting still uses the usual lossy JPEG process. This experiment made this difference between visual quality and exact pixel preservation very clear to me.

### Reading the saved files and testing PNG

Reading the saved JPEG files produced pretty much the same results as the saving-and-extraction script already did. By reading them again, I didn't apply another JPEG compression. For quality 100, the essential operation is:

```python
lena_lsb_100 = plt.imread("lena_lsb_100.jpg").astype(int)
lena_lsb_100 % 2
```

The other two files use the same extraction. Their output confirms the progression already visible in Figure 21.

Robustness means that the hidden information can still be recovered after the host image has been modified. This direct LSB method is fragile: even JPEG saved at quality 100 can change pixel values enough to corrupt these hidden bits, although the photograph still looks unchanged. Recognizing the large repeated quarters at quality 100 does not mean that all their bits survived.

I also wanted to test PNG because it is a lossless format, so I saved and read the marked image again. The result in Figure 22 shows that the mark remains perfect. No pixel values or hidden bits were changed.

{{< homework-photo src="images/example8-png.png" alt="Marked Lena read from PNG and its correctly recovered pattern." caption="Figure 22. Marked Lena read from PNG and its correctly recovered pattern." >}}

### Repeating the experiment with Baboon

I applied the same pattern and operations to Baboon. First, applying the mark, as shown in Figure 23, causes no visible change in the fur, eyes or nose, while the extracted pattern is once again complete.

{{< homework-photo src="images/example9-1.png" alt="Baboon after one-bit LSB insertion and extraction from the array before compression." caption="Figure 23. Baboon after one-bit LSB insertion and extraction from the array before compression." >}}

{{< homework-photo src="images/example9-2.png" alt="The marked Baboon image and its extracted bits after JPEG compression at three qualities." caption="Figure 24. The marked Baboon image and its extracted bits after JPEG compression at three qualities." >}}

After compression, Figure 24 shows the same behavior as for Lena: visible but corrupted quarters at quality 100, more noise at 99, and no recognizable pattern at 75. Baboon's dense texture does not protect the bits. It can help small changes remain visually unnoticed, but this is something else and this extraction still depends on the exact final bit of every pixel that is corrupted by JPEG.

### Using two bits per pixel

I then extended the method to the two least significant bits. There are now four possible hidden values: 0, 1, 2 and 3, corresponding to the bit pairs 00, 01, 10 and 11. This is why it is called "2bit - LSB". These values were assigned to the upper-left, upper-right, bottom-left and bottom-right quarters.

The code follows the same logic. I marked the image by replacing `% 2` with `% 4`. Subtracting the remainder clears the last two bits, and adding the pattern inserts the desired pair.

```python
pattern = np.zeros_like(lena)
pattern[:rows//2, cols//2:] = 1
pattern[rows//2:, :cols//2] = 2
pattern[rows//2:, cols//2:] = 3

lena_lsb2 = lena - (lena % 4) + pattern
lena_lsb2 % 4
```

This doubles the raw storage capacity from one to two hidden bits per pixel. The possible intensity change also increases, from at most one unit to at most three. Human eyes still cannot see an obvious alteration in Lena in Figure 25, while the secret extraction shows four distinct gray levels.

{{< homework-photo src="images/example10-1.png" alt="Two-bit LSB insertion in Lena and extraction of the four-valued pattern before compression." caption="Figure 25. Two-bit LSB insertion in Lena and extraction of the four-valued pattern before compression." >}}

{{< homework-photo src="images/figure-26.png" alt="Two-bit patterns extracted after JPEG compression at qualities 100, 99 and 75." caption="Figure 26. Two-bit patterns extracted after JPEG compression at qualities 100, 99 and 75." >}}

The additional capacity does not solve the earlier problem. The quarters in Figure 26 remain identifiable but noisy at qualities 100 and 99, then disappear at quality 75. More information is stored in each pixel, but it is still stored in low-value bits that the JPEG conversion and compression easily corrupt, proving once again its complete lack of robustness.

An example of its use is hiding a binary code instead of the four big quadrants that allowed us to see the mark, so that the hidden content could later be converted into text. But the problem is that a simple quadrant pattern remains recognizable despite many incorrect bits because it repeats the same values over large regions. A text-bit payload could instead return lots of altered characters. In this implementation there is also no secret key controlling the extraction, so someone who knows which bits I used can read them directly, making it unsuitable for modern real world applications.

## What these experiments showed

These experiments showed that visual concealment and content privacy are different. Caesar left both subjects recognizable, and its 256 possible shifts, including the identity, are easy to try. Simple substitution can work as a visual mask for some detailed photographs, depending on the key, but the readable Lego logo shows why this does not extend to artificial images, which are usually uniform, so these regions in a real image remain unchanged and recognizable. Repeating the method cannot remove them: the successive tables still form one substitution and can be undone in only one step no matter how many iterations you have applied.

For comparison, classical text steganography can hide a message in selected letters, such as an acrostic, or in document formatting. These depend on preserving the chosen letters or layout. The image steganography that we used (LSB) instead uses small numerical changes across the image, keeping its visible subject and storing one or two bits per pixel. A human cannot see it. Rewording or reformatting can damage a text-based hiding rule, just as image processing like compression can easily damage the hidden bits. In both cases, an ordinary-looking carrier does not by itself prove that the hidden channel is undetectable.

LSB showed very poor robustness in my tests: even JPEG saved at quality 100 corrupted the hidden message. Compression is essential in modern image workflows, so I would not use this method in applications that involve lossy image compression.

*Written for TP1 of IMA5002 (Digital Content Protection).*
