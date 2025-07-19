---
author: taiyeong.song
category: pipeline
layout: post
title: Computer Graphics (Hong)
---


# 🧠 Kernel and Convolution

- [Kernel-wikipedia](https://en.wikipedia.org/wiki/Kernel_(image_processing))
- [Convolution-wikipedia](https://en.wikipedia.org/wiki/Convolution)

## Kernal

### 🗂️ Core Concepts

- **Kernel (Convolution matrix / Mask)**: A small matrix used for transformations like *blurring*, *sharpening*, *embossing*, and *edge detection*.
- **Convolution**: Mathematical operation where each output pixel is computed using a weighted sum of nearby input pixels using the kernel.

### 🔍 Kernel Operation

- **Origin**: The conceptual reference point in the kernel that aligns with the output pixel during convolution.
- **Symmetric Kernels**: Often use the center element as origin.
- **Flipping**: Non-symmetric kernels must be flipped both horizontally and vertically before applying convolution.

### 📐 Edge Handling Techniques

- `Extend`: Repeats border pixels outward.
- `Wrap`: Uses pixels from opposite edges (like tiling).
- `Mirror`: Reflects pixels at the image edge.
- `Crop / Avoid overlap`: Skips edge pixels — used frequently in **machine learning** pipelines (e.g., shrinking a 32×32 image to 23×23).
- `Constant`: Fills outside areas with fixed values (black/gray).

### 🧮 Normalization

- Scales kernel values so their sum equals **unity (1)**.
- Maintains overall image brightness post-processing.

### ⚡ Optimization – *Separable Convolution*

- A 2D convolution (M×N kernel) typically needs **M×N multiplications per pixel**.
- If the kernel is **separable**, computation drops to **M+N**, by applying two 1D convolutions.

### 🖥️ GPU Implementation Highlights

- GLSL shader code demonstrates how to:
  - Extract a 3×3 region from texture
  - Apply convolution with various kernels (`edge0`, `sharpen`, `gaussian_blur`)
  - Process individual color channels (RGB)
  - Use functions like `matrixCompMult` for element-wise operations


### 🎯 Interview Questions

#### 🧠 Conceptual Understanding
- What is a convolution kernel, and how is it used in image processing?
- Why is normalization of the kernel important?

#### 🔍 Practical Implementation
- Explain how edge handling affects convolution results.
- What’s the difference between symmetric and non-symmetric kernels in convolution?

#### ⚡ Optimization
- What is separable convolution, and how does it reduce computation cost?

#### 🖥️ Applied Techniques
- How would you implement a convolution operation using shaders (GLSL)?
- Describe how you’d perform edge detection using a convolution matrix.

#### 🤖 Machine Learning Relevance
- Why is cropping used in ML convolution layers?
- How do CNNs handle boundary conditions during kernel operations?


---

## Convolution

### 🗂️ Core Concepts

- **Convolution**: An operation that combines two functions by integrating the product of one function with a shifted and flipped version of the other.
- **Notation**: $$(f * g)(t) \;=\; \int_{-\infty}^{\infty} f(\tau)\,g(t-\tau)\,d\tau$$
- **Graphical Meaning**: Represents how the shape of one function modifies another.

### 🔁 Properties

- **Commutative**:  $f * g = g * f$
- **Associative**:  $f * (g * h) = (f * g) * h$
- **Distributive**: $f * (g + h) = f * g + f * h$
- **Translation Equivariance**: Convolution commutes with shifts in input

### 📐 Variants

- **Discrete Convolution**: For integer-indexed sequences (used in signal & image processing).
- **Circular Convolution**: Convolution over periodic domains or in FFT-based processing.
- **Infimal Convolution**: Used in convex analysis and optimization.

### 🧮 Mathematical Relations

- **Convolution Theorem**: Fourier transform of convolution is the product of individual transforms.
  - $ \mathcal{F}(f * g) = \mathcal{F}(f) \cdot \mathcal{F}(g) $
- **Laplace Transform & Z-transform equivalents**
- **Convolution with delta function** results in the original function

### 🚀 Applications

- **Signal & Image Processing**: Filtering, edge detection, blurring, sharpening
- **Machine Learning / CNNs**: Feature extraction via convolution layers
- **Probability**: Distribution of sum of two independent random variables
- **Physics / Spectroscopy**: Combining different response functions (e.g. Voigt profile)

### ⚙️ Computational Techniques

- **Fast Convolution**:
  - FFT-based convolution using Circular Convolution Theorem
  - Winograd algorithms for faster low-dimensional convolutions
  - Overlap-add / overlap-save methods for streaming signals


### 🎯 Interview Questions

- 🧠 Theoretical Concepts
    - What is convolution in the context of signal or image processing?
    - How does convolution differ from cross-correlation?
    - Describe the convolution theorem and its implications in Fourier analysis.

- 🧮 Math & Implementation
    - How would you implement 2D convolution efficiently for image filtering?
    - Why do we flip the kernel in convolution? Is it always necessary?
    - How is circular convolution used in FFT-based methods?

- 🤖 Practical Applications
    - In CNNs, why is the operation called “convolution” although it’s actually cross-correlation?
    - Explain how convolution helps in probability theory for combining distributions.
    - Describe a real-world physical phenomenon modeled using convolution (e.g. reverberation, spectroscopy).

- ⚡ Advanced Concepts
    - What is separable convolution and why is it computationally advantageous?
    - Describe infimal convolution and its role in optimization.
    - How does convolution work in function spaces or with distributions?

## URLs
- [6 basic things to know about Convolution](https://medium.com/@bdhuma/6-basic-things-to-know-about-convolution-daef5e1bc411)